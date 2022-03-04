import {getQuoteByAuthor} from './lib/quote';
import './styles/author.css';
import './styles/globals.css';
import './styles/header.css';
import './styles/main.css';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const author = urlParams.get('author');

if (!author) window.location.replace('/');

const title = document.querySelector<HTMLHeadingElement>('main .title')!;
const quotesSection = document.getElementById('quotes')!;
const loadingTitle = document.querySelector<HTMLHeadingElement>(
  'main .loading-title'
)!;

const fetchQuotes = async () => {
  try {
    const quotes = await getQuoteByAuthor(author!);
    title.classList.add('lineUp');
    title.innerHTML += `<p>Quotes By </p><h1>${quotes[0].author}</h1>`;

    quotes.forEach(q => {
      quotesSection.innerHTML += `<figure class='lineUp'>
				<blockquote id="quote">
					<p>${q.content}</p>
				</blockquote>
			</figure>
			`;
    });
  } catch (error) {
    console.error(error);
    alert('Failed to get quotes');
  } finally {
    title.classList.remove('display-none');
    loadingTitle.style.display = 'none';
    console.log('fetched');
  }
};

document.addEventListener('DOMContentLoaded', fetchQuotes);
