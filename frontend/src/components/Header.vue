<template>
    <nav class="header">
        <div class="countainer">
            <ul class="pages" :key="state.profile.username">
                <li @click="redirects.home()" class="page link" :class="{ active: isHome }">Home</li>
                <li @click="redirects.reservation()" class="page link" :class="{ active: isReservation }">Reservation
                </li>
                <li v-if="state.isAdmin" @click="redirects.dashboard()" class="page link"
                    :class="{ active: isDashboard }">Dashboard</li>
                <li v-if="!state.isLogged" @click="redirects.login()" class="page link" :class="{ active: isLogin }">
                    Login</li>
                <li v-if="state.isLogged" @click="redirects.profile()" class="page link">{{ state.profile.username }}
                </li>
                <li @click="logout()" v-if="state.isLogged" class="page link">Log Out</li>
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
import { useStore } from 'vuex';
import { reactive, computed } from 'vue';
import Constant from '../Constant';
export default {
    components: { searchVue },
    computed: {
        isHome() {
            return this.$route.name == 'home'
        },
        isReservation() {
            const path = this.$route.path.split('/');
            if (this.$route.name == undefined || this.$route.name == 'updateReservationUser') {
            } else {
                sessionStorage.removeItem("reservations")
            }
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
        const store = useStore();
        const redirects = {
            home: () => router.push({ name: 'home' }),
            reservation: () => router.push({ name: 'reservation' }),
            dashboard: () => router.push({ name: 'dashboard' }),
            login: () => router.push({ name: 'login' }),
            profile: () => router.push({ name: 'profile' }),
        };

        const state = reactive({
            profile: computed(() => store.getters['user/GetProfile']),
            isAdmin: computed(() => store.getters['user/GetIsAdmin']),
            isLogged: computed(() => store.getters['user/GetIsAuth']),
        });

        const logout = () => {
            store.dispatch(`user/${Constant.LOGOUT}`);
        }
        return { redirects, state, logout };
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