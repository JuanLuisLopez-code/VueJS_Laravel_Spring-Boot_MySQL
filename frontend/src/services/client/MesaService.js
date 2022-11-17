import Api from "../Api";
import secrets from "../../secrets.example";

export default {

    GetMesas() {
        return Api(secrets.URL_SPRING).get('mesa');
    },//GetMesas
    GetOneMesa(id) {
        return Api(secrets.URL_SPRING).get('mesa/' + id);
    },//GetOneLinkMesa

}//export