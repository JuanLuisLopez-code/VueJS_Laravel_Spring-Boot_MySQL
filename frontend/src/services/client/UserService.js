import Api from "../Api";
import secrets from "../../secrets.example";

export default {

    Register(data) {
        return Api(secrets.URL_LARAVEL).post('user', data);
    },//Register

    Login(data) {
        return Api(secrets.URL_LARAVEL).post('login', data);
    },//Login

    Logout(data) {
        return Api(secrets.URL_LARAVEL).post('logout', data);
    },//Logout

    Profile() {
        return Api(secrets.URL_LARAVEL).get('profile');
    },//Profile

}//export