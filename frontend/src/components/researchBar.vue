<!--
	./frontend/src/components/ResearchBar.vue
-->

<template>
	<input
		type="text"
		class="research-bar"
		v-model="localSearchQuery"
		:placeholder="placeholder"
	/>
</template>

  <script>
export default {
	name: 'ResearchBar',
	props: {
		searchQuery: {
			type: String,
			default: '',
		},
		placeholder: {
			type: String,
			default: 'Rechercher...',
		},
	},
	data() {
		return {
			localSearchQuery: this.searchQuery, // Initialisation de localSearchQuery avec la valeur de searchQuery
		};
	},
	watch: {
		searchQuery(newVal) {
			this.localSearchQuery = newVal;
		},
		localSearchQuery(newVal) {
			this.$emit('update:modelValue', newVal);
		},
	},
};
</script>

  <style scoped>
.research-bar {
	border: 1px solid #333; /* Couleur de la bordure */
	border-radius: 15px;
	padding: 10px;
	margin: 10px 0;
	width: 100%;
	max-width: 25%;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	font-size: 16px;
	font-family: Arial, sans-serif;
	background-color: #f9f9f9;
	transition: all 0.3s ease;
}

.research-bar:focus {
	border-color: #007bff; /* Couleur de la bordure au focus */
	box-shadow: 0 0 8px rgba(0, 123, 255, 0.25); /* Ombre au focus */
	outline: none; /* Supprime le contour par défaut */
}

.research-bar::placeholder {
	color: #999; /* Couleur du texte du placeholder */
	font-style: italic; /* Style du placeholder */
}
</style>
