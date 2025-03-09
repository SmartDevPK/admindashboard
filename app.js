import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import connectDB from "./src/db/db.user.js";


const app = express ();


// Load environment variables from .env file
dotenv.config();


//middleware to parse JSON
app.use(bodyParser.json())



app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(express.static("public"));

app.get('/admin', (req, res) => {
    res.render('admin', { title: 'Admin', message: 'Welcome to the Admin Page!' });
  })
  // Define routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home', message: 'Welcome to the Home Page!' });
  });


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
  