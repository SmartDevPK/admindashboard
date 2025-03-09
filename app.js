import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";


const app = express ();


// Load environment variables from .env file
dotenv.config();


//middleware to parse JSON
app.use(bodyParser.json())


const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "src/views");

app.get('/admin', (req, res) => {
    res.render('admin', { title: 'Admin', message: 'Welcome to the Admin Page!' });
  })
  // Define routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home', message: 'Welcome to the Home Page!' });
  });


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})