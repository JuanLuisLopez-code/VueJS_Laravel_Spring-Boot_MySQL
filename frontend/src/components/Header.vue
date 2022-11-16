<template>
    <nav>
        <div class="countainer">
            <ul class="pages">
                <router-link to="/home" class="link">
                    <li class="page">Home</li>
                </router-link>
            </ul>
            <p class="search">
                <input class="search-box" type="search" name="search" id="search" placeholder="Search..." />
            </p>
            <img src="../assets/img/Don_Kamaron_Logo.png">
        </div>
    </nav>
</template>

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

.page:hover {
    border-bottom: #f5f5f5 solid 1px;
    padding-bottom: 10px;
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