<template>
    <loginRegisterFormVue :isLogin="true" @send="login" />
</template>

<script>
import loginRegisterFormVue from '../components/loginRegisterForm.vue';
import Constant from '../Constant';
import { useStore } from 'vuex';

export default {
    components: { loginRegisterFormVue },
    setup() {
        const store = useStore();
        const login = (data) => {
            store.dispatch(`user/${Constant.LOGIN}`, data);
        }

        return { login };
    }
}
</script>

<style lang="scss">

</style>