<template>
    <font-awesome-icon icon="fa-solid fa-arrow-left" class="fa-2x" style="cursor:pointer; margin-left:0.2em;"
        @click="redirects.return()" />
    <formMesa @data="create_emit" />
</template>

<script>
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
            toaster.success("Mesa created")
            redirects.return();
        }

        const redirects = {
            return: () => router.push({ name: 'mesasList' }),
        };

        return { create_emit, redirects }
    }
}
</script>