<template>
    <h1>LOGIN</h1>
    <loginRegisterFormVue :isLogin="true" />
</template>

<script>
import loginRegisterFormVue from '../components/loginRegisterForm.vue';

export default {
    components: { loginRegisterFormVue },
}
</script>

<style lang="scss">

</style>