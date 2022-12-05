import { ref } from 'vue';
import MesaService from '../../services/client/MesaService';

export const useMesaFilters = (filters = {}) => {
    const mesas = ref([])
    MesaService.GetMesas(filters)
        .then(res => {mesas.value = res.data, console.log(res)})
        .catch(error => console.error(error))
    return mesas;
};

export const useMesaInfinite = (page = 1, limit = 3) => {
    const mesas = ref([])
    MesaService.GetMesasInfinite(page, limit)
        .then(res => mesas.value = res.data)
        .catch(error => console.error(error))
    return mesas;
};