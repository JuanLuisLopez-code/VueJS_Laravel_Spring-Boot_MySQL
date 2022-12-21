import store from '../../store';
import Constant from '../../Constant';

export default {

    async authGuardAdmin(to, from, next) {

        if (localStorage.getItem('isAdmin')) {
            await store.dispatch(`user/${Constant.INITIALIZE_PROFILE}`);
        }

        if (store.getters['user/GetIsAdmin'] && localStorage.getItem('isAdmin')) {
            next();
        } else {
            next('/login');
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