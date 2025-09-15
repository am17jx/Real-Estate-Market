'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('tags', [
      { Name: 'Land'},
      { Name: 'real estate' },
      { Name: 'Sale or rent' }
    ], {});

    const [tags] = await queryInterface.sequelize.query(
      `SELECT id FROM tags WHERE "Name" IN ('Land', 'real estate', 'Sale or rent')`
    );
    const [properties] = await queryInterface.sequelize.query(
      `SELECT id FROM properties`
    );

    const links = [];
    properties.forEach(p => {
      tags.forEach(t => {
        links.push({
          property_id: p.id,
          tag_id: t.id,
        });
      });
    });

    await queryInterface.bulkInsert('property_tags', links, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('property_tags', null, {});

    await queryInterface.bulkDelete('tags', {
      Name: ['Land', 'real estate', 'Sale or rent']
    }, {});
  }
};
