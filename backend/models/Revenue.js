import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./User.js";

const { DataTypes } = Sequelize;

const revenues = db.define("revenues", {
  id_rev: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Montant: {
    type: DataTypes.FLOAT,
  },
  Categorie: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  Date: {
    type: DataTypes.DATE,
  },
  Description: {
    type: DataTypes.STRING,
  }, 
 
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User', 
      key: 'id',       
    },
  },
});


revenues.belongsTo(User, { foreignKey: 'id', targetKey: 'id' });

export default revenues;
