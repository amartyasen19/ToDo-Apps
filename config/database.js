const { Sequelize } = require('sequelize');

// Create an SQLite instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'  // This will create the SQLite file  
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to SQLite has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
