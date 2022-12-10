import Api from "../Api";
import secrets from "../../secrets.example";

export default {

    GetUsers() {
        return Api(secrets.URL_LARAVEL).get('user');
    },//GetUsers

    DeleteUser(id) {
        return Api(secrets.URL_LARAVEL).delete(`user/${id}`);
    },//DeleteUser

}//export