function getAge(birthday) {
   let today = new Date();

   let age = today.getFullYear() - birthday.getFullYear();
   let monthDiff = today.getMonth() - birthday.getMonth();
   let dateDiff = today.getDate() - birthday.getDate();

   if( monthDiff < 0 || monthDiff === 0 && dateDiff < 0 ) {
      age--;
   }
      
   return age;
}

function getWeekDay(dateOrTimestamp) {
   return new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(new Date(dateOrTimestamp));
}

function getAmountDaysToNewYear(today) {
   // let today = new Date();
   
   const LO = 30, HI = 31, FEB = 28, daysInYear = 365;
   let isLeap = new Date(today.getFullYear(), 1, FEB+1).getDate() === FEB+1;

   const daysInMonth = [HI, FEB+(isLeap ? 1:0), HI, LO, HI, LO, HI, HI, LO, HI, LO, HI];

   let dayOfYear = today.getDate();

   for(let m=0; m<today.getMonth(); m++) {
      dayOfYear += daysInMonth[m];
   }

   return daysInYear+(isLeap ? 1:0) - dayOfYear + 1;
}

function getProgrammersDay(year) {
   let month = 8;
   let dayOfMonth = 13;
   const LeapFebDays = 29;
   
   if(new Date(year, 1, LeapFebDays).getDate() === LeapFebDays) {
      dayOfMonth--;
   }

   return `${dayOfMonth} Sep, ${year} (${getWeekDay(new Date(year,month,dayOfMonth))})`;
}

function howFarIs(specifiedWeekday) {
   specifiedWeekday = specifiedWeekday.toLowerCase();
   specifiedWeekday = specifiedWeekday[0].toUpperCase() + specifiedWeekday.substr(1);

   const weekLen = 7;
   let numberOfDays = 0;

   for(let D=new Date(); getWeekDay(D)!==specifiedWeekday; D.setDate(D.getDate()+1)) {
      numberOfDays++;
      if(numberOfDays > weekLen) {
         return `Such weekday does not exist`;
      }
   }

   return numberOfDays===0 ? 
      `Hey, today is ${specifiedWeekday} =)` :
      `It's ${numberOfDays} day(s) left till ${specifiedWeekday}`;
}

function isValidIdentifier(testStr) {
   return /^[_$A-Za-z][_$A-Za-z0-9]*$/.test(testStr);
}

function capitalize(testStr) {
   let re = /\w+/g;
   let result = re.exec(testStr);

   if(result===null) {
      return testStr;
   }

   let word = result[0];
   let wordEnd = re.lastIndex;
   let wordStart = wordEnd - word.length;

   word = word[0].toUpperCase() + word.substr(1);

   return testStr.substring(0, wordStart) + word + capitalize(testStr.substring(wordEnd, testStr.length));
}

function isValidAudioFile(filename) {
   return /^[A-Za-z]+\.(mp3|flac|alac|aac)$/.test(filename);
}

function getHexadecimalColors(testString) {
   let colors = testString.match(/\B#([0-9A-Fa-f]{3}){1,2}\b/g);
   return colors===null ? [] : colors;
}

function isValidPassword(testStr) {
   let minLen = 8;
   const NOT_FOUND = -1;
   return testStr.search(/[A-Z]/)!==NOT_FOUND &&
          testStr.search(/[a-z]/)!==NOT_FOUND &&
          testStr.search(/\d/) !==NOT_FOUND && 
          testStr.length >= minLen;
}

function addThousandsSeparators(number) {
   let numericStr = '' + number;
   let [intStr, fracStr] = numericStr.split('.');

   let re = /(\d+)(\d{3})/;

   while(re.test(intStr)) {
      intStr = intStr.replace(re, '$1' + ',' + '$2');
   }

   return intStr + '.' + fracStr;
}

function getAllUrlsFromText(testStr) {
   let re = /https?:\/\/(\w+\.){1,}(\w+)(\/\w+)*(\/(\w+\.)(\w+))?(\/)?(\?(\w+=\w+[&;])*(\w+=\w+))?/g;

   let URLs = testStr.match(re);
   if(URLs===null) {
      return [];
   }
   return URLs;
}