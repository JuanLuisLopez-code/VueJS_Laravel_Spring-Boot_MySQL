import Constant from '../../../Constant';
import CategoryServiceDashboard from '../../../services/dashboard/CategoryServiceDashboard';

export const categoryDashboard = {
    namespaced: true,
    actions: {
        [Constant.INITIALIZE_CATEGORY]: async (store) => {
            try {
                const response = await CategoryServiceDashboard.GetCategories();
                store.commit(Constant.INITIALIZE_CATEGORY, response.data.data);
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