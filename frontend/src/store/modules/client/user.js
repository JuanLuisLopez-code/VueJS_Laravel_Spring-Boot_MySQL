import Constant from '../../../Constant';
import UserService from '../../../services/client/UserService';

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
                console.error(error);
            }
        },//LOGIN

    },//actions
    mutations: {
        [Constant.LOGIN]: (state, payload) => {
            if (payload) {
                console.log(payload);
                localStorage.setItem('token', payload);
            }
        },//LOGIN
    },//mutations
    getters: {

    }//getters
}//export