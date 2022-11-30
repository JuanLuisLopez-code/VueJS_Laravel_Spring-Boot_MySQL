<template>
    <nav class="header">
        <div class="countainer">
            <ul class="pages">
                <router-link to="/home" class="link" :class="{ active: isHome }">
                    <li class="page">Home</li>
                </router-link>
                <router-link to="/reservation" class="link" :class="{ active: isReservation }">
                    <li class="page">Reservation</li>
                </router-link>
                <router-link to="/dashboard" class="link" :class="{ active: isDashboard }">
                    <li class="page">Dashboard</li>
                </router-link>
            </ul>
            <search-vue v-if="!isReservation" />
            <router-link to="/home" class="link">
                <img src="../assets/img/Don_Kamaron_Logo.png">
            </router-link>
        </div>
    </nav>
</template>

<script>
import searchVue from './search.vue';
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