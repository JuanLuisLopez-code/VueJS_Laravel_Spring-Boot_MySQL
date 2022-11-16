import Constant from '../../Constant';
import MesaService from "../../services/MesaService"

export const mesa = {
    namespaced: true,
    mutations: {
        [Constant.INITIALIZE_MESA]: (state, payload) => {
            if (payload){
                state.mesa = payload;
            }
        }
    },//mutations
    actions: {
        [Constant.INITIALIZE_MESA]: async (store) => {
            const response = await MesaService.GetMesas();
            console.log(response.data)
            store.commit(Constant.INITIALIZE_MESA, response.data);
        },

    },//actions
    getters: {
        getMesas(state) {
            return state.mesa;
        },
    }//getters
}//export