import Constant from '../../../Constant';
import MesaService from "../../../services/dashboard/MesaServiceDashboard"

export const mesaDashboard = {
    namespaced: true,
    mutations: {
        [Constant.INITIALIZE_MESA]: (state, payload) => {
            if (payload) {
                state.mesa = payload;
            }
        },
        [Constant.DELETE_ONE_MESA]: (state, payload) => {
            if (payload){
                state.mesa = state.mesa.filter((itemMesa) => itemMesa.id !== payload)
            }
        },
    },//mutations
    actions: {
        [Constant.INITIALIZE_MESA]: async (store) => {
            try {
                const response = await MesaService.GetMesas();
                store.commit(Constant.INITIALIZE_MESA, response.data.data);
            } catch (error) {
                console.error(error)
            }
        },
        [Constant.DELETE_ONE_MESA]: async (store, payload) => {
            try {
                await MesaService.DeleteMesa(payload.id);
                store.commit(Constant.DELETE_ONE_MESA, payload.id)
            } catch (error) {
                console.error(error)
            }
        },
    },//actions
    getters: {
        getMesas(state) {
            return state.mesa;
        },
    }//getters
}//export