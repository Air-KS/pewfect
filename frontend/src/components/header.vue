<!--
	./frontend/src/components/Header.vue
-->

<template>
	<header class="header">
		<div class="container">
			<!-- Section logo -->
			<div class="logo">
				<router-link to="/">
					<img src="@/assets/images/logo.png" alt="Logo" />
				</router-link>
			</div>
			<!-- Menu de navigation -->
			<nav>
				<ul class="nav-menu" :class="{ open: isMenuOpen }">
					<li class="nav-menu-item">
						<a href="#" class="nav-menu-link">Prices & Services</a>
					</li>
					<li class="nav-menu-item">
						<a href="#" class="nav-menu-link">Location</a>
					</li>
					<li class="nav-menu-item" v-if="isAdminOrResponsable">
						<router-link to="/admin" class="nav-menu-link apply">
							Dashboard
						</router-link>
					</li>
					<li class="nav-menu-item" v-else>
						<a href="#" class="nav-menu-link apply">Book Now</a>
					</li>
				</ul>
			</nav>
			<!-- Section des boutons -->
			<div class="auth-section">
				<div v-if="!isLoggedIn">
					<router-link to="/login" class="login-button">Login</router-link>
				</div>
				<div v-else class="profile" @click="toggleDropdown" ref="profile">
					<img
						src="@/assets/images/profile-circle.svg"
						alt="Profile"
						class="profile-icon"
					/>
					<div class="dropdown-menu" v-if="dropdownOpen">
						<router-link
							v-if="user && user.id"
							:to="{ name: 'Profile', params: { id: user.id } }"
							class="dropdown-item"
						>
							<img src="@/assets/images/user-profile.svg" alt="Profile" />
							Profile
							<img
								src="@/assets/images/arrow-r-grey.png"
								alt="Arrow Icon"
								class="menu-arrow-icon"
							/>
						</router-link>
						<div class="dropdown-divider"></div>
						<a href="#" class="dropdown-item" @click="logout">
							<img src="@/assets/images/user-disconnected.svg" alt="Logout" />
							Log Out
							<img
								src="@/assets/images/arrow-r-grey.png"
								alt="Arrow Icon"
								class="menu-arrow-icon"
							/>
						</a>
					</div>
				</div>
			</div>

			<!-- Bouton de menu pour mobiles -->
			<button
				class="menu-toggle"
				@click="toggleMenu"
				:class="{ active: isMenuOpen }"
				aria-label="Toggle menu"
				title="Toggle menu"
				ref="menu"
			>
				<span class="menu-toggle-bar top-bar"></span>
				<span class="menu-toggle-bar middle-bar"></span>
				<span class="menu-toggle-bar bottom-bar"></span>
			</button>
		</div>
	</header>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'Header',
	data() {
		return {
			dropdownOpen: false,
			isMenuOpen: false,
		};
	},
	computed: {
		...mapState(['isLoggedIn', 'user']),
		isAdminOrResponsable() {
			return (
				this.user &&
				(this.user.role === 'admin' || this.user.role === 'responsable')
			);
		},
	},
	methods: {
		toggleDropdown() {
			this.dropdownOpen = !this.dropdownOpen;
		},
		closeDropdown() {
			this.dropdownOpen = false;
		},
		handleClickOutside(event) {
			if (this.$refs.profile && !this.$refs.profile.contains(event.target)) {
				this.closeDropdown();
			}
			if (this.$refs.menu && !this.$refs.menu.contains(event.target)) {
				this.closeMenu();
			}
		},
		closeMenu() {
			this.isMenuOpen = false;
		},
		logout() {
			this.$store.dispatch('logout');
			this.$router.push('/');
		},
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen;
		},

		handleResize() {
			if (window.innerWidth > 768) {
				this.isMenuOpen = false;
			}
		},
	},
	mounted() {
		document.addEventListener('click', this.handleClickOutside);
		window.addEventListener('resize', this.handleResize);
	},
	beforeUnmount() {
		document.removeEventListener('click', this.handleClickOutside);
		window.removeEventListener('resize', this.handleResize);
	},
};
</script>

<style scoped>
/* Style de l'en-tête */
.header {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background-color: var(--color-background);
	border-bottom: 1px solid #ccc;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	padding: 0;
	z-index: 1000;
}

/* Container principal */
.container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	max-width: 1200px;
	height: 70px;
	margin: 0 auto;
	padding: 0 20px;
	position: relative;
}

/* Style du logo */
.logo img {
	height: 40px;
}

/* Menu de navigation */
.nav-menu {
	display: flex;
	align-items: center;
	list-style: none;
	margin: 0;
	padding: 0;
}

.nav-menu .nav-menu-item:not(:last-child) {
	border-right: 3px solid #ccc; /* Séparateur entre les éléments */
}

.nav-menu.open {
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 70px;
	left: 0;
	width: 100%;
	background-color: var(--color-background);
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.nav-menu-item {
	font-family: var(--nav-item-font-family);
	font-weight: var(--nav-item-font-weight);
	font-size: 1.1rem;
	padding: 0 20px;
	display: flex;
	align-items: center;
}

.nav-menu-link {
	display: block;
	padding: 0.5rem 0;
	position: relative;
	color: var(--color-text-dark);
	text-decoration: none;
}

.nav-menu-link:hover {
	color: var(--nav-color-hover);
	text-decoration: none;
}

.nav-menu-link::before {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	width: 0;
	height: 0.2rem;
	transition: var(--transition-duration) var(--transition-cubic-bezier);
}

.nav-menu-item:hover .nav-menu-link::before {
	background-color: var(--nav-color-link);
	width: 100%;
}

.nav-menu-link.apply {
	color: red;
}

.nav-menu-link.apply:hover {
	color: var(--nav-color-hover);
}

.nav-menu-link.apply::before {
	background-color: var(--nav-color-link);
}

.auth-section {
	display: flex;
	align-items: center;
}

/* Profil avec menu déroulant */
.profile {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

.profile-icon {
	height: 60px;
	margin-right: 10px;
}

.dropdown-menu {
	position: absolute;
	top: 100%;
	background-color: var(--color-background);
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	border-radius: 5px;
	overflow: hidden;
	z-index: 1000;
	width: 150px;
}

.dropdown-item {
	display: flex;
	align-items: center;
	padding: 10px;
	color: var(--color-text-dark);
	text-decoration: none;
}

.dropdown-item:hover {
	background-color: var(--menu-color-hover);
}

.dropdown-item img {
	margin-right: 10px;
	height: 30px;
}

.menu-arrow-icon {
	margin-left: auto;
	height: 20px !important;
	width: 15px;
}

.dropdown-divider {
	height: 1px;
	background-color: #4687af;
	margin: 0 10px;
}

.header .login-button {
	display: inline-block;
	padding: 10px 20px;
	border: 2px solid var(--color-button);
	border-radius: 25px;
	font-size: 16px;
	font-weight: bold;
	color: var(--color-text-dark);
	text-align: center;
	text-decoration: none;
	transition: background-color 0.3s, color 0.3s;
	font-size: 1.5rem;
}

.header .login-button:hover {
	background-color: var(--menu-color-hover);
	border: 2px solid #4687af;
	color: #4687af;
}

/* Bouton de menu pour mobiles */
.menu-toggle {
	display: none;
	position: absolute;
	top: 50%;
	left: 10px;
	transform: translateY(-50%);
	z-index: 100;
	background: none;
	border: none;
	cursor: pointer;
}

.menu-toggle-bar {
	display: block;
	width: 35px;
	height: 5px;
	margin: 6px 0;
	border-radius: 10px;
	background-color: #4687af;
	box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
	transition: 0.4s;
}

.menu-toggle.active .top-bar {
	transform: translateY(11px) rotate(45deg);
}

.menu-toggle.active .middle-bar {
	opacity: 0;
}

.menu-toggle.active .bottom-bar {
	transform: translateY(-11px) rotate(-45deg);
}

@media (max-width: 768px) {
	.nav-menu {
		display: none;
		flex-direction: column;
	}

	.nav-menu .nav-menu-item:not(:last-child) {
		border-color: transparent; /* Séparateur entre les éléments */
	}

	.nav-menu.open {
		display: flex;
	}

	.menu-toggle {
		display: block;
	}

	.logo {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	.container {
		justify-content: space-between;
	}

	.auth-section {
		margin-top: 0;
	}

	.header .login-button {
		font-size: 1.2rem;
		padding: 8px 16px;
	}
}
</style>
