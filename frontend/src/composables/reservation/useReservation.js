import { ref } from 'vue';
import ReservationService from '../../services/client/ReservationService';

export const useReservationCreate = (data) => {

    const reservation = ref([])
    ReservationService.CreateReservation(data)
        .then(res => { console.log(res) })
        .catch(error => console.error(error))
    return reservation;
};