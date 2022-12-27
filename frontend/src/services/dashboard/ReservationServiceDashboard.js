import Api from "../Api";
import secrets from "../../secrets";

export default {

    GetAll() {
        return Api(secrets.URL_LARAVEL).get('/reservation');
    },

    GetOne(id) {
        return Api(secrets.URL_LARAVEL).get(`/reservation/${id}`);
    },

    DeleteReservation(id) {
        return Api(secrets.URL_LARAVEL).delete(`/reservation/${id}`);
    },

    UpdateReservation(data) {
        return Api(secrets.URL_LARAVEL).put(`/reservation/${data.id}`, data);
    },

}//export