import Api from "../Api";
import secrets from "../../secrets.example";

export default {

    GetMesas(params) {
        return Api(secrets.URL_SPRING).get('mesa', { params: { categories: params.categories }, });

    },//GetMesas
    GetOneMesa(id) {
        return Api(secrets.URL_SPRING).get('mesa/' + id);
    },//GetOneMesa

}//export