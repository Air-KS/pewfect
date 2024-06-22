<!--
	./frontend/src/views/profilePage.vue
-->

 <template>
	<div class="profile-container">
		<h1>Profile de {{ user.first_name }} {{ user.last_name }}</h1>
		<form @submit.prevent="updateProfile">
			<div>
				<label for="first_name">Firstname:</label>
				<input
					id="first_name"
					type="text"
					v-model="user.first_name"
					title="Entrez votre prénom"
					placeholder="Jérôme Example"
				/>
			</div>
			<div>
				<label for="last_name">Lastname:</label>
				<input
					id="last_name"
					type="text"
					v-model="user.last_name"
					title="Entrez votre nom"
					placeholder="Bernard Example"
				/>
			</div>
			<div>
				<label for="date_of_birth">Date of Birth:</label>
				<input
					id="date_of_birth"
					type="date"
					v-model="user.date_of_birth"
					title="Entrez votre date de naissance"
				/>
			</div>
			<div>
				<label for="email">Email:</label>
				<input
					id="email"
					type="email"
					v-model="user.email"
					required
					title="Entrez votre adresse email"
					placeholder="example@mail.com"
				/>
			</div>
			<div>
				<label for="phone">Phone:</label>
				<input
					id="phone"
					type="text"
					v-model="user.phone"
					title="Entrez votre numéro de téléphone"
					placeholder="0607080910"
				/>
			</div>
			<div>
				<label for="address_one">Address:</label>
				<input
					id="address_one"
					type="text"
					v-model="user.address_one"
					title="Entrez votre adresse"
					placeholder="123 Rue Example"
				/>
			</div>
			<div>
				<label for="address_two">Secondary address:</label>
				<input
					id="address_two"
					type="text"
					v-model="user.address_two"
					title="Entrez votre adresse secondaire (si applicable)"
					placeholder="Appartment 4B"
				/>
			</div>
			<div>
				<label for="zip_code">Zip code:</label>
				<input
					id="zip_code"
					type="text"
					v-model="user.zip_code"
					title="Entrez votre code postal"
					placeholder="75001"
				/>
			</div>
			<div>
				<label for="city">City:</label>
				<input
					id="city"
					type="text"
					v-model="user.city"
					title="Entrez votre ville"
					placeholder="Paris"
				/>
			</div>
			<div>
				<label for="country">Country:</label>
				<input
					id="country"
					type="text"
					v-model="user.country"
					title="Entrez votre pays"
					placeholder="France"
				/>
			</div>
			<button type="submit">Save</button>
		</form>
	</div>
</template>


<script>
import axios from 'axios';

export default {
	name: 'ProfilePage',
	data() {
		return {
			user: {
				first_name: '',
				last_name: '',
				date_of_birth: '',
				email: '',
				phone: '',
				address_one: '',
				address_two: '',
				zip_code: '',
				city: '',
				country: '',
			},
		};
	},
	created() {
		this.fetchUserProfile();
	},
	methods: {
		async fetchUserProfile() {
			const userId = this.$route.params.id;
			try {
				const response = await axios.get(
					`http://localhost:3000/api/users/${userId}`
				);
				console.log('API response:', response.data);
				this.user = response.data;
			} catch (error) {
				console.error(
					'Erreur lors de la récupération du profil utilisateur:',
					error
				);
			}
		},
		async updateProfile() {
			const userId = this.$route.params.id;
			try {
				const response = await axios.put(
					`http://localhost:3000/api/users/${userId}`,
					this.user
				);
				alert('Profil mis à jour avec succès');
			} catch (error) {
				console.error(
					'Erreur lors de la mise à jour du profil utilisateur:',
					error
				);
			}
		},
	},
};
</script>

<style scoped>
.profile-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px;
}

form {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 400px;
}

form div {
	margin-bottom: 10px;
}

label {
	margin-bottom: 5px;
}

input {
	padding: 8px;
	font-size: 16px;
	border-radius: 4px;
	border: 1px solid #ccc;
}

button {
	padding: 10px;
	font-size: 16px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

button:hover {
	background-color: #0056b3;
}
</style>
