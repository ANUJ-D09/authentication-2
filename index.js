const express = require("express");
const app = express();
const port = 3069;
const jwt = require('jsonwebtoken')
const JWT_SECRET = "Kalyanrayvijayte";
const path = require('path');

app.use(express.json());

const users = [];



app.post('/signup', function(req, res) {
    const userName = req.body.username;
    const passWord = req.body.password;

    users.push({
        userName: userName,
        passWord: passWord
    });

    console.log(users);
    res.json({ message: "You are signed up sp enjoy" });
});

app.post('/signin', function(req, res) {
    const userName = req.body.username;
    const passWord = req.body.password;

    let founduser = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].userName === userName && users[i].passWord === passWord) {
            founduser = users[i];
            break;
        }
    }

    if (founduser) {
        const token = jwt.sign({
            username: userName
        }, JWT_SECRET);

        //founduser.token = token; // assign token to the matched user
        res.json({ message: "Sign in successful", token });
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
});



app.get("/", (req, res) => {
    res.sendFile("/Users/anujdamani/Desktop/100xdevs/authpart2/public/index.html");
});

function auth(req, res, next) {
    const token = req.headers['token'];

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

app.get('/me', auth, function(req, res) {
    const username = req.user.username;

    const foundUser = users.find(user => user.userName === username);
    if (foundUser) {
        res.json({
            username: foundUser.userName,
            password: foundUser.passWord
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});