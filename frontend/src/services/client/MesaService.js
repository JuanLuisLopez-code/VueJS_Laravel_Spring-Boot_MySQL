import Api from "../Api";
import secrets from "../../secrets";

export default {
    FormatFilters(params) {
        let params_ = [];
        Object.entries(params).forEach(item => {
            if (item[0] === 'categories' && item[1].length > 0) {
                const categories = item[1].map(item => `categories=${item}`).join('&');
                params_.push(categories)
            } else if (item[1] != null) {
                params_.push(`${item[0]}=${item[1]}`);
            }
        });
        return params_.join('&')
    },

    GetMesas(params) {
        return Api(secrets.URL_SPRING).get(`mesa?${this.FormatFilters(params)}`);
    },//GetMesas

    GetMesasPaginate(params) {
        return Api(secrets.URL_SPRING).get(`mesaPaginate?${this.FormatFilters(params)}`);
    },//GetMesas

    GetOneMesa(id) {
        return Api(secrets.URL_SPRING).get('mesa/' + id);
    },//GetOneMesa

    GetMesasInfinite(page, limit) {
        return Api(secrets.URL_SPRING).get('mesaInfinite', { params: { page: page, limit: limit } });
    },//GetOneMesa

}//export