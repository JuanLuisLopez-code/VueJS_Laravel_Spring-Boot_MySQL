<template>
    <div class="container_mesa_details">
        <div class="gallery">
            <div class="gallery-item" tabindex="0">
                <img :src="stateOne.mesas?.photo" class="gallery-image" alt="">
                <div class="name">
                    <span class="capacity">
                        Capacity: {{ stateOne.mesas?.capacity }}
                    </span>
                    <div class="cat_name" v-for="cat in stateOne.mesas?.categories">
                        <span>
                            {{ cat.name_category }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import card_mesa from '../components/card_mesa.vue';
import Constant from '../Constant';
export default {
    components: { card_mesa },

    setup() {
        const store = useStore();
        const route = useRoute();
        const id = route.params.id;

        store.dispatch(`mesa/${Constant.INITIALIZE_ONE_STATE_MESA}`, id)

        const stateOne = reactive({
            mesas: computed(() => store.getters["mesa/getOneMesa"])
        })

        return { stateOne }
    }
}
</script>

<style lang="scss">
.container_mesa_details {
    max-width: 1em;
    margin-left: 37%;
    margin-top: 3%;

    .gallery {
        display: flex;
    }


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
        margin: 1rem;
        color: #fff;
        cursor: pointer;
    }

    .gallery-image {
        width: 20em;
        height: 20em;
        object-fit: cover;
    }
}
</style>