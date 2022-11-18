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
    },//actions
    getters: {
        getMesas(state) {
            return state.mesa;
        },
    }//getters
}//export