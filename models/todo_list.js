const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Todo model
const TodoLists = sequelize.define('TodoLists', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'todo_lists',  // Explicit table name
  timestamps: false,        // We don't need timestamps (createdAt/updatedAt)
});

// Sync the model with the database
sequelize.sync()
  .then(() => console.log('TodoLists table has been created successfully.'))
  .catch(err => console.log('Error creating table:', err));

module.exports = TodoLists;
