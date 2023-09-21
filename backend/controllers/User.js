import User from "../models/User.js";
import Depense from "../models/Depense.js";
import crypto from 'crypto';
import Categories from '../models/Categories.js';
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
        const token = jwt.sign({userId,email}, "process.env.ACCESS_TOKEN_SECRET", {
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
    });

    res.json({ msg: "Ajouté avec succès", newExpense });
  } catch (error) {
    console.error("Error in AjoutDepense:", error);
    return res.status(500).json({ msg: "Erreur", error: error.message });
  }
};



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
  export const Historique = async (req, res) => {
    try {
      const startDate = req.query.startDate || '00-00-0000'; // Assuming you pass startDate and endDate as query parameters
      const endDate = req.query.endDate || new Date();
  
      const Historique = await Depense.findAll({
        order: [['id_dep', 'DESC']],
        limit: 1000000000000000,
        where: {
          Date: {
            [db.Sequelize.Op.between]: [new Date(startDate), new Date(endDate)],
          },
        },
      });
  
      res.json(Historique);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Error while fetching recent depenses' });
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
                [db.Sequelize.Op.between]: [startDate, endDate],},},
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
          const category = await Categories.findOne({ where: { nom_cat: name } });
      
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
          const category = await Categories.findOne({ where: { nom_cat: name } });
      
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
      
      export const reset_password= async (req, res) => {
        const { email } = req.body;
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'yakinebenali5@gmail.com', 
        pass: 'offpdprxkhmnutjd'
        },
      });
      function generateResetToken() {
        return crypto.randomBytes(32).toString('hex');
      }
     
        const resetToken = generateResetToken(); 
        const resetLink = `http://localhost:3000/reset_password/${resetToken}`;
      
        const mailOptions = {
          from: 'yakinebenali5@gmail.com',
          to: email,
          subject: 'Réinitialisation de mot de passe',
          text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetLink}`,
        };
      
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
            res.status(500).json({ message: 'Une erreur est survenue lors de lenvoi de le-mail de réinitialisation de mot de passe' });
          } else {
            console.log('E-mail de réinitialisation de mot de passe envoyé : ' + info.response);
            res.json({ message: 'E-mail de réinitialisation de mot de passe envoyé avec succès' });
          }
        });
      };
      