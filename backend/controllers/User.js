import User from "../models/User.js";
import Depense from "../models/Depense.js";
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
  export const Historique = async (req, res) => {
    try {
      const startDate = req.query.startDate || '00-00-0000'; // Assuming you pass startDate and endDate as query parameters
      const endDate = req.query.endDate || new Date();
  
      const Historique = await Depense.findAll({
        order: [['id', 'DESC']],
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
