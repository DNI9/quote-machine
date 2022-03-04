const BASE_URL = 'https://api.quotable.io';

export interface QuoteType {
  tags: string[];
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export async function getRandomQuote(): Promise<QuoteType> {
  const response = await window.fetch(BASE_URL + '/random');
  const data: QuoteType = await response.json();
  if (response.ok && data) return data;
  else return Promise.reject(new Error('Could not get a random quote'));
}

export async function getQuoteByAuthor(authorSlug: string, limit: number = 5) {
  const response = await window.fetch(
    BASE_URL + `/quotes?author=${authorSlug}&limit=${limit}`
  );

  type JSONResponse = {results?: Array<QuoteType>};
  const {results}: JSONResponse = await response.json();
  if (response.ok && results?.length) return results;
  else
    return Promise.reject(
      new Error('Could not get quotes by author ' + authorSlug)
    );
}
