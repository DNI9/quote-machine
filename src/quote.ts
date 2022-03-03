const BASE_URL = 'https://quote-garden.herokuapp.com/api/v3/quotes';

export interface QuoteType {
  quoteText: string;
  quoteAuthor: string;
  quoteGenre: string;
}

export async function getRandomQuote(): Promise<QuoteType> {
  const response = await window.fetch(BASE_URL + '/random');

  type JSONResponse = {data?: Array<QuoteType>};
  const {data}: JSONResponse = await response.json();

  if (response.ok && data?.length) return data[0];
  else return Promise.reject(new Error('Could not get a random quote'));
}
