<template>
    <footer v-if="!isDashboard" class="footer">
        <div class="container footerContainer">
            <div class="footer-nav flex flex-around flex-start flex-g-1">
                <div class="col flex flex-column flex-start flex-g-1">
                    <span class="logo-holder">
                        <img src="../assets/img/Don_Kamaron_Logo.png">
                    </span>
                    <p class="site-decription">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut turpis
                        id fames dolor.
                    </p>
                    <div class="social-medias flex flex-g-1">
                        <a href="https://github.com/JuanLuisLopez-code" class="social-media flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-github" viewBox="0 0 16 16">
                                <path
                                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                        </a>
                        <a href="https://github.com/sergimicoortiz" class="social-media flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-github" viewBox="0 0 16 16">
                                <path
                                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="col flex flex-column flex-g-1 flex-start">
                    <h3 class="col-title">Info</h3>
                    <nav class="col-list">
                        <ul>
                            <li><a href="#">Formats</a></li>
                            <li><a href="#">Compression</a></li>
                            <li><a href="#">Pricing</a></li>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Status</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="col flex flex-column flex-g-1 flex-start">
                    <h3 class="col-title">Resources</h3>
                    <nav class="col-list">
                        <ul>
                            <li><a href="#">Developer API</a></li>
                            <li><a href="#">Tools</a></li>
                            <li><a href="#">Blog</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="col flex flex-column flex-g-1 flex-start">
                    <h3 class="col-title">Company</h3>
                    <nav class="col-list">
                        <ul>
                            <li><a href="https://www.youtube.com/watch?v=MLsbc-dFWS8">About Us</a></li>
                            <li><a href="#">Sustainability</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Privacy</a></li>
                        </ul>
                    </nav>
                </div>

            </div>
            <div class="copyright">© 2022 - All Rights Reserved. (Not real)</div>
        </div>
    </footer>

</template>

<script>

export default {
    computed: {
        isDashboard() {
            const path = this.$route.path.split('/');
            return path[1] == 'dashboard';
        },
    }
}
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;700&display=swap);

footer.footer {
    font-family: Prompt, sans-serif;
    margin: 0;
    padding: 0;
    outline: 0;
    border: 0;
    box-sizing: border-box;
}

@media screen and (max-width: 768px) {
    html {
        font-size: 15px;
    }
}

@media screen and (max-width: 465px) {
    html {
        font-size: 14px;
    }
}

body {
    background: var(--background);
}

.container {
    max-width: 1110px;
    margin: 0 auto;
    position: relative;
    padding: 2rem;
}

.copyright {
    padding: 2rem 0 0 0;
    font-size: 1rem;
    font-weight: 300;
    color: var(--color-3);
    text-align: center;
    border-top: 1px solid var(--color-3);
}

.footer-nav {
    padding: 1rem 0;

    .col {
        max-width: 300px;
    }
}

p.site-decription {
    color: var(--color-3);
    font-size: 1rem;
    font-weight: 400;
}

.social-medias {
    a {
        color: var(--color-2);
        width: 3rem;
        height: 3em;
        border: 2px solid var(--color-2);
        border-radius: 50%;
    }

    svg {
        vertical-align: middle;
        width: 1.5rem;
        height: 1.5rem;
    }
}

.flex {
    display: flex;
    align-items: center;
    justify-content: center;
}

.flex-start {
    align-items: flex-start;
}

.flex-jc-start {
    justify-content: flex-start;
}

.flex-around {
    justify-content: space-around;
}

.flex-column {
    flex-direction: column;
}

.flex-g-1 {
    gap: 1rem;
}

.col {
    flex: 1;
}

.col-list ul li {
    list-style: none;

    a {
        text-decoration: none;
        color: var(--color-3);
        transition: var(--transition);

        &:hover,
        &:focus {
            color: var(--color);
            text-decoration: underline;
        }
    }
}

.logo-holder {
    img {
        height: 10em;
        width: auto;
    }
}

@media screen and (max-width: 1100px) {
    .footer-nav {
        flex-direction: column;
    }
}
</style>