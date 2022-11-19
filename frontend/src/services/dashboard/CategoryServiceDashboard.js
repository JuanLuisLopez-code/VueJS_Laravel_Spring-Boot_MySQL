import Api from "../Api";
import secrets from "../../secrets.example";

export default {

    GetCategories() {
        return Api(secrets.URL_LARAVEL).get('category');
    },//GetCategories

    GetCategory(id) {
        return Api(secrets.URL_LARAVEL).get(`category/${id}`);
    },//GetCategory


    DeleteCategory(id) {
        return Api(secrets.URL_LARAVEL).delete(`category/${id}`);
    }//DeleteCategory

}//export