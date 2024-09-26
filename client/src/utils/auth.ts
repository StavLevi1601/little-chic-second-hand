export const setToken = (token: string | null) => {
    if (!token) return
    localStorage.setItem('token', token);
  };
  
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  export const isTokenValid = async () => {
    console.log("isTokenValid");
    
    const token = getToken();
    console.log("token",token);
    
    if (!token) return false;
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}auth/validate-token`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("response",response);
      
      return response.ok ? true : false;
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }
  };