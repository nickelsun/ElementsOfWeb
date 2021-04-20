function reverseNumber(num) {
   if( !Number.isInteger(num) ) {
      return NaN;
   }
   const [sign, abs] = [Math.sign(num), Math.abs(num)];
   
   const str = ''+abs;
   let revStr = '';

   for(let ch of str) {
      revStr = ch + revStr;
   }
   return parseInt((sign<0 ? '-' : '') + revStr);
}

function forEach(arr, func) {
   for(let i=0; i<arr.length; i++) {
      func(arr[i], i, arr);
   }
}

function map(arr, func) {
   let newArr = [];
   forEach(arr, elem => { 
      newArr.push(func(elem)); 
   });
   return newArr;
}

function filter(arr, func) {
   let newArr = [];
   forEach(arr, elem => { 
      if(func(elem)) {
         newArr.push(elem); 
      }
   });
   return newArr;
}

function getAdultAppleLovers(data) {
   const ageLimit = 18;
   const theFruit = 'apple';

   const filteredData = filter(data, elem => {
      return elem.age > ageLimit && elem.favoriteFruit === theFruit;
   });
   return map(filteredData, elem => elem.name);
}

function getKeys(obj) {
   let keys = [];
   for(const key in obj) {
      if(obj.hasOwnProperty(key)) {
         keys.push(key);
      }
   }
   return keys;
}

function getValues(obj) {
   let values = [];
   for(const key in obj) {
      if(obj.hasOwnProperty(key)) {
         values.push(obj[key]);
      }
   }
   return values;
}

function showFormattedDate(dateObj) {

   const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

   const d = dateObj.getDate();
   const m = dateObj.getMonth();
   const y = dateObj.getFullYear();

   const monthName = monthNames[m];

   return `It is ${d} of ${monthName}, ${y}`;
}





