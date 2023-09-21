import Sequelize from 'sequelize';
import sequelize from '../config/Database.js';

const Categories = sequelize.define('categories', {
  id_cat: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom_cat: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'User', 
      key: 'id',       
    },
  },
});

export default Categories;
