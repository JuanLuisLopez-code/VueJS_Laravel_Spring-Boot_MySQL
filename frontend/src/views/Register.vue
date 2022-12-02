<template>
    <loginRegisterFormVue :isLogin="false" @send="register" />
</template>

<script>
import loginRegisterFormVue from '../components/loginRegisterForm.vue';

export default {
    components: { loginRegisterFormVue },
    setup() {
        const register = (data) => {
            console.log(data, 'register')
        }

        return { register };
    }
}
</script>

<style lang="scss">

</style>