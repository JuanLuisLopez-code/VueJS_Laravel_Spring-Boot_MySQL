import Api from "../Api";
import secrets from "../../secrets.example";

export default {

    GetMesas() {
        return Api(secrets.URL_LARAVEL).get('mesa');
    },//GetMesas

}//export