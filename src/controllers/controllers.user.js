import { ApiError } from "../util/ApiError.js";
import contents from "../models/contents.js";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ---------- Render Home Page and Redirect to Register ---------- //
// ---------- Render Home Page and Redirect to Register ---------- //
const renderHomePage = async (req, res) => {
    try {
        return res.status(200).render("auth/register", { errors: null });
    } catch (error) {
        console.error("Error rendering registration page:", error);
        throw new ApiError(500, "Something went wrong while rendering the page");
    }
};

// ---------- Handle User Signup ---------- //
const handleSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const errors = [];

        // ------ Validate Input Fields ------ //
        if (!name || !email || !password) {
            errors.push("All fields are required.");
        }

        // ------ Check if the email already exists ------ //
        const existingUser = await contents.findOne({ email });
        if (existingUser) {
            errors.push("Email is already registered.");
        }

        // ------ Define Password Schema ------ //
        const passwordSchema = Joi.string()
            .min(8)
            .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
            .required();

        // ------ Validate Password ------ //
        const { error } = passwordSchema.validate(password);
        if (error) {
            errors.push("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
        }

        // ------ If there are validation errors, return errors to the user ------ //
        if (errors.length > 0) {
            return res.status(400).render("auth/register", { errors });
        }

        // ------ Hash the Password ------ //
        const hashedPassword = await bcrypt.hash(password, 10);

        // ------ Create a New User Entry ------ //
        const newUser = new contents({ name, email, password: hashedPassword });
        await newUser.save();

        // ------ Redirect to Login Page on Successful Signup ------ //
        return res.status(201).render("auth/login");
    } catch (error) {
        console.error("Error saving user:", error);
        throw new ApiError(500, "Something went wrong while saving the user.");
    }
};


// ---------- Render Login Page ---------- //
const loginPage = async (req, res) => {
    try {
        return res.status(200).render("auth/login", { errors: null, email: ''  });
    } catch (error) {
        console.error("Error rendering login page:", error);
        throw new ApiError(500, "Something went wrong while rendering the login page");
    }
};

// ---------- Handle User Login ---------- //
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let errors = {};

        // ------ Check if user exists ------ //
        const user = await contents.findOne({ email });
        if (!user) {
            errors.general = "Invalid email or password";
            return res.status(400).render("auth/login", { errors, email });
        }

        // ------ Compare passwords ------ //
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            errors.general = "Invalid email or password";
            return res.status(400).render("auth/login", { errors, email });
        }

        // ------ Generate JWT Token ------ //
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // ------ Store token in cookies ------ //
        res.cookie("token", token, { httpOnly: true });

        // ------ Redirect to Admin Page ------ //
        return res.status(200).render("auth/admin");
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).render("auth/login", { errors: { general: "Something went wrong" }, email });
    }
};

// const forgetPasswordReset = async (req, res) => {
//     try {
//     return res.status(200).render("auth/forgetpassword")
//     } catch (error) {
        
//     }
// }

// ---------- Export Functions ---------- //
export { renderHomePage, handleSignup, loginPage, loginUser };