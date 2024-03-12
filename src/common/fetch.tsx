import { BASE_URL } from '../common/constants';

export async function apiFetch(endpoint: string, method: string = 'GET', body?: any) {
    fetch(BASE_URL + endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(function(response){
      return response;
    });
  }