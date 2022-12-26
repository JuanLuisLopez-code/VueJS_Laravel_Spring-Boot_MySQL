import Vuex from "vuex";

import { mesa } from './modules/client/mesa.js';
import { category } from './modules/client/category';
import { mesaDashboard } from './modules/dashboard/mesaDashboard';
import { categoryDashboard } from './modules/dashboard/categoryDashboard';
import { userDashboard } from "./modules/dashboard/userDashboard.js";
import { user } from "./modules/client/user.js";
import { reservationDashboard } from "./modules/dashboard/reservationDashboard.js";

export default Vuex.createStore({

    modules: {
        mesa: mesa,
        category: category,
        mesaDashboard: mesaDashboard,
        categoryDashboard: categoryDashboard,
        userDashboard: userDashboard,
        user: user,
        reservationDashboard: reservationDashboard,
    }
});