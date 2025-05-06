import express from 'express';
import { login, profile, register } from '../controllers/user.js';
import { Authenticate } from '../middlewares/auth.js';
const router = express.Router();

//user register
router.post('/register',register)

//user login
router.post('/login', login)

//profile 
router.get('/user' ,Authenticate ,profile)

export default router