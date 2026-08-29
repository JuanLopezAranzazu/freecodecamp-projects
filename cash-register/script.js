let price = 1.87;

let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const cashInput = document.getElementById("cash");
const purchaseButton = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const priceDisplay = document.getElementById("price-display");

priceDisplay.textContent = `$${price.toFixed(2)}`;

const currencyValues = {
  "PENNY": 1,
  "NICKEL": 5,
  "DIME": 10,
  "QUARTER": 25,
  "ONE": 100,
  "FIVE": 500,
  "TEN": 1000,
  "TWENTY": 2000,
  "ONE HUNDRED": 10000
};

function getTotalDrawer() {
  return cid.reduce((total, currency) => {
    return total + currency[1];
  }, 0);
}

function calculateChange(change) {

  let remaining = Math.round(change * 100);

  const result = [];

  for (let i = cid.length - 1; i >= 0; i--) {

    const currencyName = cid[i][0];
    const availableAmount = Math.round(cid[i][1] * 100);
    const currencyValue = currencyValues[currencyName];

    let amountToReturn = 0;

    while (
      remaining >= currencyValue &&
      amountToReturn + currencyValue <= availableAmount
    ) {
      remaining -= currencyValue;
      amountToReturn += currencyValue;
    }

    if (amountToReturn > 0) {
      result.push([
        currencyName,
        amountToReturn / 100
      ]);
    }

  }

  return {
    result,
    remaining
  };
}

purchaseButton.addEventListener("click", () => {

  const cash = Number(cashInput.value);

  if (cash < price) {
    alert(
      "Customer does not have enough money to purchase the item"
    );

    return;

  }

  if (cash === price) {
    changeDue.textContent =
      "No change due - customer paid with exact cash";

    return;
  }

  const change = Math.round((cash - price) * 100) / 100;

  const totalDrawer =
    Math.round(getTotalDrawer() * 100) / 100;

  if (totalDrawer === change) {
    const result = cid
      .filter(currency => currency[1] > 0)
      .reverse();

    let output = "Status: CLOSED";

    result.forEach(currency => {
      output += ` ${currency[0]}: $${currency[1]} `;
    });

    changeDue.textContent = output;

    return;

  }

  if (totalDrawer < change) {
    changeDue.textContent =
      "Status: INSUFFICIENT_FUNDS";

    return;
  }

  const {
    result,
    remaining
  } = calculateChange(change);

  if (remaining !== 0) {
    changeDue.textContent =
      "Status: INSUFFICIENT_FUNDS";

    return;
  }

  let output = "Status: OPEN";

  result.forEach(currency => {
    output += ` ${currency[0]}: $${currency[1]}`;
  });

  changeDue.textContent = output;
});