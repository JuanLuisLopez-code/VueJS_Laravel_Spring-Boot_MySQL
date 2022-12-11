<template>
    <font-awesome-icon icon="fa-solid fa-arrow-left" class="fa-2x" style="cursor:pointer; margin-left:0.2em;"
        @click="redirects.return()" />
    <form_user_dashboardVue :user="state.user" v-if="state.user" @data="updateUser" />
</template>

<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { createToaster } from "@meforma/vue-toaster";
import Constant from '../../Constant';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import form_user_dashboardVue from '../../components/form_user_dashboard.vue';
export default {
    components: { form_user_dashboardVue },
    setup() {
        const toaster = createToaster({ "position": "top-right", "duration": 1500 });
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        store.dispatch(`userDashboard/${Constant.INITIALIZE_ONE_USER}`, route.params.id);

        const state = reactive({
            user: computed(() => store.getters['userDashboard/GetUser'])
        });

        const updateUser = (data) => {
            store.dispatch(`userDashboard/${Constant.UPDATE_USER}`, data);
            toaster.success('User updated');
            redirects.return();
        }//updateUser

        const redirects = {
            return: () => router.push({ name: 'usersList' }),
        };

        return { state, redirects, updateUser };
    }
}
</script>