import express from 'express';
import {register,loginUser} from '../controllers/auth-controller.js'
import authMiddleware  from '../middlewares/auth-middleware.js'
const router = express.Router();

router.post("/signin",register);

router.post("/login",loginUser);

router.get("/user",authMiddleware,(req,res) => {
    res.status(200).json({
        message : "user authenticated",
        userInfo : req.userInfo
    })
})




export default router;