import express from 'express';
import { renderHomePage, handleSignup, loginPage, loginUser, forgetPassword} from '../controllers/controllers.user.js';

const router = express.Router();

// Home Route
router.get("/", renderHomePage); 

router.post("/signup", handleSignup)

router.get("/login", loginPage)
router.post("/login", loginUser);

router.get("/forgetPassword", forgetPassword);



export default router;