<script setup>
import router from '@/router';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentPage = computed(() => route.path);

function goHome() {
	router.push('/admin');
}

// ----------------------------------------------------

const isOpen = ref(false);

function toggleMenu() {
	isOpen.value = !isOpen.value;
	console.log('isOpen: ' + isOpen.value);
}

const isMobile = ref(window.innerWidth <= 767);
console.log('Is mobile?: ' + isMobile.value);

function updateWindowResize() {
	isMobile.value = window.innerWidth <= 767;
	console.log('Is mobile?:' + isMobile.value);
}

function setupResizeListener() {
	window.addEventListener('resize', updateWindowResize);
}

function removeResizeListener() {
	window.removeEventListener('resize', updateWindowResize);
}

onMounted(setupResizeListener);
onUnmounted(removeResizeListener);
</script>

<template>
	<header v-if="isMobile">
		<span class="logo-title">The lumos - admin</span>
		<!-- TODO: Ändra till bättre element, för semantik -->
		<div class="hamburger-icon" :class="{ open: isOpen }" @click="toggleMenu">
			<span></span>
			<span></span>
			<span></span>
		</div>
		<menu class="mobile-menu" :class="{ open: isOpen }">
            <RouterLink to="/admin-users" class="menu-links mobile" :class="{ active: currentPage === '/admin-users' }">Users</RouterLink>
			<RouterLink to="/admin-books" class="menu-links mobile" :class="{ active: currentPage === '/admin-books' }">Books</RouterLink>
			<button class="sign-out-btn mobile"><span class="material-symbols-outlined">logout</span>Sign out</button>
		</menu>
	</header>

	<section v-else class="admin-menu">
		<h2 @click="goHome">The<br />lumos -<br />admin</h2>
		<nav>
			<menu>
				<RouterLink to="/admin-users" class="menu-links" :class="{ active: currentPage === '/admin-users' }">Users</RouterLink>
				<RouterLink to="/admin-books" class="menu-links" :class="{ active: currentPage === '/admin-books' }">Books</RouterLink>
			</menu>
		</nav>
		<div class="user-container">
			<!-- TODO: Fixa så att den faktiskt loggar ut... -->
			<button class="sign-out-btn"><span class="material-symbols-outlined">logout</span>Sign out</button>
			<div class="user-info-container">
				<img
					class="profile-picture"
					src="@/assets/images/heroimg-fantasy-book.jpg"
					width="45"
					height="45"
					loading="lazy"
				/>
				<span class="username">Username</span>
			</div>
		</div>
	</section>
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
	z-index: 5;
    .logo-title {
        font-family: $font-logo;
        font-size: $h-small;
        color: $color-white;
        z-index: 8;
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
	align-items: center;
    gap: 1rem;
	text-align: center;
    background-color: $color-primary;
	visibility: hidden;
    opacity: 0;
    transition: 0.3s ease-in-out;
	z-index: 6;
	a {
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

.admin-menu {
	grid-column: 1 / span 2;
	height: 100dvh;
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: $color-primary;
	min-width: 17%;
	// max-width: 16%;
	h2 {
		margin: 1rem;
		font-family: $font-logo;
		font-size: $h-small;
		color: $color-white;
		// max-width: 100%;
		overflow-wrap: break-word;
		white-space: normal;
		word-wrap: break-word;
	}
	h2:hover {
		cursor: pointer;
	}
}
menu {
	position: absolute;
	top: 10rem;
	width: 100%;
	display: flex;
	flex-direction: column;
	.menu-links {
		color: $color-white;
		font-family: $font-title;
		font-size: 1.5rem;
		padding: 1rem 0 1rem 2rem;
		margin-inline: 1rem;
		text-decoration: none;
		// width: 100%;
		border-radius: 8px;
		transition: 0.3s ease-in-out;
	}
	.menu-links.mobile {
		padding: 1rem;
		width: 80dvw;
	}
	.menu-links:hover {
		background-color: #101c1d;
		cursor: pointer;
	}
	.menu-links.active {
		background-color: #334b4c;
		color: $color-secondary;
	}
}
.sign-out-btn {
	border: none;
	color: $color-white;
	background-color: $color-red;
	margin-inline: 2rem;
	padding: 1rem 2rem;
	display: inline-flex;
	align-items: center;
	justify-content: flex-start;
	transition: 0.3s ease-in-out;
	border-radius: 8px;
	font-family: $font-paragraph;
	cursor: pointer;
	span {
		margin-right: 0.5rem;
	}
}
.sign-out-btn.mobile {
	justify-content: center;
	// flex
}
.sign-out-btn:hover {
	background-color: #334b4c;
}
.user-info-container {
	padding: 1rem 2rem 1rem 2rem;
	border-radius: 8px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1rem;
	.profile-picture {
		border-radius: 50%;
	}
	.username {
		color: $color-white;
		font-family: $font-paragraph;
		font-size: $h-small-mobile;
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
