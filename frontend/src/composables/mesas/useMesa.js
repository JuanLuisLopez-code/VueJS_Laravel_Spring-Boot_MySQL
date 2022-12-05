import { ref } from 'vue';
import MesaService from '../../services/client/MesaService';

export const useMesaFilters = (filters = {}) => {
    filters.limit = 9;
    const mesas = ref([])
    MesaService.GetMesas(filters)
        .then(res => { mesas.value = res.data })
        .catch(error => console.error(error))
    return mesas;
};

export const useMesaPaginate = (filters = {}) => {
    filters.limit = 1000;
    const count_mesas = ref([])
    MesaService.GetMesas(filters)
        .then(res => count_mesas.value = Math.ceil(res.data.length / 9))
        .catch(error => console.error(error))
    return count_mesas;
};

export const useMesaInfinite = (page = 1, limit = 3) => {
    const mesas = ref([])
    MesaService.GetMesasInfinite(page, limit)
        .then(res => mesas.value = res.data)
        .catch(error => console.error(error))
    return mesas;
};