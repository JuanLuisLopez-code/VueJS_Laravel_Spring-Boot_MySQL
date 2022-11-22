import Api from "../Api";
import secrets from "../../secrets.example";

export default {

    GetMesas() {
        return Api(secrets.URL_LARAVEL).get('mesa');
    },//GetMesas
    DeleteMesa(id) {
        return Api(secrets.URL_LARAVEL).delete(`mesa/${id}`)
    }
}//export