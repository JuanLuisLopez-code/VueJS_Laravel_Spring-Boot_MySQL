import Api from "../Api";
import secrets from "../../secrets.example";

export default {

    GetMesas(params) {
        let params_ = [];
        Object.entries(params).forEach(item => {
            if (item[0] === 'categories' && item[1].length > 0) {
                const categories = item[1].map(item => `categories=${item}`).join('&');
                params_.push(categories)
            } else if (item[1] != null) {
                params_.push(`${item[0]}=${item[1]}`);
            }
        });
        console.log(params_.join('&'));
        return Api(secrets.URL_SPRING).get(`mesa?${params_.join('&')}`);

    },//GetMesas
    GetOneMesa(id) {
        return Api(secrets.URL_SPRING).get('mesa/' + id);
    },//GetOneMesa

}//export