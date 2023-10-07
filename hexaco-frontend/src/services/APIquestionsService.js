import axios from "axios";
const token = localStorage.getItem('token');

const api = axios.create({
    baseURL: 'http://127.0.0.1:8081',
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const APIgetQuestions = () => {
    return axios.get('http://127.0.0.1:8081/questions.json').then(({ data }) => data);
};