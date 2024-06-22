<!--
	./frontend/src/views/loginPage.vue
-->

 <template>
	<div class="login-container">
		<h1>Login</h1>
		<!-- Formulaire de connexion -->
		<form @submit.prevent="login">
			<div>
				<!-- Champ email -->
				<label for="login-email">Email:</label>
				<input
					id="login-email"
					type="email"
					v-model="email"
					required
					title="Entrez votre mail"
					placeholder="example@mail.com"
				/>
			</div>
			<div>
				<!-- Champ mot de passe -->
				<label for="login-password">Password:</label>
				<input
					id="login-password"
					type="password"
					v-model="password"
					required
					title="Entrez votre Mot de Passe"
					placeholder="Your password"
				/>
			</div>
			<!-- Bouton de connexion -->
			<button type="submit">Login</button>
		</form>
		<!-- Message d'erreur affiché en cas de problème de connexion -->
		<p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
		<p>
			<!-- Lien vers la page d'inscription -->
			Don't have an account?
			<router-link to="/register">Register here</router-link>
		</p>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'LoginPage',
	data() {
		return {
			email: '',
			password: '',
			errorMessage: '',
		};
	},

	methods: {
		async login() {
			try {
				const response = await axios.post(
					'http://localhost:3000/api/users/login',
					{
						email: this.email,
						password: this.password,
					}
				);

				const { userId, token, role } = response.data;

				// Créer un objet utilisateur à partir de userId
				const user = {
					id: userId,
					email: this.email,
					role: role,
				};

				// Ajout d'un log pour vérifier le nouvel objet utilisateur
				console.log('User created:', user);

				// Mettre à jour le localStorage
				localStorage.setItem('user', JSON.stringify(user));
				localStorage.setItem('token', token);
				localStorage.setItem('role', role);

				// Ajout d'un log pour vérifier le stockage
				console.log(
					'User stored in localStorage:',
					localStorage.getItem('user')
				);

				// Mettre à jour le store Vuex
				this.$store.dispatch('login', { user, token, role });

				// Redirige l'utilisateur en fonction de son rôle
				if (role === 'admin' || role === 'responsable') {
					this.$router.push({ name: 'Admin' });
				} else if (role === 'client') {
					this.$router.push({ name: 'Accueil' });
				} else {
					this.$router.push('/');
				}
			} catch (error) {
				if (!error.response) {
					this.errorMessage =
						'Une erreur est survenue, veuillez réessayer ultérieurement.';
				} else if (error.response.status === 400) {
					this.errorMessage = error.response.data.error;
				} else {
					this.errorMessage =
						'Une erreur est survenue, veuillez réessayer ultérieurement.';
				}
				console.error('Login failed:', error);
			}
		},
	},
};
</script>

<style scoped>
/* Styles pour le conteneur de connexion */
.login-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
}

/* Styles pour le message d'erreur */
.error-message {
	color: red;
	margin-top: 10px;
}
</style>
