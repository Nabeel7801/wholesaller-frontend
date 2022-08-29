import axios from 'axios';

import { servername } from '../../config';

let Api = axios.create({
  baseURL: servername,
  headers: {
    'Content-type': 'application/json',
  },
});

export default Api;
