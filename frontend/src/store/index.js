import Vuex from "vuex";

import { mesa } from './modules/mesa.js';
import { category } from './modules/category';

export default Vuex.createStore({

    modules: {
        mesa: mesa,
        category: category,
    }
});