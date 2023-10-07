import axios from "axios";
const token = localStorage.getItem('token');

const api = axios.create({
    baseURL: 'http://127.0.0.1:8081',
    headers: {
        Authorization: `Bearer ${token}`,
    },
});


export const APIloginUser = (payload) => {
    // return axios.post('http://localhost:8085/login', payload).then(({ data }) => data);
    return axios.get('http://127.0.0.1:8081/login.json', payload).then(({ data }) => data);
};
export const APIgetUsers = () => {
    return axios.get(`http://127.0.0.1:8081/users.json`).then(({ data }) => data);
};
export const APIcreateUser = (payload) => {
    return api.post(`/users`, payload).then(({ data }) => data);
};