<template>
    <font-awesome-icon icon="fa-solid fa-arrow-left" class="fa-2x" style="cursor:pointer; margin-left:0.2em;"
        @click="redirects.return()" />
    <form_category_dashboardVue :category="state.category" :key="state.category?.id" @data="updateCategory" />
</template>

<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { createToaster } from "@meforma/vue-toaster";
import Constant from '../../Constant';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import form_category_dashboardVue from '../../components/form_category_dashboard.vue';

export default {
    components: { form_category_dashboardVue },
    setup() {
        const toaster = createToaster({ "position": "top-right", "duration": 1500 });
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        store.dispatch(`categoryDashboard/${Constant.INITIALIZE_ONE_CATEGORY}`, route.params.id);

        const state = reactive({
            category: computed(() => store.getters['categoryDashboard/GetCategory'])
        });

        const updateCategory = (data) => {
            store.dispatch(`categoryDashboard/${Constant.UPDATE_CATEGORY}`, data);
            toaster.success('Category updated');
            router.push('/dashboard/categories');
        }//updateCategory

        const redirects = {
            return: () => router.push({ name: 'categoriesList' }),
        };

        return { state, updateCategory, redirects };
    }
}
</script>