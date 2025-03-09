import express from 'express';
import { renderHomePage, handleSignup, loginPage, loginUser } from '../controllers/controllers.user.js';

const router = express.Router();

// Home Route
router.get("/", renderHomePage); 

router.post("/signup", handleSignup)

router.get("/login", loginPage)
router.post("/login", loginUser);



export default router;