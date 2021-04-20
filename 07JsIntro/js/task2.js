'use strict';

const numberOfAttempts = 3; 
const defaultAttempt = 5;

const initialRangeLimit = 8; 
const rangeGrowth = 4;

const initialPrizes = [100, 50, 25];
const prizeGrowthFactor = 2;

let totalPrize = 0;

function makeAttempt(rangeLimit, possiblePrize, attemptsLeft) {

   const message = 
`Choose a roulette pocket number from 0 to ${rangeLimit}
Attempts left: ${attemptsLeft}
Total prize: ${totalPrize}
Possible prize on current attempt: ${possiblePrize}`

   const ballPocket = Math.floor( Math.random() * (rangeLimit+1) );
   let attempt = parseInt( prompt(message, defaultAttempt) );
   if(attempt > rangeLimit) {
      attempt = rangeLimit;
   }

   return attempt === ballPocket;
}

function play(gameRound) {

   const rangeLimit = initialRangeLimit + rangeGrowth * (gameRound-1);
   const prizes = initialPrizes.map(x => x * Math.pow(prizeGrowthFactor, gameRound-1));

   for(let i = numberOfAttempts; i > 0; i--) {
      const possiblePrize = prizes[numberOfAttempts-i];
      if( makeAttempt(rangeLimit, possiblePrize, i) === true ) {
         totalPrize += possiblePrize;
         if( confirm(`Congratulation, you won! Your prize is: ${possiblePrize}$. Do you want to continue?`) ) {
            play(gameRound+1);
         }
         return;
      }
   } 
   alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
}

function task2() {

   if( !confirm('Do you want to play a game?') ) {

      alert('You did not become a billionaire, but can.');
      return;
   }
   
   do {
      totalPrize = 0;
      play(1);

   } while( confirm('Would you like to play again?') );
}

