<template>
	<footer class="footer-container">
		<div class="footer-banner"></div>
		<div class="footer-content">
			<img
				src="../assets/images/animals-footer.webp"
				alt="Pets"
				class="footer-image"
			/>
			<div class="footer-links-container">
				<div class="footer-links">
					<div class="footer-section">
						<h4>À propos de nous</h4>
						<p>Comment ça marche</p>
						<p>Localisation</p>
					</div>
					<div class="footer-section">
						<h4>Ressources</h4>
						<p>Condition de Confidentialité</p>
						<p>Politique d'annulation</p>
						<p>Centre d'aide</p>
					</div>
					<div class="footer-section">
						<h4>Compagnie</h4>
						<p>Contactez-nous</p>
						<p>Carrières</p>
					</div>
				</div>
			</div>
		</div>
		<div class="footer-bottom">
			<p class="footer-contact">Besoin d’aide ? help@gmail.com</p>
			<div class="footer-icons">
				<img src="../assets/images/facebook.svg" alt="Facebook" />
				<img src="../assets/images/instagram.svg" alt="Instagram" />
				<img src="../assets/images/linkedin.svg" alt="LinkedIn" />
				<img src="../assets/images/youtube.svg" alt="YouTube" />
				<img src="../assets/images/twitter-x.svg" alt="Twitter X" />
			</div>
		</div>
		<div class="footer-copyright">
			<p>
				@2024 Atelier canin, Inc. Tous droits réservés
			</p>
		</div>
	</footer>
</template>
  <script>
export default {
	name: 'Footer',
};
</script>

  <style scoped>
.footer-container {
	background: linear-gradient(to bottom, #4687af 30%, #0a101d 70%);
	padding: 20px;
	text-align: center;
	color: #ffffff;
	position: relative;
}

.footer-banner {
	width: 100%;
	background: #000000; /* Couleur de la banderole */
	color: var(--color-background);
	padding: 30px 0;
	position: absolute;
	top: 0;
	left: 0;
	text-align: center;
	font-size: 20px;
	font-weight: bold;
}

.footer-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 60px;
}

.footer-image {
	width: 100%;
	height: auto;
	max-width: 50%;
	margin-bottom: 20px;
}

.footer-links-container {
	width: 70%;
}

.footer-links {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 100%;
	border-top: 1px solid var(--color-background);
	padding: 20px 0;
}

.footer-section {
	width: 100%;
	text-align: center;
	border-bottom: 1px solid var(--color-background); /* Ajouter une bordure horizontale par défaut */
	margin-bottom: 10px;
}


.footer-links h4 {
	margin-top: 0px;
	margin-bottom: 5px;
	font-size: 30px;
	color: var(--color-background);
	text-shadow: 2px 2px 4px #fd0000;
}

/* Supprimer la bordure du dernier et de l'avant-dernier élément */
.footer-section:last-child {
	border-bottom: none;
}

.footer-bottom {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	font-size: 20px;
	border-top: 1px solid var(--color-background);
	padding: 30px 0px 30px 0px;
}

.footer-icons img {
	margin-left: 20px; /* Espace entre les icônes */
}

.footer-copyright {
	display: flex;
	justify-content: center;
	width: 100vw;
	font-size: 16px;
	position: absolute;
	background: #000000;
	right: 0;
	align-items: center;
}


/* Responsiveness */
@media (min-width: 768px) {
	.footer-links {
		flex-direction: row;
	}

	.footer-section {
		flex: 1;
		text-align: center;
		margin-bottom: 0;
		border-bottom: none;
		border-left: 1px solid var(--color-background);
	}

	.footer-section:first-child {
		border-left: none;
	}

	.footer-links .footer-section:not(:last-child) {
		border-right: 1px solid var(--color-background);
	}

	.footer-bottom {
		flex-direction: row;
		justify-content: space-between;
		padding: 10px 10%;
		align-items: center;
	}
}
</style>
