import User from "../models/User.js";
import Depense from "../models/Depense.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const Register = async(req, res) => {
    const {  firstName,lastName,email,password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await User.create({       
            firstName: firstName,
            lastName:lastName,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Register secessuful"});
    } catch (error) {
        console.log(error);
        return res.status(404).json({msg: "Eror"});

    } 
}

export const Login = async(req, res) => {
   
    try {
        const user = await User.findAll({
            where:{
                email: req.body.email
            }
     
        });
       
        const match = await bcrypt.compare(req.body.password, user[0].password);
        console.log(match)
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const email = user[0].email;
        const token = jwt.sign({userId,email}, "process.env.ACCESS_TOKEN_SECRET", {
            expiresIn: "7d",
        });
        res.json({token});
        //return token;
    } catch (error) {
        res.status(404).json({msg:"User Not Found "});
    }
}
export const AjoutDepense = async(req, res) => {
    const {  Montant,Categorie,Date,Description} = req.body;
    
    try {
        await Depense.create({       
            Montant: Montant,
            Categorie:Categorie,
            Date: Date,
            Description: Description
        });
        res.json({msg: "Ajouté avec succée"});
    } catch (error) {
        console.log(error);
        return res.status(404).json({msg: "Eror"});

    } 
}
export const getRecentDepenses = async (req, res) => {
    try {
      const recentDepenses = await Depense.findAll({
        order: [['id','DESC']],
        limit: 1, 
      });
  
      res.json(recentDepenses);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Error while fetching recent depenses' });
    }
  };