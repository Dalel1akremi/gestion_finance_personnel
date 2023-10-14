import express from "express";
import {Login,Register,AjoutDepense,getRecentDepenses, Historique, Email, Statistique,getCategories,addCategory,editCategory,deleteCategory,reset_password,changePassword,checkUnaddedExpenses} from "../controllers/User.js"
import { verifyToken } from "../middelware/VerifyToken.js";
const router = express.Router();

router.post('/Login', Login);
router.post('/Register', Register);
router.post('/AjoutDepense', verifyToken, AjoutDepense);
router.get('/recentDepenses', verifyToken,getRecentDepenses)
router.get('/Historique', verifyToken,Historique)
router.post('/Contact', Email)

router.get('/statistics', verifyToken, Statistique)
// if make private route verify token user before send response must call to verifyToken feature with the intial feature for this route
router.get('/getCategories', verifyToken, getCategories) 
router.post('/addCategory', verifyToken, addCategory) 
router.put('/editCategory', verifyToken, editCategory) 
router.delete('/deleteCategory', verifyToken, deleteCategory)
router.post('/reset_password',reset_password)
router.post('/changePassword', verifyToken,changePassword)
router.get('/checkUnaddedExpenses',verifyToken,checkUnaddedExpenses)
export default router;