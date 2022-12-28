import axios from 'axios';
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { createToaster } from "@meforma/vue-toaster";
import Constant from '../Constant.js';
import secrets from "../secrets";


export default (URL) => {
    const toaster = createToaster({ "position": "top-right", "duration": 1500 });
    const store = useStore();
    const router = useRouter();

    const api = axios.create({
        baseURL: URL
    })

    const token = URL === secrets.URL_LARAVEL ? localStorage.getItem('token_admin') : localStorage.getItem('token');
    if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }//add token to header


    api.interceptors.response.use(
        (response) => response,
        (error) => {
            console.error(error);
            if (error.response.status === 401) {
                toaster.error('Forced logout. Unauthorized action');
                store.dispatch(`user/${Constant.LOGOUT}`);
                router.push({ name: "home" });
            }
            return Promise.reject(error);
        }//end if
    );//response interceptor remove token and user when unauthorized

    return api
}