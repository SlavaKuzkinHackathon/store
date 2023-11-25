const { faker } = require('@faker-js/faker');
('use strict');

const divansManufacturers = [
  'HiFly',
  'Dunlop',
  'Mazzini',
  'Nexen',
  'Yokohama',
  'Sailun',
  'Triangle',
  'Kama',
  'Nokian',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Divans',
      [...Array(100)].map(() => ({
        divans_manufacturer:
          divansManufacturers[
            Math.floor(Math.random() * divansManufacturers.length)
          ],
        price: faker.random.numeric(4),
        name: faker.lorem.sentence(2),
        description: faker.lorem.sentence(2),
        images: JSON.stringify(
          [...Array(3)].map(
            () =>
              `${faker.image.technics()}?random=${faker.random.numeric(30)}`,
          ),
        ),
        vendor_code: faker.internet.password(),
        in_stock: faker.random.numeric(1),
        bestseller: faker.datatype.boolean(),
        new: faker.datatype.boolean(),
        popularity: faker.random.numeric(3),
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Divans', null, {});
  },
};