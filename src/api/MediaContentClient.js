import api from "./BackendApi";
import {BACKEND_IS_WATCHED_URI} from "../config/config";
import {GetToken} from "../auth/Authentication";

const MediaContentDataList = async (type) => {
    await api.get(`${BACKEND_IS_WATCHED_URI}/${type}`, {
        "headers": {
            "Authorization": `Bearer ${GetToken()}`
        }
    })
};

export {
    MediaContentDataList
}
