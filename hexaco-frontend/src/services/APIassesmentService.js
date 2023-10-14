import axios from "axios";
const token = localStorage.getItem('token');

const api = axios.create({
    baseURL: 'http://127.0.0.1:8081',
    headers: {
        Authorization: `Bearer ${token}`,
    },
});


export const APIcreateAssesment = (payload) => {
    return api.post('/schedule-assessment', payload).then(({ data }) => data);
}
export const APIgetForms = () => {
    return axios.get('http://127.0.0.1:8081/forms.json').then(({ data }) => data);
}
export const APIgetResults = () => {
    return axios.get('http://127.0.0.1:8081/results.json').then(({ data }) => data);
}

export const APIgetResultDetails = (eventID) => {
    // if(eventID){
    //     return axios.get('http://127.0.0.1:8081/results.json?eventID').then(({ data }) => data);
    // }
    return axios.get('http://127.0.0.1:8081/result_details.json').then(({ data }) => data);
}

export const APIgenerateReport = (employeeId, assessmentType) => {
    // return axios.get(`http://127.0.0.1:8081/generate-report/${employeeId}/${assessmentType}`)
    return axios.get(`http://127.0.0.1:8081/generate-report/${employeeId}/${assessmentType}.json`)
}