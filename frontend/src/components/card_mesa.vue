<template>
    <main class="cardMesa">
        <div class="gallery-item" tabindex="0" @click="showDetails(mesa.id)">
            <img :src="mesa.photo" class="gallery-image" alt="">
            <div class="name">
                <span class="capacity">
                    Capacity: {{ mesa.capacity }}
                </span>
                <div class="cat_name" v-for="cat in mesa.categories">
                    <span>
                        {{ cat.name_category }}
                    </span>
                </div>
            </div>
            <div class="gallery-item-info">
                <ul>
                    <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span>
                        34
                        <font-awesome-icon icon="fa-solid fa-heart" />
                    </li>
                    <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span>
                        1
                        <font-awesome-icon icon="fa-solid fa-comment" />
                    </li>
                </ul>
            </div>
        </div>
    </main>
</template>

<script>
import { useRouter } from 'vue-router';


export default {
    props: {
        mesa: Object
    },
    setup() {
        const router = useRouter();
        const showDetails = (id) => {
            router.push({ name: "details", params: { id } })
        }
        return { showDetails }
    }
}
</script>

<style lang="scss">
.cardMesa {
    .name {
        color: black;
    }

    .capacity {
        float: left;
    }

    .cat_name {
        float: right;
        border: 1px solid lightblue;
        background-color: lightblue;
        border-radius: 10px;
        margin: 1%;
    }

    .visually-hidden {
        position: absolute !important;
        height: 1px;
        width: 1px;
        overflow: hidden;
        clip: rect(1px, 1px, 1px, 1px);
    }

    .gallery-item {
        position: relative;
        flex: 1 0 22rem;
        margin: 1rem;
        color: #fff;
        cursor: pointer;
        width: 20em;
        height: 20em;
    }

    .gallery-item:hover .gallery-item-info,
    .gallery-item:focus .gallery-item-info {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .gallery-item-info {
        display: none;
    }

    .gallery-item-info li {
        display: inline-block;
        font-size: 1.7rem;
        font-weight: 600;
    }

    .gallery-item-likes {
        margin-right: 2.2rem;
    }

    .gallery-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @supports (display: grid) {

        .gallery-item,
        .gallery {
            width: auto;
            margin: 0;
        }

    }
}
</style>