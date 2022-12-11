<template>
    <font-awesome-icon icon="fa-solid fa-arrow-left" class="fa-2x" style="cursor:pointer; margin-left:0.2em;"
        @click="redirects.return()" />
    <form_category_dashboardVue @data="createCategory" />
</template>

<script>
import { useStore } from 'vuex';
import { createToaster } from "@meforma/vue-toaster";
import Constant from '../../Constant';
import { useRouter } from 'vue-router';
import form_category_dashboardVue from '../../components/form_category_dashboard.vue';
export default {
    components: { form_category_dashboardVue },
    setup() {
        const toaster = createToaster({ "position": "top-right", "duration": 1500 });
        const store = useStore();
        const router = useRouter();

        const createCategory = (data) => {
            store.dispatch(`categoryDashboard/${Constant.ADD_CATEGORY}`, data);
            toaster.success('Category added');
            redirects.return();
        }//createCategory

        const redirects = {
            return: () => router.push({ name: 'categoriesList' }),
        };

        return { createCategory, redirects };
    }
}
</script>