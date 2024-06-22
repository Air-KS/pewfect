<!--
	./frontend/src/component/userTable.vue
-->

<template>
	<div>
		<!-- Titre de la table -->
		<h2>{{ title }}</h2>
		<table>
			<thead>
				<tr>
					<th>Profil</th>
					<th>Last name</th>
					<th>First name</th>
					<th>Date of Birth</th>
					<th>Email</th>
					<th v-if="role !== 'admin'">Phone</th>
					<th v-if="role !== 'admin'">Address</th>
					<th>Zip code</th>
					<th>City</th>
					<th>Country</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<!-- Afficher chaque utilisateur -->
				<tr v-for="user in users" :key="user.id">
					<td align="center">
						<!-- Icône de profile cliquable -->
						<router-link :to="{ name: 'Profile', params: { id: user.id } }">
							<i class="fas fa-user profile-icon"></i>
						</router-link>
					</td>
					<td>{{ user.last_name }}</td>
					<td>{{ user.first_name }}</td>
					<td>{{ user.date_of_birth }}</td>
					<td>{{ user.email }}</td>
					<td v-if="role !== 'admin'">{{ user.phone }}</td>
					<td v-if="role !== 'admin'">{{ user.adress }}</td>
					<td>{{ user.zip_code }}</td>
					<td>{{ user.city }}</td>
					<td>{{ user.country }}</td>
					<td>
						<!-- Actions pour le rôle 'admin -->
						<div v-if="userRole === 'admin'">
							<!-- Actions pour 'responsable' (sauf emails protégés) -->
							<div
								v-if="
									role === 'responsable' &&
									!['jerome@gmail.com', 'kevin@gmail.com'].includes(user.email)
								"
							>
								<button @click="demoteToClient(user.id)">Client</button>
								<button @click="deleteUser(user.id)">Delete</button>
							</div>

							<!-- Actions pour 'client' -->
							<div v-else-if="role === 'client'">
								<button @click="promoteToResponsable(user.id)">
									Responsable
								</button>
								<button @click="deleteUser(user.id)">Delete</button>
							</div>
						</div>

						<!-- Actions pour'responsable' -->
						<div v-else-if="userRole === 'responsable' && role === 'client'">
							<button @click="deleteUser(user.id)">Delete</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	// // Props reçues
	props: {
		title: String, // Titre de la table
		users: Array, // Liste des utilisateurs
		role: String, // Rôle des utilisateurs
		userRole: String, // Rôle de l'utilisateur connecté
	},
	methods: {
		// Promouvoir utilisateur (client -> responsable)
		promoteToResponsable(userId) {
			this.$emit('change-role', userId, 'responsable');
		},
		// Retrograder utilisateur (respondable -> client)
		demoteToClient(userId) {
			this.$emit('change-role', userId, 'client');
		},
		// Suprimer un utilisateur
		deleteUser(userId) {
			this.$emit('delete-user', userId);
		},
	},
};
</script>

<style scoped>
@import '@fortawesome/fontawesome-free/css/all.css'; /* Import FontAwesome */

table {
	/* Styles pour la table */
	border-collapse: collapse;
	width: 100%;
	margin-bottom: 20px;
}

/* Styles pour les cellules */
th,
td {
	border: 1px solid var(--color-border);
	padding: 8px;
}

/* Style pour les en-têtes de colonne */
th {
	background-color: #f2f2f2;
	text-align: center;
}

/* Style pour les lignes paires */
tr:nth-child(even) {
	background-color: #f9f9f9;
}

/* Style pour les lignes au survol */
tr:hover {
	background-color: var(--menu-color-hover);
}

.profile-icon {
	color: #4687af;
}
</style>
