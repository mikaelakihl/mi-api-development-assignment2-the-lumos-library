<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const isOpen = ref(false);

function toggleMenu() {
	isOpen.value = !isOpen.value;
	console.log('isOpen: ' + isOpen.value);
}
</script>

<template>
	<header>
		<span class="logo-title">The lumos library</span>
		<!-- TODO: Ändra till bättre element, för semantik -->
		<div class="hamburger-icon" :class="{ open: isOpen }" @click="toggleMenu">
			<span></span>
			<span></span>
			<span></span>
		</div>

		<nav class="mobile-menu" :class="{ open: isOpen }">
            <RouterLink to="/" @click="toggleMenu">Home</RouterLink>
            <RouterLink to="/admin" @click="toggleMenu">Admin</RouterLink>
            <RouterLink to="/sign-in" @click="toggleMenu">Sign in</RouterLink>
		</nav>
	</header>
</template>

<style lang="scss" scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: $color-primary;
    z-index: 3;
    .logo-title {
        font-family: $font-logo;
        font-size: $h-small;
        color: $color-white;
        z-index: 8;
    }
}

.hamburger-icon {
    width: 44px;
	height: 44px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	cursor: pointer;
	z-index: 10;
	span {
        height: 4px;
		background-color: $color-black;
		border-radius: $border-small;
        background-color: $color-white;
		transition: 0.3s;
	}
}

.mobile-menu {
    position: fixed;
    left: 0;
    top: 0;
	width: 100vw;
	height: 100dvh;
	display: flex;
	flex-direction: column;
	justify-content: center;
    gap: 1rem;
	text-align: center;
    background-color: $color-primary;
	visibility: hidden;
    opacity: 0;
    transition: 0.3s ease-in-out;
	a {
		color: $color-white;
        font-family: $font-paragraph;
        font-size: $h-small;
        opacity: 0;
	}
    a:hover {
        color: $color-secondary;
    }
}

.mobile-menu.open {
	visibility: visible;
    opacity: 1;
    a {
        opacity: 1;
    }
}

.hamburger-icon span:nth-child(1) {
  top: 0px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

.hamburger-icon span:nth-child(2) {
  top: 18px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

.hamburger-icon span:nth-child(3) {
  top: 36px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

.hamburger-icon.open span:nth-child(1) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  top: -3px;
  left: 8px;
}

.hamburger-icon.open span:nth-child(2) {
  width: 0%;
  opacity: 0;
}

.hamburger-icon.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  top: 39px;
  left: 8px;
}
</style>
