import Api from "../Api";
import secrets from "../../secrets";

export default {

    GetAll() {
        return Api(secrets.URL_LARAVEL).get('/reservation');
    },

    DeleteReservation(id) {
        return Api(secrets.URL_LARAVEL).delete(`/reservation/${id}`);
    },

}//export