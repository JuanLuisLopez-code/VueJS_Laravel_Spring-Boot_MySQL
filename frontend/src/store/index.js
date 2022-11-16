import Vuex from "vuex";

import { category } from './modules/category';

export default Vuex.createStore({

    modules: {
        category: category,
    }
});