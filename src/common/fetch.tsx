import { BASE_URL } from '../common/constants';

export const POST = 'POST';
export const PATCH = 'PATCH';
export const PUT = 'PUT';

/**
 * Realiza una petición a la url determinada con el método y el cuerpo proporcionados
 * @param endpoint endpoint al que se realizará la petición
 * @param method método con el que se realizará la petición. Si no se indica ninguno se usara GET.
 * @param body cuerpo que se enviará a la petición.
 * @returns respuesta del servidor a la petición enviada.
 */
export const apiFetch = async (endpoint: string, method: string = 'GET', body?: any) =>{
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
      
    if(response.ok){
      // Si la respuesta está bien se envían los datos
      return data;
    } else {
      // En caso contrario se lanza un error
      throw Error(data.message);
    }
  }