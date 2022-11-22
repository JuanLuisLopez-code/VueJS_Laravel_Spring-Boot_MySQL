import Vuex from "vuex";

import { mesa } from './modules/client/mesa.js';
import { category } from './modules/client/category';
import { mesaDashboard } from './modules/dashboard/mesaDashboard';
import { categoryDashboard } from './modules/dashboard/categoryDashboard';

export default Vuex.createStore({

    modules: {
        mesa: mesa,
        category: category,
        mesaDashboard: mesaDashboard,
        categoryDashboard: categoryDashboard,
    }
});