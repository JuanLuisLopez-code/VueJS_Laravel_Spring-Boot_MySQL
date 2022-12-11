<template>
    <font-awesome-icon icon="fa-solid fa-arrow-left" class="fa-2x" style="cursor:pointer; margin-left:0.2em;"
        @click="redirects.return()" />
    <formMesa :mesa="stateOne.mesa" :key="stateOne.mesa?.id" @data="update_emit" />
</template>

<script>
import Constant from '../../Constant';
import { useRoute, useRouter } from 'vue-router'
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { createToaster } from "@meforma/vue-toaster";
import formMesa from '../../components/form_mesa_dashboard.vue'
export default {
    components: { formMesa },
    setup() {
        const toaster = createToaster({ position: "top-right" });
        const router = useRouter();
        const route = useRoute()
        const store = useStore();
        const id = route.params.id;

        store.dispatch(`mesaDashboard/${Constant.INITIALIZE_ONE_STATE_MESA}`, id)

        const stateOne = reactive({
            mesa: computed(() => store.getters["mesaDashboard/getOneMesa"])
        })

        const update_emit = (mesa) => {
            store.dispatch(`mesaDashboard/${Constant.UPDATE_ONE_MESA}`, mesa);
            toaster.success("Mesa updated")
           redirects.return();
        }

        const redirects = {
            return: () => router.push({ name: 'mesasList' }),
        };

        return { stateOne, update_emit, redirects }

    }
}
</script>

<style lang="scss">

</style>