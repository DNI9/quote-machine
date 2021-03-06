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

async function fetcher<T = any>(url: string): Promise<T> {
  const response = await window.fetch(url);
  const data: T = await response.json();
  if (response.ok && data) return data;
  else return Promise.reject(new Error('Failed to fetch data'));
}

export async function getRandomQuote(): Promise<QuoteType> {
  return fetcher<QuoteType>(BASE_URL + '/random');
}

export async function getQuoteByAuthor(
  authorSlug: string,
  limit: number = 5,
  page: number = 1
) {
  type JSONResponse = {
    results?: Array<QuoteType>;
    page: number;
    totalPages: number;
    lastItemIndex: number | null;
  };
  const url =
    BASE_URL + `/quotes?author=${authorSlug}&limit=${limit}&page=${page}`;
  return await fetcher<JSONResponse>(url);
}
