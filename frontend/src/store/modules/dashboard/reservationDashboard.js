import Constant from '../../../Constant';
import ReservationServiceDashboard from '../../../services/dashboard/ReservationServiceDashboard';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ "position": "top-right", "duration": 1500 });

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
            store.commit(Constant.UPDATE_RESERVATION, payload);
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
                console.log(payload);
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