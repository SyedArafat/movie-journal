import api from "./BackendApi";
import {Authed, GetToken} from "../auth/Authentication";
import {BACKEND_HOME_API_AUTH, BACKEND_HOME_API_NON_AUTH} from "../config/config";

const HomeApiGet = async (uri) => {
    if(Authed()) {
        return await api.get(`${BACKEND_HOME_API_AUTH}${uri}`, {
            "headers": {
                "Authorization": `Bearer ${GetToken()}`
            }
        })
    } else {
        return await api.get(`${BACKEND_HOME_API_NON_AUTH}${uri}`);
    }
};

const GetApi = async (uri) => {
    return await api.get(`${uri}`, {
            "headers": {
                "Authorization": `Bearer ${GetToken()}`
            }
        })
};

export {
    HomeApiGet,
    GetApi
}
