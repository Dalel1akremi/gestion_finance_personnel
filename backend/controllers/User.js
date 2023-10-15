import User from "../models/User.js";
import Depense from "../models/Depense.js";
import Revenue from "../models/Revenue.js";
import Categories from '../models/Categories.js';
import revenues from'../models/Revenue.js';
import crypto from 'crypto';
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import {Sequelize} from "sequelize";
const db = new Sequelize('authentification','root','',{
  host: "localhost",
  dialect: "mysql"
});

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
        console.log("logged: ", process.env.ACCESS_TOKEN_SECRET)
        const token = jwt.sign({userId,email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "7d",
        });
        res.json({token});
        //return token;
    } catch (error) {
        res.status(404).json({msg:"User Not Found "});
    }
}
export const AjoutDepense = async (req, res) => {
  const { Montant, Categorie, Date, Description } = req.body;
  try {
    const category = await Categories.findOne({
      where: { nom_cat: Categorie },
    });

    if (!category) {
      return res.status(400).json({ msg: "Category not found" });
    }
  
    const newExpense = await Depense.create({
      
      Montant: Montant,
      Categorie: Categorie, 
      Date: Date,
      Description: Description,
      id_cat: category.id_cat, 
      id: req.user.userId,
  
    });
    res.json({ msg: "Ajouté avec succès", newExpense });
  } catch (error) {
    console.error("Error in AjoutDepense:", error);
    return res.status(500).json({ msg: "Erreur", error: error.message });
  }
};





  export const Historique = async (req, res) => {
    try {
      const startDate = req.query.startDate || '00-00-0000'; // Assuming you pass startDate and endDate as query parameters
      const endDate = req.query.endDate || new Date();
      
      const Depensees = await Depense.findAll({
        order: [['id_dep', 'DESC']],
        limit: 1000000000000000,
        
        where: {
          Date: {
            [db.Sequelize.Op.between]: [new Date(startDate), new Date(endDate)],
            
          },
          id: req.user.userId,
        },
      });
      const Revenues = await revenues.findAll({
        order: [['id_rev', 'DESC']],
        limit: 1000000000000000,
        
        where: {
          Date: {
            [db.Sequelize.Op.between]: [new Date(startDate), new Date(endDate)],
            
          },
          id: req.user.userId,
        },
      });
  
      res.json({ Depenses: Depensees, revenues: Revenues });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Error while fetching recent revenue' });
    }
  };
  
export const Email= async(req, res) => {
    const {name, email, message } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
            user: 'yakinebenali5@gmail.com', 
        pass: 'offpdprxkhmnutjd' 
        },});
        const mailOptions = {
            from:'abir@gmail.com',
            to: 'yakinebenali5@gmail.com',
            subject: `New Contact Form gestion de finance personnel from ${name}`,
            text: message,
            replyTo: email,
          };
        
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
              res.status(500).json({ success: false, message: 'Email not sent' });
            } else {
              console.log('Email sent successfully: ' + info.response);
              res.json({ success: true, message: 'Email sent successfully' });
            }
          });
        };
    export const Statistique = async (req, res) => {
        try {
          var tempsEnMs = Date.now();
          const startDate = req.query.startDate ?? '00-00-0000'; // Assuming you pass startDate and endDate as query parameters
          const endDate = req.query.endDate ?? tempsEnMs ;
          // Group and sum the Montant by Categorie
          console.log("test:")
          const statistics = await Depense.findAll({
            attributes: ['Categorie', [db.fn('SUM', db.col('Montant')), 'Total']],
            group: ['Categorie'],
            where: {
              Date: {
                [db.Sequelize.Op.between]: [startDate, endDate],},
                id: req.user.userId,},
          });
         
          res.json(statistics);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ msg: 'Error while fetching statistics' });
        }
      };
      

    export const getCategories = async (req, res) => {
        try {
          const categories = await Categories.findAll({
            attributes: ['nom_cat'], 
            where: {
               
                id: req.user.userId, },
          });
      
         
          const categoryNames = categories.map((category) => category.nom_cat);
      
          res.json(categoryNames);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ msg: 'Error while fetching category names' });
        }
      };
    
      export const addCategory = async (req, res) => {
        const { name } = req.body;
      
        try {
          const newCategory = await Categories.create({
            nom_cat: name,
            id: req.user.userId,
          });
      
          res.json({ msg: "Category added successfully", newCategory });
        } catch (error) {
          console.error("Error in addCategory:", error);
          return res.status(500).json({ msg: "Erreur", error: error.message });
        }
      };
      export const editCategory = async (req, res) => {
        const { name, newName } = req.body;
      
        try {
          const category = await Categories.findOne({ where: { nom_cat: name } ,
            id: req.user.userId,
          });
      
          if (!category) {
            return res.status(404).json({ msg: "Category not found" });
          }
      
          category.nom_cat = newName;
          await category.save();
      
          res.json({ msg: "Category edited successfully", category });
        } catch (error) {
          console.error("Error in editCategory:", error);
          return res.status(500).json({ msg: "Erreur", error: error.message });
        }
      };
      
      
      export const deleteCategory = async (req, res) => {
        const { name } = req.body;
      
        try {
          const category = await Categories.findOne({ where: { nom_cat: name } ,id: req.user.userId,});
      
          if (!category) {
            return res.status(404).json({ msg: "Category not found" });
          }
      
          await category.destroy();
      
          res.json({ msg: "Category deleted successfully" });
        } catch (error) {
          console.error("Error in deleteCategory:", error);
          return res.status(500).json({ msg: "Erreur", error: error.message });
        }
      };
      
      export const reset_password = async (req, res) => {
        const { email } = req.body;
      
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'yakinebenali5@gmail.com',
            pass: 'offpdprxkhmnutjd',
          },
        });
      
        // Générer un nouveau mot de passe aléatoire
        const password = crypto.randomBytes(8).toString('hex');
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        try {
          // Mettre à jour le mot de passe dans la base de données
          const user = await User.findOne({ where: { email: email } });
      
          if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
          }
      
          user.password = hashedPassword;
          await user.save();
      
          // Envoyer le nouveau mot de passe par e-mail
          const mailOptions = {
            from: 'votre_email@gmail.com',
            to: email,
            subject: 'Réinitialisation de votre mot de passe',
            text: `Votre nouveau mot de passe est : ${password}`,
          };
      
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ message: 'Erreur lors de lenvoi de le-mail.' });
            }
      
            res.status(200).json({ message: 'Nouveau mot de passe envoyé par e-mail.' });
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Erreur lors de la réinitialisation du mot de passe.' });
        }
      };
      
      export const changePassword = async (req, res) => {
        try {
          const { oldPassword, newPassword } = req.body;
          const userId = req.user.userId; 
      
          // Find the user by their user ID
          const user = await User.findByPk(userId);
      
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          // Compare the old password with the stored hashed password
          const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      
          if (!isPasswordValid) {
            return res.status(401).json({ message: 'Old password is incorrect' });
          }
      
          // Hash the new password and update it in the database
          const salt = await bcrypt.genSalt();
          const hashPassword = await bcrypt.hash(newPassword, salt);
          user.password = hashPassword;
      
          await user.save();
      
          res.json({ message: 'Password changed successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error changing password' });
        }
      };
    


      export const checkUnaddedExpenses = async (req, res) => {
        try {
          const yesterday = new Date();
          console.log(yesterday)
          yesterday.setDate(yesterday.getDate() - 1);
          console.log(yesterday)

          const unaddedExpenses = await Depense.findAll({
            where: {
              id: req.user.userId,              Date: {
                [Sequelize.Op.between]: [new Date(yesterday.toISOString().slice(0, 10)), yesterday],
              },
         } });
          
         
      
          res.json({ hasUnaddedExpenses: unaddedExpenses.length > 0 });
        } catch (error) {
          console.error('Error checking unadded expenses:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };
      

      export const Acceuil = async (req, res) => {
        try {
          var tempsEnMs = Date.now();
          const startDate = req.query.startDate ?? '00-00-0000'; // Assuming you pass startDate and endDate as query parameters
          const endDate = req.query.endDate ?? tempsEnMs ;
          // Group and sum the Montant by Categorie
          const statisticsRevenue = await Revenue.findAll({
            attributes: ['Date', [db.fn('SUM', db.col('Montant')), 'Total']],
            group: ['Date'],
            where: {
              Date: {
                [db.Sequelize.Op.between]: [startDate, endDate],},
                id: req.user.userId,},
          });
         
          
          const statisticsDepense = await Depense.findAll({
            attributes: ['Date', [db.fn('SUM', db.col('Montant')), 'Total']],
            group: ['Date'],
            where: {
              Date: {
                [db.Sequelize.Op.between]: [startDate, endDate],},
                id: req.user.userId,},
          });
         
          res.json({Depense:statisticsDepense,Revenue:statisticsRevenue});
        } catch (error) {
          console.error(error);
          return res.status(500).json({ msg: 'Error while fetching statistics' });
        }
      };