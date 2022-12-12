import Constant from '../../../Constant';
import UserService from '../../../services/client/UserService';
import { createToaster } from "@meforma/vue-toaster";
import router from '../../../router/index.js'

const toaster = createToaster({ "position": "top-right", "duration": 1500 });
export const user = {
    namespaced: true,
    state: {
        user: {},
        isAuth: false,
        isAdmin: false
    },
    actions: {
        [Constant.LOGIN]: async (store, payload) => {
            try {
                const response = await UserService.Login(payload);
                if (response.status === 200) {
                    store.commit(Constant.LOGIN, response.data.Token);
                }
            } catch (error) {
                toaster.error('Login error');
            }
        },//LOGIN

        [Constant.LOGOUT]: async (store) => {
            try {
                const response = await UserService.Logout();
                store.commit(Constant.LOGOUT);
            } catch (error) {
                toaster.error('Logout error');
            }
        },//LOGOUT

        [Constant.ADD_USER]: async (store, payload) => {
            console.log(payload);
            try {
                const response = await UserService.Register(payload);
                if (response.status === 201) {
                    store.commit(Constant.ADD_USER, response.data.data);
                }
            } catch (error) {
                toaster.error('Register error');
            }
        },//ADD_USER

        [Constant.INITIALIZE_PROFILE]: async (store) => {
            try {
                const response = await UserService.Profile();
                if (response.status === 200) {
                    store.commit(Constant.INITIALIZE_PROFILE, response.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        },//INITIALIZE_PROFILE

    },//actions
    mutations: {
        [Constant.LOGIN]: (state, payload) => {
            if (payload) {
                toaster.success('Login successfuly');
                localStorage.setItem("token", payload);
                router.push({ name: 'home' });
            }
        },//LOGIN
        [Constant.ADD_USER]: (state, payload) => {
            if (payload) {
                toaster.success('Register successfuly');
                router.push({ name: 'login' });
            }
        },//ADD_USER
        [Constant.INITIALIZE_PROFILE]: (state, payload) => {
            if (payload) {
                state.user = payload;
                state.isAuth = true;
            }
        },//INITIALIZE_PROFILE

        [Constant.LOGOUT]: (state) => {
            toaster.success('Logout successfuly');
            state.user = {};
            state.isAuth = false;
            state.isAdmin = false;
            localStorage.removeItem('token');
            router.push({ name: 'home' });

        },//LOGOUT
    },//mutations
    getters: {
        GetProfile: (state) => {
            return state.user;
        },//GetProfile

    }//getters
}//export