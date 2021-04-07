import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8444'
});
/* Нужно открыть порт для сервера */