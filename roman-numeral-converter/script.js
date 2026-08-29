const numberInput = document.getElementById("number");
const convertButton = document.getElementById("convert-btn");
const output = document.getElementById("output");

function convertToRoman(number) {
  const romanNumerals = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" }
  ];

  let result = "";

  for (const numeral of romanNumerals) {
    while (number >= numeral.value) {
      result += numeral.symbol;
      number -= numeral.value;
    }
  }

  return result;
}

convertButton.addEventListener("click", () => {
  const inputValue = numberInput.value.trim();

  if (inputValue === "") {
    output.textContent = "Please enter a valid number";
    return;
  }

  const number = Number(inputValue);

  if (number < 1) {
    output.textContent =
      "Please enter a number greater than or equal to 1";
    return;
  }

  if (number >= 4000) {
    output.textContent =
      "Please enter a number less than or equal to 3999";
    return;
  }

  output.textContent = convertToRoman(number);
});

const exampleButtons = document.querySelectorAll(".example");

exampleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    numberInput.value = button.textContent.trim();
    numberInput.focus();
  });
});