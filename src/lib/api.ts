import { NewsResponse, TechDomain } from '../types/news';

const API_KEY = 'pub_692203b1caf898dfce27551a1b8db56a1e704';
const BASE_URL = 'https://newsdata.io/api/1/news';

export async function fetchNews(domain: TechDomain | string): Promise<NewsResponse> {
  const query = encodeURIComponent(domain);
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&q=${query}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  
  return response.json();
}