import { reactive, watch, computed, watchEffect, ref } from 'vue';
import MesaService from '../../services/client/MesaService';

// export const useMesaFilters = (filters = []) => {
//     console.log('useMesaFilters');
//     const state = reactive({
//         mesas: [],
//     });
//     const count = computed(() => state.mesas.length);
//     console.log(count);
//     watch(
//         () => count,
//         async () => {
//             console.log('a');
//             try {
//                 const res = await MesaService.GetMesas(filters);
//                 const data = res.data;
//                 console.log(data);
//                 state.mesas = data;
//             } catch (error) {
//                 console.error(error);
//             }
//         });

//     return state;
// };

// export const useMesaFilters = (filters = []) => {
//     // console.log(filters);
//     const state = reactive({
//         mesas: [],
//     });

//     watchEffect(async () => {
//         try {
//             const res = await MesaService.GetMesas(filters);
//             const data = res.data;
//             state.mesas = data;
//             console.log(state.mesas, "asdasd");
//         } catch (error) {
//             console.error(error);
//         }
//     });

//     return state;
// };


export const useMesaFilters = async (filters = []) => {
    // console.log(filters);
    const mesas = ref([]);
    try {
        const res = await MesaService.GetMesas(filters);
        const data = res.data;
        // console.log(data);
        mesas.value = data;
        // console.log(mesas);
    } catch (error) {
        console.error(error);
    }

    return { mesas };
};