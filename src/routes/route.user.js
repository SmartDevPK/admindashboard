import express from "express";
import { renderHomePage } from "../controllers/controllers.user.js";

const router = express.Router();

// Home Route
router.get("/", renderHomePage);

export default router;
