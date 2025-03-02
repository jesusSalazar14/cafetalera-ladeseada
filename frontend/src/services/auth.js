import axios from 'axios';

const auth = {
  register: async (data) => {
    try {
      const response = await axios.post('/api/registro', data);
      return response.data;
    } catch (error) {
      console.error(error);
      if (error.response.status === 500) {
        throw new Error('Error al registrar usuario');
      } else {
        throw new Error('Error desconocido');
      }
    }
  },
  login: async (data) => {
    try {
      const response = await axios.post('/api/login', data);
      return response.data;
    } catch (error) {
      console.error(error);
      if (error.response.status === 500) {
        throw new Error('Error al iniciar sesión');
      } else {
        throw new Error('Error desconocido');
      }
    }
  },
};

export default auth;