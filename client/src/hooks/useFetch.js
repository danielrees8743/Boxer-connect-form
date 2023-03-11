import axios from 'axios';

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
  console.log(data);
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/boxers',
      {
        ...data,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
