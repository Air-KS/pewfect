/*
  ./frontend/src/middleware/auth.js
*/

export function authGuard(to, from, next) {
  const loggedIn = localStorage.getItem('user'); // Vérifie si l'utilisateur est connecté
  const userRole = localStorage.getItem('role'); // Récupère le rôle de l'utilisateur

  // Ajout des instructions de débogage
  console.log('Logged In:', loggedIn);
  console.log('User Role:', userRole);

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next('/'); // Redirige vers la page d'accueil si non connecté
    } else if (to.meta.roles && !to.meta.roles.includes(userRole)) {
      next('/'); // Redirige vers la page d'accueil si le rôle ne correspond pas
    } else {
      next(); // Autorise l'accès si connecté et rôle correspondant
    }
  } else {
    next(); // Autorise l'accès si la route ne nécessite pas d'authentification
  }
}
