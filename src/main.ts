import {getRandomQuote} from './quote';
import './styles/globals.css';
import './styles/main.css';
import {toggleLoading} from './utils';

const randomBtn = document.querySelector<HTMLButtonElement>('#random-btn')!;
const randomIcon =
  document.querySelector<HTMLOrSVGImageElement>('#random-btn svg')!;
const blockquote = document.querySelector<HTMLParagraphElement>(
  'figure blockquote p'
)!;
const author = document.getElementById('author')!;

const fetchQuote = async () => {
  try {
    toggleLoading(randomIcon);
    randomBtn.disabled = true;
    const quote = await getRandomQuote();
    blockquote.innerText = quote.quoteText;
    author.innerText = `— ${quote.quoteAuthor}`;
  } catch (error) {
    console.log(error);
    alert('Failed to get a quote!');
  } finally {
    randomBtn.disabled = false;
    toggleLoading(randomIcon);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  fetchQuote();
});

randomBtn.onclick = () => {
  fetchQuote();
};
