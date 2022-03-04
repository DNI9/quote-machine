import {getQuoteByAuthor} from './lib/quote';
import './styles/author.css';
import './styles/globals.css';
import './styles/header.css';
import './styles/main.css';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const author = urlParams.get('author');
{
  `
	<figure>
				<blockquote id="quote">
					<p>Loading a great quote...</p>
				</blockquote>
				<figcaption id="author">
					Author
				</figcaption>
			</figure>
			`;
}
if (!author) window.location.replace('/');

const title = document.querySelector<HTMLHeadingElement>('main .title')!;
const quotesSection = document.getElementById('quotes')!;
const loadingTitle = document.querySelector<HTMLHeadingElement>(
  'main .loading-title'
)!;

const fetchQuotes = async () => {
  try {
    const quotes = await getQuoteByAuthor(author!);
    title.innerText = `Quotes by ${quotes[0].author}`;

    quotes.forEach(q => {
      quotesSection.innerHTML += `<figure>
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
