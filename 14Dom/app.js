const appRoot = document.getElementById('app-root');

const headerHTML = `<h1>Countries Search</h1>`;

const searchFormHTML =`
<form id="search-form">

   <p>Please choose the type of search:</p>

   <input  id="by-region-radio" type="radio" name="search-radios" value="by-region">
   <label for="by-region-radio">By Region</label><br>

   <input  id="by-language-radio" type="radio" name="search-radios" value="by-language">
   <label for="by-language-radio">By Language</label><br>
   
   <p>Please choose search query:
   <select id="search-options" disabled>
      <option id="no-selection-option" value="no selection">Select value</option>
   </select></p>

</form>`;

const noResultsLabelHTML = `
   <p id="no-results-label">No items, please choose search query</p>`;

const resultsTableHTML =`
   <table id="results-table" class="hidden"></table>`;

appRoot.innerHTML += 
      headerHTML + searchFormHTML +
      noResultsLabelHTML + resultsTableHTML;

const searchForm = document.getElementById('search-form');
const searchOptions = document.getElementById('search-options');
const resultsTable = document.getElementById('results-table');
const noResultsLabel = document.getElementById('no-results-label');

const INTACT = -1, CHANGE = 1;

const sortArrowSymbols = ['&#x2195;', '&uarr;', '&darr;'];
const SORT_NO = 0, SORT_ACSEND = 1, SORT_DESCEND = 2;

let isByRegion = null;
let option = null;

let countriesToShow = [];
let columnToSort = 'name';
let sortType = SORT_NO;

searchForm.addEventListener('change', e => {
   if(e.target.getAttribute('name')!=='search-radios') {
      return;
   }
   if(!e.target.checked) {
      return;
   }

   let HTML = `<option id="no-selection-option" value="no selection">Select value</option>`
   let list;

   if(e.target.value==='by-region') {
      list = externalService.getRegionsList();
      isByRegion = true;
   } else {
      list = externalService.getLanguagesList();
      isByRegion = false;
   }   
   
   list.sort((a,b) => a<=b ? INTACT:CHANGE);
   for(let l of list) {
         HTML += `<option value="${l}">${l}</option>`;
   }
   
   searchOptions.innerHTML = HTML;
   searchOptions.disabled = false;

   noResultsLabel.classList.remove('hidden');
   resultsTable.classList.add('hidden');
});

searchOptions.addEventListener('change', () => {
   if(isByRegion) {
      countriesToShow = externalService.getCountryListByRegion(searchOptions.value);
   } else {
      countriesToShow = externalService.getCountryListByLanguage(searchOptions.value);
   }
   showResults();
});

resultsTable.addEventListener('click', e => {
   const NOT_FOUND = -1;
   
   if(e.target.className.search('sort-arrow') === NOT_FOUND) {
      return;
   }
   
   sortType = (sortType + 1) % sortArrowSymbols.length;
   columnToSort = e.target.dataset['column'];;

   if(isByRegion) {
      countriesToShow = externalService.getCountryListByRegion(searchOptions.value);
   } else {
      countriesToShow = externalService.getCountryListByLanguage(searchOptions.value);
   }

   if(sortType!==SORT_NO) {
      countriesToShow.sort((a,b) => {
         let result = a[columnToSort] <= b[columnToSort] ? INTACT : CHANGE;
         return sortType === SORT_DESCEND ? -result : result;
      });
   }

   showResults();
});

function showResults() {
   resultsTable.innerHTML = '';

   const byNameSortType = columnToSort==='name' ? sortType : SORT_NO;
   const byAreaSortType = columnToSort==='area' ? sortType : SORT_NO;

   let tr = document.createElement('tr');
   resultsTable.append(tr);
   tr.innerHTML = `
   <th>Country name&nbsp;<span data-column="name" class="sort-arrow">${sortArrowSymbols[byNameSortType]}</span></th>
   <th>Capital</th>
   <th>World region</th>
   <th>Languages</th>
   <th>Area&nbsp;<span data-column="area" class="sort-arrow">${sortArrowSymbols[byAreaSortType]}</span></th>
   <th>Flag</th>`;

   for(const country of countriesToShow) {
      let td0 = document.createElement('td');
      td0.textContent = country.name;
      let td1 = document.createElement('td');
      td1.textContent = country.capital;
      let td2 = document.createElement('td');
      td2.textContent = country.region;
      let td3 = document.createElement('td');
      td3.textContent = Object.values(country.languages).join(', ');
      let td4 = document.createElement('td');
      td4.textContent = country.area;

      let td5 = document.createElement('td');
      let img = document.createElement('img');
      img.setAttribute('src', country.flagURL);
      td5.append(img);

      let tr = document.createElement('tr');
      tr.append(td0, td1, td2, td3, td4, td5);
      resultsTable.append(tr);
   }
   
   noResultsLabel.classList.add('hidden');
   resultsTable.classList.remove('hidden');
}