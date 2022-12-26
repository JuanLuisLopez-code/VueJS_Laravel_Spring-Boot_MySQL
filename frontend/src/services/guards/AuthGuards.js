import store from '../../store';
import Constant from '../../Constant';
import UserService from '../client/UserService';

export default {

    async authGuardAdmin(to, from, next) {

        try {
            if (localStorage.getItem('isAdmin')) {
                const response = await UserService.isAdmin();
                if (response.status === 200) {
                    next();
                }
            } else {
                next('/login');
            }
        } catch (error) {
            store.dispatch(`user/${Constant.LOGOUT}`);

        }
    },//authGuardAdmin

    async AuthGuard(to, from, next) {
        if (localStorage.getItem('isAuth')) {
            await store.dispatch(`user/${Constant.INITIALIZE_PROFILE}`);
        }
        if (store.getters['user/GetIsAuth'] && localStorage.getItem('isAuth')) {
            next();
        } else {
            next('/home');
        }
    },//noAuthGuard

    noAuthGuard(to, from, next) {
        if (!store.getters['user/GetIsAuth'] && !localStorage.getItem('isAuth')) {
            next();
        } else {
            next('/home');
        }
    },//noAuthGuard
}//guards