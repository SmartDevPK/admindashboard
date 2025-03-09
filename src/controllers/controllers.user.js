import { ApiError } from "../util/ApiError.js";
import contents from "../models/contents.js";
import Joi from "joi";
import bcrypt from "bcryptjs";

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

        // ------ Check if the email already exists ------ //
        const existingUser = await contents.findOne({ email });
        if (existingUser) {
            errors.push("Email is already registered");
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

        // ------ Redirect to Admin Page on Successful Signup ------ //
        return res.status(201).render("auth/admin");
    } catch (error) {
        console.error("Error saving user:", error);
        throw new ApiError(500, "Something went wrong while saving the user");
    }
};

// ---------- Export Functions ---------- //
export { renderHomePage, handleSignup };
