import Constant from '../../Constant';
import CategoryService from '../../services/CategoryService';

export const category = {
    namespaced: true,
    actions: {
        [Constant.INITIALIZE_CATEGORY]: async (store) => {
            try {
                const response = await CategoryService.GetCategories();
                store.commit(Constant.INITIALIZE_CATEGORY, response.data);
            } catch (error) {
                console.error(error);
            }
        },

    },//actions
    mutations: {
        [Constant.INITIALIZE_CATEGORY]: (state, payload) => {
            if (payload) {
                state.categories = payload;
            }
        }
    },//mutations
    getters: {
        GetCategories(state) {
            return state.categories;
        }
    }//getters
}//export