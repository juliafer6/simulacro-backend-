module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reviews', {
      id: {
        // TO-DO: It lacks the properties of this field hfg
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stars: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      body: {
        type: Sequelize.STRING
      },
      restaurantId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: 'Restaurants'
          },
          key: 'id'
        }
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reviews')
  }
}
