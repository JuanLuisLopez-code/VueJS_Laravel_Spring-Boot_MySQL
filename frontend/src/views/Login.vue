<template>
    <loginRegisterFormVue :isLogin="true" @send="login" />
</template>

<script>
import loginRegisterFormVue from '../components/loginRegisterForm.vue';
import Constant from '../Constant';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    components: { loginRegisterFormVue },
    setup() {
        const store = useStore();
        const router = useRouter();
        const login = (data) => {
            store.dispatch(`user/${Constant.LOGIN}`, data);
            router.push({ name: "home" });
        }

        return { login };
    }
}
</script>

<style lang="scss">

</style>