<template>
    <loginRegisterFormVue :isLogin="true" @send="login" />
</template>

<script>
import loginRegisterFormVue from '../components/loginRegisterForm.vue';

export default {
    components: { loginRegisterFormVue },
    setup() {
        const login = (data) => {
            console.log(data, 'LOGIN')
        }

        return { login };
    }
}
</script>

<style lang="scss">

</style>