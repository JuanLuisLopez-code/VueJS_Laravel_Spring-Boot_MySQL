import Api from "../Api";
import secrets from "../../secrets";

export default {

    GetCategories() {
        return Api(secrets.URL_LARAVEL).get('category');
    },//GetCategories

    GetCategory(id) {
        return Api(secrets.URL_LARAVEL).get(`category/${id}`);
    },//GetCategory


    DeleteCategory(id) {
        return Api(secrets.URL_LARAVEL).delete(`category/${id}`);
    },//DeleteCategory

    CreateCategory(data) {
        return Api(secrets.URL_LARAVEL).post('category', data);
    },//CreateCategory

    UpdateCategory(data, id) {
        return Api(secrets.URL_LARAVEL).post(`category/${id}?_method=PUT`, data,);
    },//UpdateCategory

}//export