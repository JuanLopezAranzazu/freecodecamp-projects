const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier",
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    text: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
  },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
  },
  {
    text: "Experience is the name everyone gives to their mistakes.",
    author: "Oscar Wilde",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
  },
];

const textElement = document.getElementById("text");
const authorElement = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");
const tweetLink = document.getElementById("tweet-quote");

let currentQuote = null;

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);

  return quotes[randomIndex];
}

function displayQuote() {
  currentQuote = getRandomQuote();

  textElement.textContent = currentQuote.text;

  authorElement.textContent = currentQuote.author;

  const tweetText = `"${currentQuote.text}" — ${currentQuote.author}`;

  tweetLink.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
}

newQuoteButton.addEventListener("click", displayQuote);

displayQuote();
