import Vuex from "vuex";

import { mesa } from './modules/client/mesa.js';
import { category } from './modules/client/category';

export default Vuex.createStore({

    modules: {
        mesa: mesa,
        category: category,
    }
});