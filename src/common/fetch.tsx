import { BASE_URL } from '../common/constants';

/**
 * Realiza una petición a la url determinada con el método y el cuerpo proporcionados
 * @param endpoint endpoint al que se realizará la petición
 * @param method método con el que se realizará la petición. Si no se indica ninguno se usara GET.
 * @param body cuerpo que se enviará a la petición.
 * @returns respuesta del servidor a la petición enviada.
 */
export async function apiFetch(endpoint: string, method: string = 'GET', body?: any) {
    // Se realiza la petición y se espera la respuesta
    const response = await fetch(BASE_URL + endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    // Se invoca la conversión de la respuesta a JSON.
    const data = await response.json();
    return data;
  }