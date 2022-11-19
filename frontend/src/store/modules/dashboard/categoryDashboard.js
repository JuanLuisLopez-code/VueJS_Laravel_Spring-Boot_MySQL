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
        [Constant.INITIALIZE_ONE_CATEGORY]: async (store, payload) => {
            try {
                const data = store.state.categories ?? [];
                const index = data.findIndex(item => item.id == payload);
                if (index === -1) {
                    const response = await CategoryServiceDashboard.GetCategory(payload);
                    store.commit(Constant.INITIALIZE_ONE_CATEGORY, response.data.data);
                } else {
                    store.commit(Constant.INITIALIZE_ONE_CATEGORY, store.state.categories[index]);
                }
            } catch (error) {
                console.error(error);
            }
        },
        [Constant.DELETE_CATEGORY]: async (store, payload) => {
            try {
                const response = await CategoryServiceDashboard.DeleteCategory(payload);
                if (response.status === 200) {
                    store.commit(Constant.DELETE_CATEGORY, payload);
                }
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
        },
        [Constant.INITIALIZE_ONE_CATEGORY]: (state, payload) => {
            if (payload) {
                state.category = payload;
            }
        },
        [Constant.DELETE_CATEGORY]: (state, payload) => {
            state.categories = state.categories.filter(item => item.id !== payload);
        }
    },//mutations
    getters: {
        GetCategories(state) {
            return state.categories;
        },
        GetCategory(state) {
            return state.category;
        }
    }//getters
}//export