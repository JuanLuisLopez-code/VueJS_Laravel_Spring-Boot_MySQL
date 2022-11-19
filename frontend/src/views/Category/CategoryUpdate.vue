<template>
    <h1>cu</h1>
    <p>{{ state }}</p>
</template>

<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { createToaster } from "@meforma/vue-toaster";
import Constant from '../../Constant';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const toaster = createToaster({ "position": "top-right", "duration": 1500 });
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        store.dispatch(`categoryDashboard/${Constant.INITIALIZE_ONE_CATEGORY}`, route.params.id);

        const state = reactive({
            category: computed(() => store.getters['categoryDashboard/GetCategory'])
        });

        return { state };
    }
}
</script>

<style lang="scss">

</style>