const textInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const result = document.getElementById("result");

function isPalindrome(text) {
  const cleanText = text.toLowerCase().replace(/[^a-z0-9]/g, "");

  const reversedText = cleanText.split("").reverse().join("");

  return cleanText === reversedText;
}

checkButton.addEventListener("click", () => {
  const text = textInput.value;

  if (text.trim() === "") {
    alert("Please input a value");
    return;
  }

  if (isPalindrome(text)) {
    result.textContent = `${text} is a palindrome`;
  } else {
    result.textContent = `${text} is not a palindrome`;
  }
});

const exampleButtons = document.querySelectorAll(".example");

exampleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    textInput.value = button.textContent;
    textInput.focus();
  });
});
