import { ref } from 'vue';
import ReservationService from '../../services/client/ReservationService';

export const useReservationCreate = (data) => {
//IMPORT ALERTS
    const reservation = ref([])
    ReservationService.CreateReservation(data)
        .then(res => { console.log(res) })
        // .then(res => { toastr })
        .catch(error => console.error(error))
    return reservation;
};

export const useShowUserReservation = () => {
    const reservationUser = ref([])
    ReservationService.ListReservationUser()
        .then(res => { reservationUser.value = res.data })
        .catch(error => console.error(error))
    return reservationUser;
};

export const useListReservationsOfMesa = (mesa_id) => {
    const reservationOfMesa = ref([])
    ReservationService.ListReservationsOfMesa(mesa_id)
        .then(res => { reservationOfMesa.value = res.data })
        .catch(error => console.error(error))
    return reservationOfMesa;
};