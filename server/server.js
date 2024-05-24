import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import axios from 'axios';

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bazura"
});

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

/////////////////////////////////auth, registration, lgoin////////////////////////////////////////////
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Error: "Auth error"});
    } else {
        jwt.verify(token, "jwtKey", (err, decoded) => {
            if(err) {
                return res.json({Error: "token error"})
            } else {
                req.username = decoded.username;
                next();
            }
        })
    }
}

app.get('/', verifyUser, (req, res) => {
    return res.json({Status: "Success", username: req.username});
})


const hashNum = 10;
app.post('/register', (req, res) => {
    const sql = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), hashNum, (err, hash) => {
        if(err) return res.json({Error: "Error hashing"});
        const values = [
            req.body.username,
            req.body.email,
            hash
        ]
        db.query(sql, [values], (err, result) => {
            if(err) return res.json({Error: "data innsertion error in server side"});
            return res.json({Status: "Success"});
        }) 
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [req.body.email], (err, data) => {
        if(err) return res.json({Error: "Server login error"});
        if(data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if(err) return res.json({Error: "Password compare error"});
                if(response) {
                    const username = data[0].username;
                    const token = jwt.sign({username}, "jwtKey", {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({Status: "Success"});
                } else {
                    return res.json({Error: "Incorrect Password"});
                }
            })
        } else {
            return res.json({Error: "This email does not exist!"});
        }
    })
})

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
})


////////////////////////////ADD FOOD MENU SECTION///////////////////////////////
app.get('/menu', (req, res) => {
    const sql = "SELECT * FROM menu";
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ Error: "Failed to fetch menu items" });
      }
      return res.json({ Status: "Success", menu: result });
    });
  });

app.post('/addFood', (req, res) => {
    const { foodName, foodDesc, category, price } = req.body;
    const sql = "INSERT INTO menu (foodName, foodDesc, category, price) VALUES (?, ?, ?, ?)";
    const values = [foodName, foodDesc, category, price];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ Error: "addFood error" });
      }
      return res.json({ Status: "Success" });
    });
  });

app.listen(8081, () => {
    console.log("test server side..");
});
