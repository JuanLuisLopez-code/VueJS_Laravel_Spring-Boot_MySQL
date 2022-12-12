<template>
    <loginRegisterFormVue :isLogin="false" @send="register" />
</template>

<script>
import loginRegisterFormVue from '../components/loginRegisterForm.vue';
import Constant from '../Constant';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { createToaster } from "@meforma/vue-toaster";

export default {
    components: { loginRegisterFormVue },
    setup() {
        const toaster = createToaster({ "position": "top-right", "duration": 1500 });
        const store = useStore();
        const router = useRouter();

        const register = (data) => {
            store.dispatch(`user/${Constant.ADD_USER}`, data);
            router.push({ name: "login" });
        }

        return { register };
    }
}
</script>

<style lang="scss">

</style>