import express from "express";
import {Login,Register,AjoutDepense,getRecentDepenses, Historique, Email, Statistique,getCategories,addCategory,editCategory,deleteCategory,reset_password} from "../controllers/User.js"
import { verifyToken } from "../middelware/VerifyToken.js";
const router = express.Router();

router.post('/Login', Login);
router.post('/Register', Register);
router.post('/AjoutDepense',AjoutDepense);
router.get('/recentDepenses',getRecentDepenses)
router.get('/Historique',Historique)
router.post('/Contact', Email)
router.get('/statistics',Statistique)
router.get('/getCategories', getCategories) 
router.post('/addCategory', addCategory) 
router.put('/editCategory', editCategory) 
router.delete('/deleteCategory', deleteCategory)
router.post('/reset_password',reset_password)
export default router;