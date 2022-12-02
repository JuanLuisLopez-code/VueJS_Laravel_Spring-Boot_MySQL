<template>
    <h1>REGISTER</h1>
    <loginRegisterFormVue :isLogin="false" />
</template>

<script>
import loginRegisterFormVue from '../components/loginRegisterForm.vue';

export default {
    components: { loginRegisterFormVue },

}
</script>

<style lang="scss">

</style>