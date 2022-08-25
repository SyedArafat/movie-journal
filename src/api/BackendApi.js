import axios from "axios";
import {BACKEND_API_BASE_URL, TOKEN_TAG} from "../config/config";
import {GetToken} from "../auth/Authentication";

const api = axios.create({
    baseURL: `${BACKEND_API_BASE_URL}`
});

api.defaults.headers.common["Accept"] = "application/json";
api.defaults.headers.common["Authorization"] =`Bearer ${GetToken()}`;

export default api;
