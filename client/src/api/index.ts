import Axios from 'axios';
import { getBaseUrl } from '../utils/api';

const axios = Axios.create({
  baseURL: getBaseUrl(),
});

export default axios;
