import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:44331/api', 
});

export default instance;
