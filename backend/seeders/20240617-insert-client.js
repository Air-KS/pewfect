'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const existingUser1 = await queryInterface.rawSelect('Register', {
        where: {
          email: 'client1@gmail.com',
        },
      }, ['id']);

      const existingUser2 = await queryInterface.rawSelect('Register', {
        where: {
          email: 'client2@gmail.com',
        },
      }, ['id']);

      if (existingUser1 || existingUser2) {
        console.log('One or more users already exist, skipping insertion.');
        return;
      }

      const hashedPassword1 = await bcrypt.hash('Bisous90*', 10);
      const hashedPassword2 = await bcrypt.hash('Bisous90*', 10);

      await queryInterface.bulkInsert('Register', [
        {
          email: 'client1@gmail.com',
          password: hashedPassword1,
          role_id: 1, // client
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          email: 'client2@gmail.com',
          password: hashedPassword2,
          role_id: 1, // client
          created_at: new Date(),
          updated_at: new Date()
        }
      ]);

      // Récupérer les enregistrements insérés
      const newRegisters = await queryInterface.sequelize.query(
        'SELECT id, email, role_id FROM Register WHERE email IN (:emails)',
        {
          type: Sequelize.QueryTypes.SELECT,
          replacements: { emails: ['client1@gmail.com', 'client2@gmail.com'] }
        }
      );

      const usersInfoData = newRegisters.map(register => ({
        register_id: register.id,
        last_name: register.email === 'client1@gmail.com' ? 'Rogeret' : 'Maly',
        first_name: register.email === 'client1@gmail.com' ? 'Kevin' : 'Alexandra',
        date_of_birth: register.email === 'client1@gmail.com' ? '1989-06-08' : '1990-06-13', // Format de date correct
        email: register.email,
        phone: register.email === 'client1@gmail.com' ? '0610421272' : '0789278364',
        address_one: register.email === 'client1@gmail.com' ? "Adresse de Rogeret Kevin" : "Adresse de Maly Alexandra",
        address_two: register.email === 'client1@gmail.com' ? "Adresse 2 de Air-KS" : "Adresse 2 de Alexou",
        city: register.email === 'client1@gmail.com' ? "Roubaix" : "Tourcoing",
        zip_code: register.email === 'client1@gmail.com' ? "59100" : "59200",
        country: register.email === 'client1@gmail.com' ? "France" : "Espagne",
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

