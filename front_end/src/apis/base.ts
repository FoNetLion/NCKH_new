import axios from "axios";
import qs from 'qs'

const request = axios.create({
    baseURL: "http://service4all.vinorsoft.com:18003/api/v1",
    headers: {
        "content-type": "application/json",
    },
    paramsSerializer: (params) => qs.stringify(params),
})

request.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('access_token')}`
request.interceptors.request.use(async (config) => config);


const NCKHAxiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/",
   // baseURL: "https://jsonplaceholder.typicode.com/",    demo 
    headers: {
        "content-type": "application/json",
    },
    paramsSerializer: (params) => qs.stringify(params),
})

request.interceptors.request.use(async (config) => config);


export {request, NCKHAxiosClient}