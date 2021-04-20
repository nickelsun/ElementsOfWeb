'use strict';

const forever = true; 


function getUserValue(message, defaultValue, condition, isInt) {
  const errMessage = 'Invalid input data';

  do {
    const userStr = prompt(message, defaultValue);
    if (userStr === null) {
      alert('This value is obligatory');
      continue;
    }

    const onlyDigits = (isInt ? /^\d+$/ : /^[0-9.]+$/).test(userStr);
    if (!onlyDigits) {
      alert(errMessage);
      continue;
    }

    const parsedNumber = isInt ? parseInt(userStr) : parseFloat(userStr);
    if (isNaN(parsedNumber) || !condition(parsedNumber)) {
      alert(errMessage);
      continue;
    }

    return parsedNumber;
  } while (forever);
}

function task1() {
  const minDeposit = 1000;
  const minNYears = 1;

  const maxPercOfYear = 100;
  const defaultPercOfYear = 10;

  const initAmount = getUserValue(
    'Enter initial amount of money\n(minimal 1000):',
    minDeposit,
    (x) => x >= minDeposit,
    false
  );
  const nYears = getUserValue(
    'Enter whole number of years:',
    minNYears,
    (x) => x >= minNYears,
    true
  );
  const percOfYear = getUserValue(
    'Enter percentage of a year\n(maximal 100):',
    defaultPercOfYear,
    (x) => x <= maxPercOfYear,
    false
  );

  let totalAmount = initAmount;

  const _100 = 100;
  for (let i = 0; i < nYears; i++) {
    totalAmount = totalAmount * (1 + percOfYear / _100);
  }

  let totalProfit = totalAmount - initAmount;

  const decimalPlaces = 2;

  const resultStr = `Initial amount: ${initAmount}
Number of years: ${nYears}
Percentage of year: ${percOfYear}

Total profit: ${totalProfit.toFixed(Number.isInteger(totalProfit) ? 0 : decimalPlaces)}
Total amount: ${totalAmount.toFixed(Number.isInteger(totalAmount) ? 0 : decimalPlaces)}`;

  alert(resultStr);
}
