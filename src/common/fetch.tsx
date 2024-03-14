import { BASE_URL } from '../common/constants';

export async function apiFetch(endpoint: string, method: string = 'GET', body?: any) {
    const response = await fetch(BASE_URL + endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
  }