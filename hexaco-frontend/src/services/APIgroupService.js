import axios from "axios";
const token = localStorage.getItem('token');

const api = axios.create({
    baseURL: 'http://127.0.0.1:8081',
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const APIgetGroups = () => {
    return axios.get('http://127.0.0.1:8081/groups.json').then(({ data }) => data);
};
export const APIcreateGroup = (payload) => {
    return api.post('/groups.json', payload).then(({ data }) => data);
}