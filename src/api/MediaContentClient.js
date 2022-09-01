import api from "./BackendApi";
import {GetToken} from "../auth/Authentication";

const ApiGetWithAuth = async (uri) => {
    return await api.get(`${uri}`, {
        "headers": {
            "Authorization": `Bearer ${GetToken()}`
        }
    })
};

export {
    ApiGetWithAuth
}
