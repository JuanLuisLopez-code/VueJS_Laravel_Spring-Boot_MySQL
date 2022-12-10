import Constant from '../../../Constant';
import UserServiceDashboard from '../../../services/dashboard/UserServiceDashboard';

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

    },//actions
    mutations: {
        [Constant.INITIALIZE_USER]: (state, payload) => {
            if (payload) {
                state.users = payload;
            }
        },//INITIALIZE_USER

        [Constant.DELETE_USER]: (state, payload) => {
            if (payload) {
                state.users = state.users.filter(item => item.id !== payload);
            }
        },//DELETE_USER

    },//mutations
    getters: {
        GetUsers(state) {
            return state.users;
        },
    }//getters
}//export