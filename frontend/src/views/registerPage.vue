<!--
	./frontend/src/views/registerPage.vue
-->

 <template>
	<!-- Formulaire d'inscription -->
	<div class="register-container">
		<h1>Register</h1>
		<form @submit.prevent="register">
			<div>
				<!-- Champ email -->
				<label for="register-email">Email:</label>
				<input
					id="register-email"
					type="email"
					v-model="email"
					required
					title="Entrez votre mail"
					placeholder="example@mail.com"
				/>
			</div>
			<div>
				<!-- Champ mot de passe -->
				<label for="register-password">Password:</label>
				<input
					id="register-password"
					type="password"
					v-model="password"
					required
					title="Entrez votre mot de passe"
					placeholder="Your password"
				/>
			</div>
			<div>
				<!-- Champ confirmation du mot de passe -->
				<label for="register-confirmPassword">Confirm Password:</label>
				<input
					id="register-confirmPassword"
					type="password"
					v-model="confirmPassword"
					required
					title="Répéter votre mot de passe"
					placeholder="Repeat password"
				/>
			</div>
			<!-- Bouton de d'inscription -->
			<button type="submit">Register</button>
		</form>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'RegisterPage',
	data() {
		return {
			// Stock l'email, password, confirmation
			email: '',
			password: '',
			confirmPassword: '',
			errorMessage: '',
		};
	},

	methods: {
		// Méthode pour gérer l'inscription de l'utilisateur
		async register() {
			if (this.password !== this.confirmPassword) {
				alert('Passwords do not match');
				return;
			}

			try {
				// Envoie une requête POST pour enregistrer l'utilisateur
				const response = await axios.post(
					'http://localhost:3000/api/users/register',
					{
						email: this.email,
						password: this.password,
					}
				);

				const { userId, token, role } = response.data;

				// Créer un object utilisateur
				const user = {
					id: userId,
					email: this.email,
					role: role,
				};

				// Ajoute de log pour vérifié le nouvel objet
				console.log('User created:', user);

				// Mettre à jours le localStorage
				localStorage.setItem('user', JSON.stringify(user));
				localStorage.setItem('token', token);
				localStorage.setItem('role', role);

				// Ajoute d'un log pour vérifié le stockage
				console.log(
					'User stored in localStorage',
					localStorage.getItem('user')
				);

				// Mettre à jour le store Vuex
				this.$store.dispatch('login', { user, token, role });

				// Forcer la réactivité en faisant une nouvelle mutation
				this.$store.commit('setLoginState', { isLoggedIn: true, user });

				// Ajoute de log pour vérifier l'état du store
				console.log('State after registration:', this.$store.state);

				// Si l'inscription est réussie, redirige vers la page "Client"
				if (response.status === 201) {
					this.$router.push({ name: 'Accueil' });
				}
			} catch (error) {
				// Gère les erreurs d'inscription
				console.error('Registration failed:', error);
				this.errorMessage =
					error.response?.data?.error ||
					'Une erreur est survenue, veuillez réessayer ultérieurement.';
				alert(this.errorMessage);
			}
		},
	},
};
</script>

<style scoped>
/* Styles pour le conteneur d'inscription */
.register-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
}
</style>
