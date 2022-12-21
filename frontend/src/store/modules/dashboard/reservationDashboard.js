import Constant from '../../../Constant';
import ReservationServiceDashboard from '../../../services/dashboard/ReservationServiceDashboard';
import { createToaster } from "@meforma/vue-toaster";
import router from '../../../router/index.js'
const toaster = createToaster({ "position": "top-right", "duration": 2300 });

export const reservationDashboard = {
    namespaced: true,
    actions: {
        [Constant.INITIALIZE_RESERVATION]: async (store) => {
            try {
                const response = await ReservationServiceDashboard.GetAll();
                if (response.status === 200) {
                    store.commit(Constant.INITIALIZE_RESERVATION, response.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        },
        [Constant.DELETE_RESERVATION]: async (store, payload) => {
            try {
                const response = await ReservationServiceDashboard.DeleteReservation(payload);
                if (response.status === 200) {
                    store.commit(Constant.DELETE_RESERVATION, payload);
                }
            } catch (error) {
                console.error(error);

            }
        },
        [Constant.INITIALIZE_ONE_RESERVATION]: async (store, payload) => {

            try {
                const data = store.state.reservations ?? [];
                const index = data.findIndex(item => item.id == payload);
                if (index === -1) {
                    const response = await ReservationServiceDashboard.GetOne(payload);
                    if (response.status === 200) {
                        store.commit(Constant.INITIALIZE_ONE_RESERVATION, response.data.data);
                    }
                } else {
                    store.commit(Constant.INITIALIZE_ONE_RESERVATION, store.state.reservations[index]);
                }
            } catch (error) {
                console.error(error);
            }
        },
        [Constant.UPDATE_RESERVATION]: async (store, payload) => {
            try {
                const response = await ReservationServiceDashboard.UpdateReservation(payload);
                if (response.status == 200) {
                    store.commit(Constant.UPDATE_RESERVATION, payload);
                }
            } catch (error) {
                const status = error.response.status ?? 0;
                if (status === 404) {
                    toaster.error('Need to make a change');
                }
                if (status === 304) {
                    toaster.error('The table is already reserved that day and in that type');
                }
            }
        },
    },//mutations
    mutations: {
        [Constant.INITIALIZE_RESERVATION]: (state, payload) => {
            if (payload) {
                state.reservations = payload;
            }
        },
        [Constant.DELETE_RESERVATION]: (state, payload) => {
            if (payload) {
                state.reservations = state.reservations.filter(item => item.id !== payload);
            }
        },
        [Constant.INITIALIZE_ONE_RESERVATION]: (state, payload) => {
            if (payload) {
                state.reservation = payload;
            }
        },
        [Constant.UPDATE_RESERVATION]: (state, payload) => {
            if (payload) {
                const data = state.reservations ?? []
                const index = data.findIndex(item => item.id === payload.id);
                if (index !== -1) {
                    payload.accepted = Number(payload.accepted);
                    state.reservations[index] = payload;
                }
                router.push({ name: 'reservationsList' });
            }
        },
    },//actions
    getters: {
        GetReservations(state) {
            return state.reservations
        },
        GetOneReservation(state) {
            return state.reservation
        }
    }//getters
}//export