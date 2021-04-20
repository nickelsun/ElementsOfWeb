function visitLink(path) {
	localStorage[path] = +(localStorage[path] || 0) + 1;
}

function viewResults() {
	let visitsArr = [];
	const maxPage = 3;
	
	for(let i=1; i<=maxPage; i++) { 
		let visits = localStorage[`Page${i}`];
		if(visits) {
			visitsArr.push({page:i, visits: visits});
		}
	}
	
	let ul = document.querySelector('#viewResults');
	
	if(ul) {
		ul.innerHTML = '';
		
	} else {
		ul = document.createElement('ul');
		ul.setAttribute('id', '#viewResults');
		document.getElementById('content').appendChild(ul);
	}
	
	let html = '';
	
	for(let i=0; i<visitsArr.length; i++) {
		html += `<li>You visited Page${visitsArr[i].page} ${visitsArr[i].visits} time(s)</li>`;
	}

	ul.innerHTML = html;	
	
	localStorage.clear();
}
