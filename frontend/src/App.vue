<!--
	./frontend/src/App.vue
-->

<template>
	<div id="app">
		<Header />
		<div class="main-content">
			<router-view />
		</div>
		<Footer />
	</div>
</template>

  <script>
import Header from './components/header.vue';
import Footer from './components/footer.vue';

export default {
	name: 'App',
	components: {
		Header,
		Footer,
	},
};
</script>

  <style>
html,
body,
#app {
	height: 100%;
	margin: 0;
}

#app {
	display: flex;
	flex-direction: column;
	min-height: 100%;
}

.main-content {
	flex: 1;
	display: flex;
	flex-direction: column;
}

/* Ajoute ici tes styles globaux si besoin */
body {
	padding-top: 80px;
}
</style>
