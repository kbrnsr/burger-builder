import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-a7fd7.firebaseio.com/',
});

export default instance;
