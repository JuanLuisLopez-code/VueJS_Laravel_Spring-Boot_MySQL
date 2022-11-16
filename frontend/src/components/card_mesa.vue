<template>
    <main>
        <div class="gallery-item" tabindex="0">
            <img src="../assets/img/Don_Kamaron_Logo.png" class="gallery-image" alt="">
            <div class="name">
                <span class="capacity">
                    Capacity: {{ mesa.capacity }}
                </span>
                <div class="cat_name">
                    <span v-for="cat in mesa.categories">
                        {{ cat.name_category }}
                    </span>
                </div>
            </div>
            <div class="gallery-item-info">
                <ul>
                    <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart"
                            aria-hidden="true"></i> 34</li>
                    <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i
                            class="fas fa-comment" aria-hidden="true"></i> 1</li>
                </ul>
            </div>
        </div>
    </main>
</template>

<script>
export default {

    props: {
        mesa: Object
    },
}
</script>

<style lang="scss">
:root {
    font-size: 10px;
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
</style>