import Constant from '../../../Constant';
import ReservationServiceDashboard from '../../../services/dashboard/ReservationServiceDashboard';

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
    },//mutations
    mutations: {
        [Constant.INITIALIZE_RESERVATION]: (state, payload) => {
            if (payload) {
                state.reservations = payload;
            }
        },
    },//actions
    getters: {
        GetReservations(state) {
            return state.reservations
        }
    }//getters
}//export