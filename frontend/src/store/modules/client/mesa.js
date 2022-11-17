import Constant from '../../../Constant';
import MesaService from "../../../services/client/MesaService"

export const mesa = {
    namespaced: true,
    mutations: {
        [Constant.INITIALIZE_MESA]: (state, payload) => {
            if (payload) {
                state.mesa = payload;
            }
        },
        [Constant.INITIALIZE_ONE_STATE_MESA]: (state, payload) => {
            if (payload) {
                state.OneMesa = payload;
            }
        },
    },//mutations
    actions: {
        [Constant.INITIALIZE_MESA]: async (store) => {
            try {
                const response = await MesaService.GetMesas();
                store.commit(Constant.INITIALIZE_MESA, response.data);
            } catch (error) {
                console.error(error)
            }
        },
        [Constant.INITIALIZE_ONE_STATE_MESA]: async (store, payload) => {
            try {
                if (store.state.mesa != undefined) {
                    const index = store.state.mesa.findIndex(object => {
                        return object.id === parseInt(payload);
                    });
                    store.commit(Constant.INITIALIZE_ONE_STATE_MESA, store.state.mesa[index]);
                } else {
                    const response = await MesaService.GetOneMesa(payload);
                    store.commit(Constant.INITIALIZE_ONE_STATE_MESA, response.data);
                }
            } catch (error) {
                console.error(error)
            }
        },
    },//actions
    getters: {
        getMesas(state) {
            return state.mesa;
        },
        getOneMesa(state) {
            return state.OneMesa;
        },
    }//getters
}//export