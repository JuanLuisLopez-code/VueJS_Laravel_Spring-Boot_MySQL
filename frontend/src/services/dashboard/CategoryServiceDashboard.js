import Api from "../Api";
import secrets from "../../secrets.example";

export default {

    GetCategories() {
        return Api(secrets.URL_LARAVEL).get('category');
    },//GetCategories

}//export