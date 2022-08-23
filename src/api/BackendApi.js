import axios from "axios";
import {BACKEND_API_BASE_URL} from "../config/config";

let headers = {
    "x-api-secret": "Arafat"
}

const api = axios.create({
    baseURL: `${BACKEND_API_BASE_URL}`
});

export default api;
