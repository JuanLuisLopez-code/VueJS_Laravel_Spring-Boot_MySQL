import Api from "../Api";
import secrets from "../../secrets";

export default {

    GetUsers() {
        return Api(secrets.URL_LARAVEL).get('user');
    },//GetUsers

    GetOneUser(id) {
        return Api(secrets.URL_LARAVEL).get(`user/${id}`);
    },//GetOneUser


    DeleteUser(id) {
        return Api(secrets.URL_LARAVEL).delete(`user/${id}`);
    },//DeleteUser

    CreateUser(data) {
        return Api(secrets.URL_LARAVEL).post('user', data);
    },//CreateUser

    UpdateUser(data) {
        return Api(secrets.URL_LARAVEL).put(`user/${data.id}`, data);
    },//UpdateUser

}//export