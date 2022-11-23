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
        },//INITIALIZE_CATEGORY
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
        },//INITIALIZE_ONE_CATEGORY
        [Constant.DELETE_CATEGORY]: async (store, payload) => {
            try {
                const response = await CategoryServiceDashboard.DeleteCategory(payload);
                if (response.status === 200) {
                    store.commit(Constant.DELETE_CATEGORY, payload);
                }
            } catch (error) {
                console.error(error);
            }
        },//DELETE_CATEGORY
        [Constant.ADD_CATEGORY]: async (store, payload) => {
            try {
                const response = await CategoryServiceDashboard.CreateCategory(payload);
                if (response.status === 201) {
                    store.commit(Constant.ADD_CATEGORY, response.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        },//ADD_CATEGORY
        [Constant.UPDATE_CATEGORY]: async (store, payload) => {
            try {
                const response = await CategoryServiceDashboard.UpdateCategory(payload);
                if (response.status === 200) {
                    store.commit(Constant.UPDATE_CATEGORY, payload);
                }
            } catch (error) {
                console.error(error);
            }
        },//UPDATE_CATEGORY

    },//actions
    mutations: {
        [Constant.INITIALIZE_CATEGORY]: (state, payload) => {
            if (payload) {
                state.categories = payload;
            }
        },//INITIALIZE_CATEGORY
        [Constant.INITIALIZE_ONE_CATEGORY]: (state, payload) => {
            if (payload) {
                state.category = payload;
            }
        },//INITIALIZE_ONE_CATEGORY
        [Constant.DELETE_CATEGORY]: (state, payload) => {
            state.categories = state.categories.filter(item => item.id !== payload);
        },//DELETE_CATEGORY
        [Constant.ADD_CATEGORY]: (state, payload) => {
            if (payload) {
                state.categories.push(payload);
            }
        },//ADD_CATEGORY
        [Constant.UPDATE_CATEGORY]: (state, payload) => {
            const index = (state.categories ?? []).findIndex(item => item.id == payload.id);
            if (index !== -1) {
                state.categories[index] = payload;
            }
        },//UPDATE_CATEGORY
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