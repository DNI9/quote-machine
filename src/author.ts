import {getQuoteByAuthor} from './lib/quote';
import './styles/author.css';
import './styles/globals.css';
import './styles/header.css';
import './styles/main.css';
import {debounce, themeSwitcher} from './utils';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const authorSlug = urlParams.get('author');

if (!authorSlug) window.location.replace('/');

const title = document.querySelector<HTMLHeadingElement>('main .title')!;
const quotesSection = document.getElementById('quotes')!;
const loadingTitle = document.querySelector<HTMLHeadingElement>(
  'main h1.loading-title'
)!;
const themeSwitch = document.querySelector<HTMLInputElement>('.theme-switch')!;
const quoteEndMsg = document.getElementById('quote-end-msg')!;
const goToTopBtn = document.querySelector('#quote-end-msg button')!;

themeSwitcher(themeSwitch);

const toggleLoading = (state: boolean = true) => {
  loadingTitle.style.display = state ? 'block' : 'none';
};

let page = 1;
let hasNextPage = true;
const fetchQuotes = async () => {
  try {
    if (!hasNextPage) {
      quoteEndMsg.style.display = 'block';
      return;
    }
    toggleLoading();
    const {results: quotes, lastItemIndex} = await getQuoteByAuthor(
      authorSlug!,
      5,
      page
    );
    if (!quotes?.length) throw new Error('No quotes found');
    hasNextPage = !!lastItemIndex;
    page++;

    const author = quotes[0].author;
    document.title = `Quotes by ${author}`;
    title.classList.add('lineUp');
    title.innerHTML = `<p>Quotes By </p><h1>${author}</h1>`;

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
    if (error instanceof Error) alert(error.message || 'Failed to get quotes');
  } finally {
    title.classList.remove('display-none');
    toggleLoading(false);
  }
};

document.addEventListener('DOMContentLoaded', fetchQuotes);

const debouncedFetch = debounce(fetchQuotes);

let lastScrollTop = 0;
window.addEventListener('scroll', async () => {
  const {scrollHeight, scrollTop, clientHeight} = document.documentElement;
  const st = window.pageYOffset || scrollTop;

  // only fetch when scrolling down
  if (st > lastScrollTop) {
    if (scrollTop + clientHeight > scrollHeight - 5) {
      debouncedFetch();
    }
  }
  lastScrollTop = st <= 0 ? 0 : st;
});

goToTopBtn.addEventListener('click', () => {
  window.scrollTo({top: 0, behavior: 'smooth'});
});
