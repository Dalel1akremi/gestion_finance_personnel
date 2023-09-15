import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Categories from "./Categories.js";

const { DataTypes } = Sequelize;

const Depense = db.define("Depenses", {
  id_dep: {
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
  id_cat: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories', 
      key: 'id_cat',       
    },
  },
});

Depense.belongsTo(Categories, { foreignKey: "id_cat" });

export default Depense;
