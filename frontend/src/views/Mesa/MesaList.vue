<template>
    <tableMesa :mesas="state.mesas" />
</template>

<script>

import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import Constant from '../../Constant';
import tableMesa from '../../components/tableMesa.vue'
export default {
    components: { tableMesa },
    setup() {
        const store = useStore();

        store.dispatch(`mesaDashboard/${Constant.INITIALIZE_MESA}`)

        const state = reactive({
            mesas: computed(() => store.getters["mesaDashboard/getMesas"])
        })

        return { state }
    }
}
</script>