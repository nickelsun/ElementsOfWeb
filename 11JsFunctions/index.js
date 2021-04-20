function isEquals(x, y) {
   return x === y; 
}

function isBigger(x, y) {
   return x > y;
}

function storeNames(...names) {
   return [...names];
}

function getDifference(x, y) {
   const MINUS_1 = -1;
   let sign = +(x>=y) || MINUS_1; 
   return (x-y) * sign;
}

function negativeCount(numberArr) {
   return numberArr.filter( n => n<0 ).length;
}

function letterCount(str, letter) {
   let strLC = str.toLowerCase();
   let letterLC = letter.toLowerCase();

   return strLC.split('').filter( char => char === letterLC ).length;
}

function countPoints(scoresArr) {
   return scoresArr.reduce( (acc, score) => {
      let [x, y] = score.split(':').map( elem => parseInt(elem) );
      
      const win = 3,
            draw = 1,
            lost = 0;

      return acc + ( (x>y)*win || (x===y)*draw || lost );
      
   }, 0 );
}