<template>
    <formMesa @data="create_emit" />
</template>

<script>
import { reactive, computed } from 'vue';
import Constant from '../../Constant';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { createToaster } from "@meforma/vue-toaster";
import formMesa from '../../components/form_mesa_dashboard.vue'

export default {
    components: { formMesa },
    setup() {
        const toaster = createToaster({ position: "top-right" });
        const router = useRouter();
        const store = useStore();

        const create_emit = (mesa) => {
            store.dispatch(`mesaDashboard/${Constant.CREATE_ONE_MESA}`, mesa);
            router.push({ name: "mesasList" })
            toaster.info("Mesa created")
        }

        return { create_emit }
    }
}
</script>