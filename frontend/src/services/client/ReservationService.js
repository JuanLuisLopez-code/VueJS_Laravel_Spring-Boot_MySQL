import Api from "../Api";
import secrets from "../../secrets";

export default {

    CreateReservation(data) {
        return Api(secrets.URL_SPRING).post(`reservation/${data.mesa_id}`, data);
    },//CreateReservation

    ListReservationUser() {
        return Api(secrets.URL_SPRING).get(`listReservation`);
    },//ListReservationUser

    ListReservationsOfMesa(mesa_id) {
        return Api(secrets.URL_SPRING).get(`listReservation/${mesa_id}`);
    },//ListReservationUser

}//export