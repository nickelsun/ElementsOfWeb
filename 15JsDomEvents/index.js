/* START TASK 1: Your code goes here */
const table1 = document.getElementById('table1');

table1.addEventListener('click', e => {
   if(e.target.tagName !== 'TD') {
      return;
   }
   let cell = e.target;

   const specialCellStr = 'Special Cell';

   if(cell.textContent === specialCellStr) {
      table1.querySelectorAll('#table1 td').forEach(e => {
         if(!e.classList.contains('yellow') && !e.classList.contains('blue')) {
            e.classList.add('green');
         }
      });

   } else if(cell.cellIndex !== 0) {
      cell.classList.add('yellow');
   
   } else if(cell.cellIndex === 0) {
      let rowIndex = cell.parentNode.rowIndex;
      for(let i=0; i<table1.rows[rowIndex].cells.length; i++) {
         let currCell = table1.rows[rowIndex].cells[i];
         if(!currCell.classList.contains('yellow')) {
            currCell.classList.add('blue')
         }
      } 
   }
})
/* END TASK 1 */

/* START TASK 2: Your code goes here */
const notificationBlock = document.getElementById('notification-block');
const phoneInput = document.getElementById('phone-input');
const sendButton = document.getElementById('send-button');

const notifInvalid = 'Typed number does not follow format<br>+380*********';
const notifSuccess = 'Data was successfully sent';

phoneInput.addEventListener('input', () => {
   
   notificationBlock.classList.remove('notify-success');
   sendButton.disabled = true;
   
   if(! /^\+380[0-9]{9}$/.test(phoneInput.value) ) {
      phoneInput.classList.add('red-border');
      notificationBlock.innerHTML = notifInvalid;
      notificationBlock.classList.add('notification-visible');
      sendButton.disabled = true;
   
   } else {
      phoneInput.classList.remove('red-border');
      notificationBlock.classList.remove('notification-visible');
      sendButton.disabled = false;
   }
});

sendButton.addEventListener('click', () => {
   phoneInput.value = '';
   notificationBlock.innerHTML = notifSuccess;
   notificationBlock.classList.add('notify-success');
   notificationBlock.classList.add('notification-visible');
   sendButton.disabled = true;
});
/* END TASK 2 */

/* START TASK 3: Your code goes here */
const courtWrap = document.getElementById('court-wrap');
const ball = document.getElementById('ball');
const scoreALabel = document.getElementById('score-a-label');
const scoreBLabel = document.getElementById('score-b-label');
const scoreNotification = document.getElementById('score-notification');

let scoreA = 0;
let scoreB = 0;

const courtW = 600;
const courtH = 300;
const ballSize = 40;
const hoopOffset = 40;
const TWO = 2;
const scoringZoneSize = 15;

const hoopA = { x: hoopOffset, y: courtH/TWO };
const hoopB = { x: courtW - hoopOffset, y: courtH/TWO };

const notificationDuration = 3000;
const duration1 = 2900;
let timestamp;

courtWrap.addEventListener('click', e => {
   let eX = e.target === ball ? e.offsetX + parseInt(ball.style.left) : e.offsetX;
   let eY = e.target === ball ? e.offsetY + parseInt(ball.style.top) : e.offsetY;

   let ballX = eX - ballSize / TWO;
   let ballY = eY - ballSize / TWO;

   ball.style.left = `${ballX}px`;
   ball.style.top = `${ballY}px`;

   const half = Math.ceil(scoringZoneSize / TWO);

   if(Math.abs(hoopA.x - eX) <= half &&
      Math.abs(hoopA.y - eY) <= half) {

      let ce = new CustomEvent('score', { bubbles: true, detail: 'A' });
      courtWrap.dispatchEvent(ce);

   } else if(Math.abs(hoopB.x - eX) <= half &&
             Math.abs(hoopB.y - eY) <= half) {

      let ce = new CustomEvent('score', { bubbles: true, detail: 'B' });
      courtWrap.dispatchEvent(ce);
   }
});

courtWrap.addEventListener('score', e => {
   if(e.detail==='A') {
      scoreALabel.textContent = `Team A: ${++scoreA}`;
      scoreNotification.style.display = 'block'; 
      scoreNotification.style.color = 'blue';
      scoreNotification.textContent = `Team A score!`
   
   } else if(e.detail==='B') {
      scoreBLabel.textContent = `Team B: ${++scoreB}`;
      scoreNotification.style.display = 'block'; 
      scoreNotification.style.color = 'maroon';
      scoreNotification.textContent = `Team B score!`;
   
   } else {
      alert('error!');
   }

   timestamp = Date.now();
   setTimeout( () => { 
      if(Date.now()-timestamp > duration1) {
         scoreNotification.style.display = 'none'; 
      }
   }, notificationDuration);
});
/* END TASK 3 */