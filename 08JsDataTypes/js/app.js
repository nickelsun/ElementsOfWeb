const event_form = document.querySelector('.event-form');
const name_input = document.querySelector('.name-input');
const time_input = document.querySelector('.time-input');
const place_input = document.querySelector('.place-input');
const confirm_button = document.querySelector('.confirm-button');
const converter_button = document.querySelector('.converter-button');

let eventName = '';

confirm_button.addEventListener('click', () => {
   const name = name_input.value;
   const time = time_input.value;
   const place = place_input.value;

   if(name === '' || time === '' || place === '') {
      alert('Input all data');
      return;
   }

   if(! /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/ .test(time)) {
      alert('Enter time in format hh:mm');
      return;
   }

   const prettyTime = time.split(':').map(x => x.length === 1 ? '0'+x : x).join(':');
   console.log(`${name} has a ${eventName} today at ${prettyTime} somewhere in ${place}.`);
});

const getAmount = function(currency) {
   const message = `Amount in ${currency}:`;
   const errorMessage = 'Please, enter correct number';

   let amount = parseFloat( prompt(message) );

   if( isNaN(amount) || amount<=0 ) {
      alert(errorMessage);
      amount = NaN;
   }
   
   return amount;
}

const OneEuroInHrns = 33.02;
const OneDollarInHrns = 27.69;

converter_button.addEventListener('click', () => {
   const decimals = 2;

   let euros = getAmount('euros');

   if( isNaN(euros) ) {
      return;
   }

   let dollars = getAmount('dollars');

   if( isNaN(dollars) ) {
      return;
   }

   let hrnsFromEuros = euros * OneEuroInHrns;
   let hrnsFromDollars = dollars * OneDollarInHrns;

   alert(`${euros.toFixed(decimals)} euros are equal ${hrnsFromEuros.toFixed(decimals)}hrns, ` +
         `${dollars.toFixed(decimals)} dollars are equal ${hrnsFromDollars.toFixed(decimals)}hrns`);
});

const organizeEvent = () => {
   eventName = prompt('Enter the event name:', 'meeting');

   if(eventName === null) {
      return;
   }

   event_form.classList.add('form-visible');
}

organizeEvent();