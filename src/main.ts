import {getRandomQuote} from './lib/quote';
import './styles/globals.css';
import './styles/header.css';
import './styles/main.css';
import {themeSwitcher, toggleLoading} from './utils';

const randomBtn = document.querySelector<HTMLButtonElement>('#random-btn')!;
const randomIcon =
  document.querySelector<HTMLOrSVGImageElement>('#random-btn svg')!;
const blockquote = document.querySelector<HTMLParagraphElement>(
  'figure blockquote p'
)!;
const authorElement = document.querySelector<HTMLLinkElement>('#author')!;
const figure = document.querySelector('main figure')!;
const themeSwitch = document.querySelector<HTMLInputElement>('.theme-switch')!;

themeSwitcher(themeSwitch);

const fetchQuote = async () => {
  try {
    figure.classList.remove('lineUp');
    toggleLoading(randomIcon);
    randomBtn.disabled = true;

    const {author, content, authorSlug} = await getRandomQuote();
    blockquote.innerText = content;
    authorElement.innerHTML = `<a title="Get all quotes by ${author}" href="author.html?author=${authorSlug}">${author}</a>`;
  } catch (error) {
    console.log(error);
    alert('Failed to get a quote!');
  } finally {
    figure.classList.add('lineUp');
    randomBtn.disabled = false;
    toggleLoading(randomIcon);
  }
};

document.addEventListener('DOMContentLoaded', fetchQuote);

randomBtn.onclick = () => {
  fetchQuote();
};
