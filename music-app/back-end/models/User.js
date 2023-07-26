const { Sequelize } = require('sequelize');
const sequelize = require('../utils/db');
const crypto = require('crypto');
const User = sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
    password:{
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeValidate: (users) => {
        if (!users.id) {
          const randomBytes = crypto.randomBytes(6);
          users.id = randomBytes.toString('hex');
        }
      },
    },
    timestamps: true,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log('users table created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table : ', error);
  });

module.exports = User;
