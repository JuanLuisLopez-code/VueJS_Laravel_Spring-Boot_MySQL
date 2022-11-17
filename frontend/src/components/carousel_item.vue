<template>
    <div class="carusel_item">
        <img :src="item.photo" />
    </div>
</template>

<script>
export default {
    props: {
        item: Object
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