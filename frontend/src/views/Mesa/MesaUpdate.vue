<template>
    <formMesa :mesa="stateOne.mesa" :key="stateOne.mesa?.id" @data="prueba"/>
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

        const prueba = (mesa) =>{
            store.dispatch(`mesaDashboard/${Constant.UPDATE_ONE_MESA}`, mesa);
            router.push({ name: "mesasList" })
            toaster.info("Mesa updated")
        }

        return { stateOne, prueba }

    }
}
</script>

<style lang="scss">

</style>