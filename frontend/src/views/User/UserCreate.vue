<template>
    <font-awesome-icon icon="fa-solid fa-arrow-left" class="fa-2x" style="cursor:pointer; margin-left:0.2em;"
        @click="redirects.return()" />
    <form_user_dashboardVue @data="createUser" />
</template>

<script>
import { useStore } from 'vuex';
import { createToaster } from "@meforma/vue-toaster";
import Constant from '../../Constant';
import { useRouter } from 'vue-router';
import form_user_dashboardVue from '../../components/form_user_dashboard.vue';
export default {
    components: { form_user_dashboardVue },
    setup() {
        const toaster = createToaster({ "position": "top-right", "duration": 1500 });
        const store = useStore();
        const router = useRouter();

        const createUser = (data) => {
            store.dispatch(`userDashboard/${Constant.ADD_USER}`, data);
            toaster.success('User added');
            redirects.return();
        }//createUser

        const redirects = {
            return: () => router.push({ name: 'usersList' }),
        };

        return { redirects, createUser };
    }
}
</script>