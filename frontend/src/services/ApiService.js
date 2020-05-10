import axios from 'axios';

// Default API will be your root
const API_ROOT = process.env.URL || 'https://api.raulgavris.com';
const TIMEOUT = 20000;
const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

class ApiService {
  constructor({ baseURL = API_ROOT, timeout = TIMEOUT, headers = HEADERS, auth }) {
    const client = axios.create({
      baseURL,
      timeout,
      headers,
      auth,
    });

    client.interceptors.response.use(this.handleSuccess, this.handleError);
    this.client = client;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    return Promise.reject(error);
  }

  async get(path) {
    const response = await this.client.get(path);
    return response.data;
  }

  async post(path, payload) {
    const response = await this.client.post(path, payload);
    return response.data;
  }

  async put(path, payload) {
    const response = await this.client.put(path, payload);
    return response.data;
  }

  async patch(path, payload) {
    const response = await this.client.patch(path, payload);
    return response.data;
  }

  async delete(path) {
    const response = await this.client.delete(path);
    return response.data;
  }
}

export default ApiService;