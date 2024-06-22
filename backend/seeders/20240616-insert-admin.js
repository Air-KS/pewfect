// backend/seeders/20240616-insert-register.js

'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const existingUser1 = await queryInterface.rawSelect('Register', {
        where: {
          email: 'kevin@gmail.com',
        },
      }, ['id']);

      const existingUser2 = await queryInterface.rawSelect('Register', {
        where: {
          email: 'jerome@gmail.com',
        },
      }, ['id']);

      if (existingUser1 || existingUser2) {
        console.log('One or more users already exist, skipping insertion.');
        return;
      }

      const hashedPassword1 = await bcrypt.hash('password1', 10);
      const hashedPassword2 = await bcrypt.hash('password2', 10);

      await queryInterface.bulkInsert('Register', [
        {
          email: 'jerome@gmail.com',
          password: hashedPassword1,
          role_id: 3, // admin
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          email: 'kevin@gmail.com',
          password: hashedPassword2,
          role_id: 3, // admin
          created_at: new Date(),
          updated_at: new Date()
        }
      ]);

      // Récupérer les enregistrements insérés
      const newRegisters = await queryInterface.sequelize.query(
        'SELECT id, email, role_id FROM Register WHERE email IN (:emails)',
        {
          type: Sequelize.QueryTypes.SELECT,
          replacements: { emails: ['kevin@gmail.com', 'jerome@gmail.com'] }
        }
      );

      const usersInfoData = newRegisters.map(register => ({
        register_id: register.id,
        email: register.email,
        role_id: register.role_id,
        created_at: new Date(),
        updated_at: new Date()
      }));

      await queryInterface.bulkInsert('UsersInfo', usersInfoData, {});
      console.log('Users inserted successfully');
    } catch (error) {
      console.error('Error inserting users:', error.message);
      console.error('Error details:', error);
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.bulkDelete('UsersInfo', null, {});
      await queryInterface.bulkDelete('Register', null, {});
      console.log('Users deleted successfully');
    } catch (error) {
      console.error('Error deleting users:', error.message);
      console.error('Error details:', error);
    }
  }
};
