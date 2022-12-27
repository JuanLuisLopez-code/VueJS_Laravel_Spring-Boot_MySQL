import { ref } from 'vue';
import ReservationService from '../../services/client/ReservationService';

export const useReservationCreate = (data) => {
    //IMPORT ALERTS
    const reservation = ref([])
    ReservationService.CreateReservation(data)
        .then(res => {  })
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

export const UpdateReservation = (data) => {
    let data_ = {
        fecha_reserva: data.fecha_reserva,
        type_reservation: data.type_reservation
    }
    let id = data.mesa_id
    const UpdateReservation = ref([])
    ReservationService.UpdateReservation(data_, id)
        .then(res => { UpdateReservation.value = res.data })
        .catch(error => console.error(error))
    return UpdateReservation;
};

export const deleteReservation = (mesa_id) => {
    const deleteReservation = ref([])
    ReservationService.DeleteReservation(mesa_id)
        .then(res => { deleteReservation.value = res.data })
        .catch(error => console.error(error))
    return deleteReservation;
};