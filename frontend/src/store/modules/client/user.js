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
                    store.commit(Constant.LOGIN, response.data);
                    if (response.data.user.type == "admin") {
                        const response_admin = await UserService.Login_admin(payload);
                        if (response_admin.status === 200) {
                            store.commit(Constant.LOGIN_ADMIN, response_admin.data);
                        }
                    }
                }
            } catch (error) {
                toaster.error('Username or password incorrect');
            }
        },//LOGIN

        [Constant.LOGOUT]: async (store) => {
            try {
                const response = await UserService.Logout();
                let data = { status: response.status };
                if (store.state.isAdmin) {
                    const response_admin = await UserService.Logout_admin();
                    data.status_admin = response_admin.status;
                }
                store.commit(Constant.LOGOUT, data);
            } catch (error) {
                toaster.error('Logout error');
                store.commit(Constant.LOGOUT, { status: null, status_admin: null });
            }
        },//LOGOUT

        [Constant.ADD_USER]: async (store, payload) => {
            try {
                const response = await UserService.Register(payload);
                if (response.status === 201) {
                    store.commit(Constant.ADD_USER, true);
                }
            } catch (error) {
                toaster.error('Register error');
            }
        },//ADD_USER

        [Constant.INITIALIZE_PROFILE]: async (store) => {
            try {
                const response = await UserService.Profile();
                if (response.status === 200) {
                    store.commit(Constant.INITIALIZE_PROFILE, response.data);
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
                localStorage.setItem("token", payload.token);
                localStorage.setItem("isAuth", true);
                state.user = payload.user;
                state.isAuth = true;
                router.push({ name: 'home' });
            }
        },//LOGIN
        [Constant.LOGIN_ADMIN]: (state, payload) => {
            if (payload) {
                toaster.success('Login admin successfuly');
                localStorage.setItem("token_admin", payload.token);
                localStorage.setItem("isAdmin", true);
                state.user = payload.user;
                state.isAdmin = true;
                router.push({ name: 'home' });
            }
        },//LOGIN_ADMIN
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
                state.isAdmin = payload.type === 'admin';
                localStorage.setItem("isAuth", true);
                localStorage.setItem("isAdmin", payload.type === 'admin');
            }
        },//INITIALIZE_PROFILE

        [Constant.LOGOUT]: (state, payload) => {
            state.user = {};
            state.isAuth = false;
            state.isAdmin = false;
            localStorage.removeItem('token');
            localStorage.removeItem('token_admin');
            localStorage.removeItem('isAuth');
            localStorage.removeItem('isAdmin');
            router.push({ name: 'home' });

            if (payload.status === 200) {
                toaster.success('Logout successfuly')
            }
            if (payload.status_admin === 200) {
                toaster.success('Logout admin successfuly')
            }

        },//LOGOUT
    },//mutations
    getters: {
        GetProfile: (state) => {
            return state.user;
        },//GetProfile
        GetIsAuth: (state) => {
            return state.isAuth;
        },//GetIsAuth
        GetIsAdmin: (state) => {
            return state.isAdmin;
        },//GetIsAdmin

    }//getters
}//export