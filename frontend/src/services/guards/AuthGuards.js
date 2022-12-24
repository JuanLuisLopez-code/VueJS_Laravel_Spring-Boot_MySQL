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
            // next('/login');
            store.dispatch(`user/${Constant.LOGOUT}`);

        }
    },//authGuardAdmin

    noAuthGuard(to, from, next) {
        if (!store.getters['user/GetIsAuth'] && !localStorage.getItem('isAuth')) {
            next();
        } else {
            next('/home');
        }
    },//noAuthGuard
}//guards