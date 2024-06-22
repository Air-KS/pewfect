/*
  backend/routes/usersinfoctrl.js
*/

const { UsersInfo, Register, Role } = require('../models');


module.exports = {
  // Fonction pour récupérer le profil de l'utilisateur connecté
  getUserProfile: async function (req, res) {
    try {
      const userId = req.params.id;
      const user = await UsersInfo.findOne({
        where: { id: userId },
        attributes: [
          'first_name',
          'last_name',
          'date_of_birth',
          'email',
          'phone',
          'address_one',
          'address_two',
          'zip_code',
          'city',
          'country'
        ]
      });
      if (user) {
        console.log('User data:', user);
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateUserProfile: async function (req, res) {
    try {
      const userId = req.params.id;
      console.log('Updating user with ID:', userId); // Log ID de l'utilisateur
      console.log('Request body:', req.body); // Log les données reçues

      const { first_name, last_name, date_of_birth, email, phone, address_one, address_two, zip_code, city, country } = req.body;
      const updatedUser = await UsersInfo.update(
        { first_name, last_name, date_of_birth, email, phone, address_one, address_two, zip_code, city, country },
        { where: { id: userId } }
      );
      if (updatedUser[0] === 1) {
        res.status(200).json({ message: 'Profile updated successfully' });
      } else {
        res.status(404).json({ error: 'User not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Fonction pour récupérer tous les utilisateurs avec leur rôle
  getAllUsers: async function (req, res) {
    try {
      const users = await UsersInfo.findAll({
        include: [
          {
            model: Register,
            include: [{ model: Role }]
          }
        ],
        order: [['last_name', 'ASC']]
      });

      res.status(200).json(users);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      res.status(500).json({ error: "Impossible de récupérer les utilisateurs" });
    }
  },

  // Fonction pour mettre à jour le rôle d'un utilisateur
  updateUserRole: async function (req, res) {
    try {
      const { role } = req.body;
      const { id } = req.params;

      const user = await UsersInfo.findOne({
        where: { id },
        include: [{ model: Register }]
      });

      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      const roleInstance = await Role.findOne({
        where: { role }
      });

      if (!roleInstance) {
        return res.status(404).json({ error: "Rôle non trouvé" });
      }

      user.Register.role_id = roleInstance.id;
      await user.Register.save();

      res.status(200).json({ message: "Rôle mis à jour avec succès" });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rôle de l'utilisateur :", error);
      res.status(500).json({ error: "Impossible de mettre à jour le rôle de l'utilisateur" });
    }
  },
};
