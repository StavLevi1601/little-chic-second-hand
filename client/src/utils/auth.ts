export const setToken = (token: string | null) => {
  if (!token) return;
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const isTokenValid = async () => {
  const token = getToken();
  if (!token) return { success: false, message: 'No token found' };

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}auth/validate-token`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Response data:', data);
      return data; // החזרת כל אובייקט התגובה
    }

    return { success: false, message: 'Invalid response from server' };
  } catch (error) {
    console.error('Error validating token:', error);
    return { success: false, message: 'Error validating token' };
  }
};
