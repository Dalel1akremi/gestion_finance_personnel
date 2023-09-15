import express from "express";
<<<<<<< HEAD
import {Login,Register,AjoutDepense,getRecentDepenses, Historique, Email, Statistique} from "../controllers/User.js"
=======
import {Login,Register,AjoutDepense,getRecentDepenses, Historique,getCategories,addCategory,editCategory,deleteCategory} from "../controllers/User.js"
>>>>>>> origin/abir3
import { verifyToken } from "../middelware/VerifyToken.js";
const router = express.Router();

router.post('/Login', Login);
router.post('/Register', Register);
router.post('/AjoutDepense',AjoutDepense);
router.get('/recentDepenses',getRecentDepenses)
router.get('/Historique',Historique)
<<<<<<< HEAD
router.post('/Contact', Email)

router.get('/statistics',Statistique)
// if make private route verify token user before send response must call to verifyToken feature with the intial feature for this route
=======
router.get('/getCategories', getCategories) 
router.post('/addCategory', addCategory) 
router.put('/editCategory', editCategory) 
router.delete('/deleteCategory', deleteCategory)

>>>>>>> origin/abir3
export default router;