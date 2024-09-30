import axios from 'axios';
import { ItemSchema, ItemSchemaCreate } from '../validations/itemSchema';

export const fetch = async (data: ItemSchemaCreate) => {
  try {
    console.log('Data:', data);

    const token = localStorage.getItem('token');
    console.log('Token:', token);

    console.log(`${import.meta.env.VITE_BACKEND_URL}items`);

    data.price = Number(data.price);

    const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}items`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Response:', result);

    return result.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error('Axios error:', e.response?.data || e.message);
    } else {
      console.error('Error adding item:', e);
    }
    throw e;
  }
};

export const updateItem = async (item: ItemSchema) => {
  try {
    const itemId = item.id;
    const token = localStorage.getItem('token');

    const result = await axios.put(
      `http://localhost:9001/items/${itemId}`,
      { item },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return result;
  } catch (e) {
    console.error('Error updating item:', e);
    throw e;
  }
};
export const fetchGetItem = async () => {
  try {
    console.log('fetchGetItem');

    const token = localStorage.getItem('token');

    const result = await axios.get(`http://localhost:9001/items`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return result;
  } catch (e) {
    console.error('Error getting items:', e);
    throw e;
  }
};

export const getOneItem = async (itemId: string) => {
  try {
    console.log('getOneItem');

    const token = localStorage.getItem('token');

    const result = await axios.get(`http://localhost:9001/items/${itemId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return result;
  } catch (e) {
    console.error('Error getting items:', e);
    throw e;
  }
};

export const fetchCollection = async () => {
  try {
    const token = localStorage.getItem('token');

    const result = await axios.get(`${import.meta.env.VITE_BACKEND_URL}items/images`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Response:', result.data);
    return result.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export const fetchGetMyCollection = async (userId: string) => {
  try {
    console.log('blabla');
    console.log('blabla@blabla.com');

    const token = localStorage.getItem('token');
    console.log(`${import.meta.env.VITE_BACKEND_URL}items/my-items/${userId}`);

    if (userId) {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}items/my-items/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return result;
    }
  } catch (e) {
    console.error('Error getting my items:', e);
    throw e;
  }
};

export const deleteSpesificCollection = async (collectionsDelete: string[]) => {
  try {
    const token = localStorage.getItem('token');
    console.log(`${import.meta.env.VITE_BACKEND_URL}items/delete/`);

    const result = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}items`, {
      data: collectionsDelete,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (e) {
    console.error('Error getting my items:', e);
    throw e;
  }
};
