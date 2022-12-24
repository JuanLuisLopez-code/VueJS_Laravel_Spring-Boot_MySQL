import Api from "../Api";
import secrets from "../../secrets";

export default {

    Register(data) {
        return Api(secrets.URL_SPRING).post('register', data);
    },//Register

    Login(data) {
        return Api(secrets.URL_SPRING).post('login', data);
    },//Login

    Login_admin(data) {
        return Api(secrets.URL_LARAVEL).post('login', data);
    },//Login

    Logout() {
        return Api(secrets.URL_SPRING).post('logout');
    },//Logout

    Logout_admin() {
        return Api(secrets.URL_LARAVEL).post('logout');
    },//Logout

    Profile() {
        return Api(secrets.URL_SPRING).get('profile');
    },//Profile

    isAdmin() {
        return Api(secrets.URL_LARAVEL).get('isAdmin');
    },//Profile

}//export