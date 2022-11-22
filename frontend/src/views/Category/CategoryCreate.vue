<template>
    <form_category_dashboardVue />
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

    }
}
</script>

<style lang="scss">

</style>