import axios from 'axios';

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/yellow-taxi-trips`,
});

export default api;
