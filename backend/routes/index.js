import express from "express";
import {Login,Register,AjoutDepense,getRecentDepenses, Historique,getCategories,addCategory,editCategory,deleteCategory} from "../controllers/User.js"
import { verifyToken } from "../middelware/VerifyToken.js";
const router = express.Router();

router.post('/Login', Login);
router.post('/Register', Register);
router.post('/AjoutDepense',AjoutDepense);
router.get('/recentDepenses',getRecentDepenses)
router.post('/AjoutDepense',AjoutDepense)
router.get('/Historique',Historique)
router.get('/getCategories', getCategories) 
router.post('/addCategory', addCategory) 
router.put('/editCategory', editCategory) 
router.delete('/deleteCategory', deleteCategory)

export default router;