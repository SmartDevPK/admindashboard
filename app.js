import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/db/db.user.js";
import routeuse from "./src/routes/route.user.js"


const app = express ();
// Middleware for JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import Route
app.use(routeuse)

// Load environment variables from .env file
dotenv.config();





app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(express.static("public"));






  // Start the server
(async () => {
    try {
        await connectDB();
        console.log("MongoDB connection successful");

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
    }
})();
  