<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const isScrolled = ref(false);
const screenHieght = ref(0);

function checkScroll() {
    
    if (route.path === '/') {
        screenHieght.value = window.innerHeight * 0.75; // TODO: Korrigera värdet om det behövs
        console.log('Du ÄR inne på startsidan');

    }else {
        screenHieght.value = window.innerHeight * 0.375; // TODO: Korrigera värdet om det behövs
        console.log('Du är inte inne på startsidan');
    }
    
    console.log('Screenheight: ' + screenHieght.value);
    
    if(window.scrollY > screenHieght.value) {
        console.log(window.scrollY > screenHieght.value);
        isScrolled.value = true;

    }else {
        isScrolled.value = false;
    }
    
}

function addScrollListener() {
    window.addEventListener('scroll', checkScroll);
}

function removeScrollListener() {
    window.removeEventListener('scroll', checkScroll)
}

onMounted(addScrollListener);
onUnmounted(removeScrollListener);

</script>

<template>
    <header>
        <span class="logo-title">The lumos library</span>
        <!-- <RouterLink to="">Sign in/Register <span class="material-symbols-outlined">person</span></RouterLink> -->
        
        <nav class="mobile-menu">
            <RouterLink :class="{'scrolled': isScrolled}" to="/">Home</RouterLink>
            <RouterLink :class="{'scrolled': isScrolled}" to="/admin">Admin</RouterLink>
            <RouterLink :class="{'scrolled': isScrolled}" to="/sign-in">Sign in</RouterLink>
		</nav>
    </header>
</template>

<style lang="scss" scoped>
header {
    position: absolute;
    width: 100%;
    height: 10dvh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    .logo-title {
        margin-left: 2rem;
        font-family: $font-logo;
        font-size: $h-medium;
        color: $color-white;
    }
}

nav {
    position: fixed;
    top: 15dvh;
    right: 1rem;
    display: flex;
    flex-direction: column;
    // gap: 1rem;
    a {
        font-family: $font-paragraph;
        font-size: 1rem;
        color: $color-white;
        transition: 0.3s ease-in-out;
        padding: 1rem;
        border-radius: 8px;
        text-decoration: none;
    }
    a:hover {
        color: $color-primary;
        background-color: $color-secondary;
    }
    a.scrolled {
        color: $color-black;
    }
}
</style>