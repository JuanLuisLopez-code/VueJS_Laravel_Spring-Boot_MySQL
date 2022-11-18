import Vuex from "vuex";

import { mesa } from './modules/client/mesa.js';
import { category } from './modules/client/category';
import { categoryDashboard } from './modules/dashboard/categoryDashboard';

export default Vuex.createStore({

    modules: {
        mesa: mesa,
        category: category,
        categoryDashboard: categoryDashboard
    }
});