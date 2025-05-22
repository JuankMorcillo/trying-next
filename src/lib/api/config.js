import axios from 'axios';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const defaultHeaders = {
  'Content-Type': 'application/json',
};

export async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  return await axios(url, options)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Error fetching data');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });

}