<template>
    <nav>
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
            <p class="search">
                <input class="search-box" type="search" name="search" id="search" placeholder="Search..." />
            </p>
            <router-link to="/home" class="link">
                <img src="../assets/img/Don_Kamaron_Logo.png">
            </router-link>
        </div>
    </nav>
</template>

<script>
// import { useRoute } from 'vue-router'
// import { reactive, computed } from 'vue'

export default {
    computed: {
        isHome() {
            return this.$route.name == 'home'
        },
        isReservation() {
            return this.$route.name == 'reservation'
        },
        isDashboard() {
            return this.$route.name == 'dashboard'
        },
    }
}
</script>

<style lang="scss">
* {
    padding: 0px;
    margin: 0%;
    box-sizing: border-box;
}

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

.search {
    display: none;
}

@media (min-width: 426px) {

    .search,
    .logo {
        display: block;
    }

    .search-box {
        height: 28px;
        font-size: 18px;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
    }

    .link {
        padding: 0px 1rem;
    }
}
</style>