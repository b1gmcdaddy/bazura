import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors({
    origin: 'https://bazura.vercel.app',
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());    

//deployment credentials
const db = mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    user: "sql12709419",
    password: "Jv7LMxSYDl",
    database: "sql12709419",
    port: 3306
})

////////////////for theMealDB proxy srver////////////////////////////////////
app.get('/meals', async (req, res) => {
    try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=', { withCredentials: true });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from MealDB:', error);
        res.status(500).json({ error: 'Failed to fetch data from MealDB' });
    }
});

/////////////////////////////////auth, registration, login////////////////////////////////////////////
const verifyUser = (req, res, next) => {    
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ Error: "Authentication error: Token missing" });
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ Error: "Authentication error: Invalid token" });
            } else {
                req.username = decoded.username;
                next();
            }
        });
    }
};

app.get('/', verifyUser, (req, res) => {
    return res.status(200).json({ Status: "Success", username: req.username });
});

const hashNum = 10;
app.post('/register', (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.json({ Error: "All fields are required" });
  }

  bcrypt.hash(req.body.password.toString(), hashNum, (err, hash) => {
    if (err) {
      console.error(err);
      return res.json({ Error: "Error hashing" });
    }

    const sql = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";
    const values = [
      req.body.username,
      req.body.email,
      hash
    ];

    db.query(sql, [values], (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ Error: "Data insertion error in server side" });
      }

      return res.json({ Status: "Success" });
    });
  });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ Error: "Email and password are required" });
    }

    // Retrieve user data from the database based on email
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Error: "Server error during login" });
        }
        if (data.length === 0) {
            return res.status(404).json({ Error: "Email not found" });
        }

        // Compare passwords
        bcrypt.compare(password, data[0].password, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ Error: "Server error during password comparison" });
            }
            if (result) {
                // Passwords match, generate JWT token
                const username = data[0].username;
                const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '30m' });
                res.cookie('token', token, { httpOnly: true });
                return res.status(200).json({ Status: "Success", token });
            } else {
                return res.status(401).json({ Error: "Incorrect password" });
            }
        });
    });
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
})


////////////////////////////ADD FOOD MENU SECTION///////////////////////////////
app.get('/menu', (req, res) => {
    const sql = "SELECT * FROM menu";
    db.query(sql, (err, result) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ Error: "Error retrieving menu items" });
        }
        return res.json({ Status: "Success", menu: result }); // Ensure response format matches test expectations
    });
});


app.post('/addFood', (req, res) => {
    const newFood = req.body;
    // Insert the new food item into the database
    db.query(`INSERT INTO menu (foodName, foodDesc, category, price) VALUES (?, ?, ?, ?)`, 
      [newFood.foodName, newFood.foodDesc, newFood.category, newFood.price], 
      (err, results) => {
        if (err) {
          res.status(500).send({ Error: 'Failed to add new food item' });
        } else {
          res.send({ Status: 'Success', addedFoodId: results.insertId });
        }
      });
  });

app.put('/menu/:id', (req, res) => {
    const { foodName, foodDesc, price } = req.body;
    const { id } = req.params;
    const sql = "UPDATE menu SET foodName = ?, foodDesc = ?, price = ? WHERE foodID = ?";
    const values = [foodName, foodDesc, price, id];
    db.query(sql, values, (err, result) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ Error: "Error updating menu item" });
        }
        if(result.affectedRows === 0) { // Check if any rows were affected by the update
            return res.status(404).json({ Error: "No matching food item found for update" });
        }
        return res.json({ Status: "Success" });
    });
});



app.delete('/menu/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM menu WHERE foodID = ?";
    db.query(sql, [id], (err, result) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ Error: "Error deleting menu item" });
        }
        if(result.affectedRows === 0) { // Check if any rows were affected by the delete
            return res.status(404).json({ Error: "No matching food item found for delete" });
        }
        return res.json({ Status: "Success" });
    });
});


app.listen(8081, () => {
    console.log(`Server is running on port 8081`);
});

export default app;