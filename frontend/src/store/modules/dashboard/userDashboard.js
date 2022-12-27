import Constant from '../../../Constant';
import UserServiceDashboard from '../../../services/dashboard/UserServiceDashboard';
import { createToaster } from "@meforma/vue-toaster";
import router from '../../../router/index.js'
const toaster = createToaster({ "position": "top-right", "duration": 2300 });

export const userDashboard = {
    namespaced: true,
    actions: {
        [Constant.INITIALIZE_USER]: async (store) => {
            try {
                const response = await UserServiceDashboard.GetUsers()
                if (response.status === 200) {
                    store.commit(Constant.INITIALIZE_USER, response.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        },//INITIALIZE_USER

        [Constant.INITIALIZE_ONE_USER]: async (store, payload) => {
            try {
                const data = store.state.users ?? [];
                const index = data.findIndex(item => item.id == payload);
                if (index === -1) {
                    const response = await UserServiceDashboard.GetOneUser(payload);
                    store.commit(Constant.INITIALIZE_ONE_USER, response.data.data);
                } else {
                    store.commit(Constant.INITIALIZE_ONE_USER, store.state.users[index]);
                }
            } catch (error) {
                console.error(error);
            }
        },//INITIALIZE_ONE_USER

        [Constant.DELETE_USER]: async (store, payload) => {
            try {
                const response = await UserServiceDashboard.DeleteUser(payload)
                if (response.status === 200) {
                    store.commit(Constant.DELETE_USER, payload);
                }
            } catch (error) {
                console.error(error);
            }
        },//DELETE_USER

        [Constant.UPDATE_USER]: async (store, payload) => {
            try {
                const response = await UserServiceDashboard.UpdateUser(payload);
                if (response.status === 200) {
                    store.commit(Constant.UPDATE_USER, response.data.data);
                }
            } catch (error) {
                if (error.response.status === 400) {
                    toaster.error('Username or email taken');
                };
            }
        },//UPDATE_USER

        [Constant.ADD_USER]: async (store, payload) => {
            try {
                const response = await UserServiceDashboard.CreateUser(payload);
                if (response.status === 201) {
                    store.commit(Constant.ADD_USER, response.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        },//ADD_USER

    },//actions
    mutations: {
        [Constant.INITIALIZE_USER]: (state, payload) => {
            if (payload) {
                state.users = payload;
            }
        },//INITIALIZE_USER

        [Constant.INITIALIZE_ONE_USER]: (state, payload) => {
            if (payload) {
                state.user = payload;
            }
        },//INITIALIZE_ONE_USER

        [Constant.DELETE_USER]: (state, payload) => {
            if (payload) {
                state.users = state.users.filter(item => item.id !== payload);
            }
        },//DELETE_USER

        [Constant.UPDATE_USER]: (state, payload) => {
            const index = (state.users ?? []).findIndex(item => item.id == payload.id);
            if (index !== -1) {
                let data = { ...payload };
                data['is_active'] = Number(data['is_active']);
                state.users[index] = data;
                toaster.success('User updated');
                router.push({ name: 'usersList' });
            }
        },//UPDATE_USER

        [Constant.ADD_USER]: (state, payload) => {
            if (payload) {
                let data = { ...payload };
                data['is_active'] = Number(data['is_active']);
                state.users.push(data);
            }
        },//ADD_USER

    },//mutations
    getters: {
        GetUsers(state) {
            return state.users;
        },

        GetUser(state) {
            return state.user;
        },
    }//getters
}//export