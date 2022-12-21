<template>
    <font-awesome-icon icon="fa-solid fa-arrow-left" class="fa-2x" style="cursor:pointer; margin-left:0.2em;"
        @click="redirects.return()" />
    <form_reservation_dashboardVue :reservation="state.reservation" :key="state.reservation?.id"
        @data="updateReservation" />
</template>


<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import Constant from '../../Constant';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import form_reservation_dashboardVue from '../../components/form_reservation_dashboard.vue';

export default {
    components: { form_reservation_dashboardVue },
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        store.dispatch(`reservationDashboard/${Constant.INITIALIZE_ONE_RESERVATION}`, route.params.id);

        const state = reactive({
            reservation: computed(() => store.getters['reservationDashboard/GetOneReservation'])
        });

        const updateReservation = (data) => {
            store.dispatch(`reservationDashboard/${Constant.UPDATE_RESERVATION}`, data);
        }//updateReservation

        const redirects = {
            return: () => router.push({ name: 'reservationsList' }),
        };

        return { state, redirects, updateReservation };
    }
}
</script>