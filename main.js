// DOM elements
const authorheading = document.querySelector('.author');
const tagsUl = document.querySelector('.quote-card ul');
const quoteBody = document.querySelector('.quote-body');
const randomBtn = document.getElementById('random-btn');
const shareBtn = document.getElementById('share-btn');
const popup = document.querySelector('.popup');

let data;
let author;
let tags;
let quote;
// function to fetch the quotes from the api
// I chose to only fetch once because it's the same data and fetching it on every button click is unnecessary
async function fetchQuotes() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json");

    if (!response.ok) {
      throw new Error("Can't fetch quotes");
    }
    data = await response.json();

  } catch (error) {
    console.error(error.message);
  }
};


// pick a random quote
function quotePicker() {
  const random = Math.floor(Math.random() * data.length)
  author = data[random].author;
  tags = data[random].tags;
  quote = data[random].quote;
}

// updates the UI when the quote changes
function updateUI() {
  authorheading.textContent = author;
  tagsUl.innerHTML = tags.map(tag => `<li>${tag}</li>`).join("");
  quoteBody.textContent = `“${quote}”`;
}

// get arandom quote Random button eventlistener
randomBtn.addEventListener("click", () => {
  quotePicker();
  updateUI();
})

// show the popup when the random button is clicked for the first time
randomBtn.addEventListener("click", () => {
  popup.textContent = "Press space to get a new quote!";
  popup.style.opacity = "1";
  setTimeout(() => {
    popup.style.opacity = "0";
  }, 4000);
}, { once: true });

popup.addEventListener("click", () => {
  popup.style.opacity = "0";
});

// press space to get a new quote
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    quotePicker();
    updateUI();
  }
});

// copy the quote to the clipboard
shareBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(`${quoteBody.textContent} ${authorheading.textContent}`);
  popup.style.display = "block";
  popup.textContent = "Added to clipboard";
  popup.style.opacity = "1";
  setTimeout(() => {
    popup.style.display = "none";
    popup.style.opacity = "0";
  }, 4000);
});

// run the quote generator for the first time
(async () => {
  await fetchQuotes();
  quotePicker();
  updateUI();
})();

