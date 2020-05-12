import ApiService from './ApiService';

const BASE_URL = 'http://127.0.0.1:8000/api/';
const client = new ApiService({ baseURL: BASE_URL });

const portfolioApi = {};

portfolioApi.getPosts = () => client.get('/post/');
portfolioApi.getPost = id => client.get(`/post/${id}/`);
portfolioApi.postPost = (id, payload) => client.post(`/post/${id}/`, payload);
portfolioApi.getHero = () => client.get('/hero/');
portfolioApi.getLinks = () => client.get('/links/');
portfolioApi.getSendEmail = () => client.get('/send_email/')
portfolioApi.postSendEmail = (payload) => client.post('/send_email/', payload);
portfolioApi.getClientIp = () => client.get('https://jsonip.com');
portfolioApi.postToken = (payload) => client.post('/token/obtain/', payload);

portfolioApi.setCustomHeaders = (payload) => client.setCustomHeaders(payload);

export default portfolioApi;