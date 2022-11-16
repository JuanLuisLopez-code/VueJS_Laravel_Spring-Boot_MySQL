import Vuex from "vuex";

import { mesa } from './modules/mesa.js';

export default Vuex.createStore({

    modules: {
        mesa: mesa
    }
});