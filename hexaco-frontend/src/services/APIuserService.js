import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8085/',
    // headers: {
    //     Authorization: `Bearer ${token}`,
    // },
});

export const APIloginUser = (payload) => {
    return axios.post('https://localhost:8085/login', payload).then(({ data }) => data);
};