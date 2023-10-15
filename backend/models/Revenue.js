import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./User.js";

const { DataTypes } = Sequelize;

const Revenue = db.define("Revenues", {
  id_rev: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Montant: {
    type: DataTypes.FLOAT,
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

Revenue.belongsTo(User, { foreignKey: 'id', targetKey: 'id' });

export default Revenue;
