import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const Depense = db.define('Depenses',{
    Montant:{
        type: DataTypes.FLOAT
    },
    Categorie:{
        type: DataTypes.STRING
    },
    Date:{
        type: DataTypes.DATE
    },
    Description:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});

export default Depense;