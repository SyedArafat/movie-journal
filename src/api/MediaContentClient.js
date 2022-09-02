import api from "./BackendApi";
import {Authed, GetToken} from "../auth/Authentication";
import {BACKEND_HOME_API_AUTH, BACKEND_HOME_API_NON_AUTH} from "../config/config";

const ApiGet = async (uri) => {
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

export {
    ApiGet
}
