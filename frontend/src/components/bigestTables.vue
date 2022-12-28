<template>
    <div class="infinite-container">
        <h1 class="header_title">
            <font-awesome-icon icon="fa-solid fa-fish-fins" />
            Biggest Tables
            <font-awesome-icon icon="fa-solid fa-fish-fins" />
        </h1>
        <div class="container_gallery" v-if="data.length > 0">
            <div class="gallery">
                <card_mesaVue v-for="mesa in data" :key="mesa.id" :mesa="mesa" />
            </div>
            <InfiniteLoading @infinite="scroll" :distance="1" />
        </div>
        <div v-else>
            <span>No data</span>
        </div>
    </div>
</template>

<script>
import InfiniteLoading from "v3-infinite-loading";
import card_mesaVue from "./card_mesa.vue";
import { getCurrentInstance } from 'vue';
export default {
    components: { InfiniteLoading, card_mesaVue },
    props: {
        data: Object
    },
    emits: {
        page: Number
    },
    setup() {
        const { emit } = getCurrentInstance();
        let page = 1;
        const scroll = ($state) => {
            page++
            if (page <= 3) {
                emit('page', page);
            } else {
                $state.loaded();
            }
        }

        return { scroll }
    }
}
</script>

<style lang="scss">
@import 'v3-infinite-loading/lib/style.css';


.infinite-container {
    .header_title {
        text-align: center;
        margin: 1em;
    }

    .container_gallery {
        max-width: 93.5rem;
        margin: 1.3%;
    }

    .gallery {
        display: flex;
        flex-wrap: wrap;
        margin: -1rem -1rem;
        padding-bottom: 3rem;
    }

    @supports (display: grid) {
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
            grid-gap: 2rem;
        }
    }
}
</style>