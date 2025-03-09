import express from 'express';
import { renderHomePage, handleSignup } from '../controllers/controllers.user.js';

const router = express.Router();

// Home Route
router.get("/", renderHomePage); 

router.post("/signup", handleSignup)



export default router;