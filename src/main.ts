import {getRandomQuote} from './lib/quote';
import './styles/globals.css';
import './styles/header.css';
import './styles/main.css';
import {toggleLoading} from './utils';

const randomBtn = document.querySelector<HTMLButtonElement>('#random-btn')!;
const randomIcon =
  document.querySelector<HTMLOrSVGImageElement>('#random-btn svg')!;
const blockquote = document.querySelector<HTMLParagraphElement>(
  'figure blockquote p'
)!;
const authorElement = document.querySelector<HTMLLinkElement>('#author')!;

const fetchQuote = async () => {
  try {
    toggleLoading(randomIcon);
    randomBtn.disabled = true;

    const {author, content, authorSlug} = await getRandomQuote();
    blockquote.innerText = content;
    authorElement.innerHTML = `<a href="author.html?author=${authorSlug}">${author}</a>`;
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
