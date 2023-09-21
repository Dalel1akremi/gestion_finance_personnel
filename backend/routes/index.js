import express from "express";
import {Login,Register,AjoutDepense,getRecentDepenses, Historique, Email, Statistique,getCategories,addCategory,editCategory,deleteCategory,reset_password} from "../controllers/User.js"
import { verifyToken } from "../middelware/VerifyToken.js";
const router = express.Router();

router.post('/Login', Login);
router.post('/Register', Register);
router.post('/AjoutDepense', verifyToken, AjoutDepense);
router.get('/recentDepenses', verifyToken,getRecentDepenses)
router.get('/Historique', verifyToken,Historique)
router.post('/Contact', Email)

router.get('/statistics', verifyToken,Statistique)
// if make private route verify token user before send response must call to verifyToken feature with the intial feature for this route
router.get('/getCategories', getCategories) 
router.post('/addCategory', addCategory) 
router.put('/editCategory', editCategory) 
router.delete('/deleteCategory', deleteCategory)
router.post('/reset_password',reset_password)
export default router;