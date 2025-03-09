import { ApiError } from "../util/ApiError.js";
import contents from "../models/contents.js";

// Render Home Page and Redirect to Register
const renderHomePage = async (req, res) => {
    try {
        return res.status(200).redirect("auth/register");
    } catch (error) {
        console.error("Error rendering registration page:", error);
        throw new ApiError(500, "Something went wrong while rendering the page");
    }
};

// Export Function
export { renderHomePage };
