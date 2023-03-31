import axios from 'axios';

function newAbortSignal(timeoutMs) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  if (abortController.signal.aborted) {
    console.log('Request timed out');
    throw new Error('Request timed out');
  }

  return abortController.signal;
}

export const fetchClubs = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/clubs');
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response);
  }
};

export const sendBoxerForm = async (data) => {
  console.log('Data', data);

  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/boxers',

      {
        ...data,
      },
      // { signal: newAbortSignal(20000) },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log('Boxer Form Response', response);

    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};
