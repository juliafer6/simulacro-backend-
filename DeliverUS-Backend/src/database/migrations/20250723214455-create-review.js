module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reviews', {
      id: {
        // TO-DO: It lacks the properties of this field
        type: Sequelize.INTEGER
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reviews')
  }
}
