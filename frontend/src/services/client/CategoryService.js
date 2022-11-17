import Api from "../Api";
import secrets from "../../secrets";

export default {

    GetCategories() {
        return Api(secrets.URL_SPRING).get('category');
    }//GetCategories

}//export