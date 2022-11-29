import { ref } from 'vue';
import MesaService from '../../services/client/MesaService';

export const useMesaFilters = (filters = {}) => {
    const mesas = ref([])
    MesaService.GetMesas(filters)
        .then(res => mesas.value = res.data)
        .catch(error => console.error(error))
    return mesas;
};