import axios from 'axios';

// Default API will be your root
const API_ROOT = process.env.URL || 'https://api.raulgavris.com';
const TIMEOUT = 5000;
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'JWT' + localStorage.getItem('access_token'),
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

  setCustomHeaders (payload) {
    this.headers = HEADERS;
    this.headers['Authorization'] = payload['Authorization'];
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (error.response.status === 401 && originalRequest.url === API_ROOT+'token/refresh/') {
        window.location.href = '/login/';
        return Promise.reject(error);
    }

    if (error.response.data.code === "token_not_valid" && error.response.status === 401 && error.response.statusText === "Unauthorized") {
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken){
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return this.client.post('/token/refresh/', {refresh: refreshToken})
                  .then((response) => {
        
                    localStorage.setItem('access_token', response.access);
                    localStorage.setItem('refresh_token', response.refresh);
        
                    this.client.defaults.headers['Authorization'] = "JWT " + response.access;
                    originalRequest.headers['Authorization'] = "JWT " + response.access;
        
                    return this.client(originalRequest);
                  })
                  .catch(err => {
                    console.log(err)
                  });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = '/login/';
        }
      } else {
        console.log("Refresh token not available.")
        window.location.href = '/login/';
      }
    }
  
    // specific error handling done elsewhere
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