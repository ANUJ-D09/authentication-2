const express = require("express");
const app = express();
const port = 3069;
const jwt = require('jsonwebtoken')
const JWT_SECRET = "Kalyanrayvijayte";

app.use(express.json());

const users = [];



app.post('/signup', function(req, res) {
    const userName = req.body.username;
    const passWord = req.body.passWord;

    users.push({
        userName: userName,
        passWord: passWord
    });

    console.log(users);
    res.json({ message: "You are signed up sp enjoy" });
});

app.post('/signin', function(req, res) {
    const userName = req.body.username;
    const passWord = req.body.passWord;

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
app.get('/me', function(req, res) {
    const token = req.headers['token'];

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const username = decoded.username;

        const founduser = users.find(user => user.userName === username);
        if (founduser) {
            res.json({
                username: founduser.userName,
                password: founduser.passWord
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});