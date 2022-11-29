<template>
    <div class="carusel_item" @click="emitAction()">
        <img :src="item.photo" />
    </div>
</template>

<script>
import { getCurrentInstance } from 'vue';
export default {
    props: {
        item: Object
    },
    emits: {
        emitAction: Object
    },

    setup(props) {
        const { emit } = getCurrentInstance();
        const emitAction = () => {
            emit('emitAction', props.item);
        }

        return { emitAction }
    }
}
</script>

<style lang="scss">
.carusel_item {
    img {
        width: 30%;
        height: auto;
    }
}
</style>