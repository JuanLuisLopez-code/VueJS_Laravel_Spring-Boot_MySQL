import Api from "../Api";
import secrets from "../../secrets";

export default {

    CreateReservation(data) {
        return Api(secrets.URL_SPRING).post(`reservation/${data.mesa_id}`, data);
    },//CreateReservation

}//export