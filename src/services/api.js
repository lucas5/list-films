import axios from 'axios';

const api = axios.create({
  baseURL: 'https://list-films-api.herokuapp.com/',
});

export default api;