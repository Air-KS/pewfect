/*
  ./frontend/src/router/index.js
*/

// Importer les fonctions de vue-router
import { createRouter, createWebHistory } from 'vue-router';

// Importer les composants des pages
import accueilPage from '@/views/accueilPage.vue';
import registerPage from '@/views/registerPage.vue';
import loginPage from '@/views/loginPage';
import adminPage from '@/views/adminPage';
import profilePage from '@/views/profilePage.vue';

// Importer le middleware d'authentification
import { authGuard } from '@/middleware/auth.js';

// Définir les routes de l'application
const routes = [
  { path: '/', name: 'Accueil', component: accueilPage },
  { path: '/login', name: 'Login', component: loginPage },
  { path: '/register', name: 'Register', component: registerPage },
  { path: '/admin', name: 'Admin', component: adminPage, meta: { requiresAuth: true, roles: ['admin', 'responsable'] } },
  { path: '/profile/:id', name: 'Profile', component: profilePage, meta: { requiresAuth: true } }
];

// Créer le routeur
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes // routes: routes en syntaxe ES6
});

// Utiliser le middleware pour vérifier l'authentification et les droits d'accès
router.beforeEach(authGuard);

// Ajouter un afterEach hook pour le défilement vers le haut
router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});

export default router;
