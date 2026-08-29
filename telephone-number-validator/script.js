const userInput = document.getElementById("user-input");
const checkButton = document.getElementById("check-btn");
const clearButton = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

function isValidUSNumber(phoneNumber) {
  /*
  
  * Valid formats:
  *
  * 5555555555
  * 555-555-5555
  * 555 555 5555
  * (555)555-5555
  * (555) 555-5555
  *
  * With country code:
  *
  * 1 555-555-5555
  * 1 (555) 555-5555
  * 1(555)555-5555
  * 1 555 555 5555
    */

  const phoneRegex =
    /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;

  return phoneRegex.test(phoneNumber);
}

checkButton.addEventListener("click", () => {
  const phoneNumber = userInput.value.trim();

  if (phoneNumber === "") {
    alert("Please provide a phone number");
    return;
  }

  if (isValidUSNumber(phoneNumber)) {
    resultsDiv.textContent =
      `Valid US number: ${phoneNumber}`;
  } else {
    resultsDiv.textContent =
      `Invalid US number: ${phoneNumber}`;
  }
});

clearButton.addEventListener("click", () => {
  resultsDiv.textContent = "";
});

const exampleButtons = document.querySelectorAll(".example");

exampleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    userInput.value = button.textContent.trim();
    userInput.focus();
  });
});