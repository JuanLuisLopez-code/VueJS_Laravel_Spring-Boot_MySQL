import Api from "../Api";
import secrets from "../../secrets.example";

export default {

    Register(data) {
        return Api(secrets.URL_LARAVEL).post('user', data);
    },//Register

    Login(data) {
        return Api(secrets.URL_LARAVEL).post('login', data);
    },//Login

    Logout() {
        return Api(secrets.URL_LARAVEL).post('logout');
    },//Logout

    Profile() {
        return Api(secrets.URL_LARAVEL).get('profile');
    },//Profile

}//export