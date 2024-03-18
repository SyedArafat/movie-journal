import axios from "axios";
import {BACKEND_API_BASE_URL} from "../config/config";
import {GetToken} from "../auth/Authentication";

const api = axios.create({
    baseURL: `${BACKEND_API_BASE_URL}`
});

api.defaults.headers.common["Accept"] = "application/json";

if (GetToken() !== null) {
    api.defaults.headers.common["Authorization"] = `Bearer ${GetToken()}`;
}
// api.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
// api.defaults.headers.common["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept";
// api.defaults.headers.common["Origin"] = "http://localhost:3000";

export default api;
