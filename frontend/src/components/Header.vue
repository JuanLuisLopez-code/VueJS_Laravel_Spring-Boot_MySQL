<template>
    <nav class="header">
        <div class="countainer">
            <ul class="pages">
                <li @click="redirects.home()" class="page link" :class="{ active: isHome }">Home</li>
                <li @click="redirects.reservation()" class="page link" :class="{ active: isReservation }">Reservation
                </li>
                <li @click="redirects.dashboard()" class="page link" :class="{ active: isDashboard }">Dashboard</li>
                <li @click="redirects.login()" class="page link" :class="{ active: isLogin }">Login</li>
            </ul>
            <search-vue v-if="!isReservation" />
            <div class="link" @click="redirects.home()">
                <img src="../assets/img/Don_Kamaron_Logo.png">
            </div>
        </div>
    </nav>
</template>

<script>
import searchVue from './search.vue';
import { useRouter } from 'vue-router';
export default {
    components: { searchVue },
    computed: {
        isHome() {
            return this.$route.name == 'home'
        },
        isReservation() {
            const path = this.$route.path.split('/');
            return path[1] == 'reservation';
        },
        isDashboard() {
            const path = this.$route.path.split('/');
            return path[1] == 'dashboard';
        },
        isLogin() {
            return this.$route.name == 'login'
        },
    },
    setup() {
        const router = useRouter();
        const redirects = {
            home: () => router.push({ name: 'home' }),
            reservation: () => router.push({ name: 'reservation' }),
            dashboard: () => router.push({ name: 'dashboard' }),
            login: () => router.push({ name: 'login' }),
        };
        return { redirects };
    }
}
</script>

<style lang="scss">
.header {

    .countainer {
        font-family: Arial, Helvetica, sans-serif;
        background-color: #333;
        width: 100%;
        height: 70px;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: space-around;

        img {
            width: 6em;
            height: auto;
        }
    }

    a {
        text-decoration: none;
    }

    li {
        list-style: none;
    }

    .pages {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 5px;
        font-size: 22px;
    }

    .link {
        color: whitesmoke;
        margin: 0%;
        padding: 0 .3rem;
    }

    .active {
        border-bottom: orange solid 1px;
        padding-bottom: 10px;
    }

    .logo {
        color: seashell;
        background-color: orange;
        padding: 6px;
        margin-bottom: 5px;
        border-radius: 3px;
        font-weight: bold;
        display: none;
    }


    @media (min-width: 426px) {

        .logo {
            display: block;
        }

        .link {
            padding: 0px 1rem;
        }
    }
}
</style>