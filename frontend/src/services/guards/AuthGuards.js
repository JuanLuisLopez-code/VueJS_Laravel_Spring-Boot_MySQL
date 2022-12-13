import store from '../../store';
import Constant from '../../Constant';

export default {

    // authGuardUser(to, from, next) {
    //     if (store.getters['user/GetIsAuth'] && localStorage.getItem('isAuth')) {
    //         next();
    //     } else {
    //         next('/login');
    //     }
    // },//authGuardUser

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

    noAuthGuard(to, from, next) {
        if (!store.getters['user/GetIsAuth'] && !localStorage.getItem('isAuth')) {
            next();
        } else {
            next('/home');
        }
    },//noAuthGuard
}//guards