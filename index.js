const express = require("express");
const app = express();
const port = 3069;
const jwt = require("jsonwebtoken");
const JWT_SECRET = "goverdhandharvijayte";

app.use(express.json());


app.post('/signup', function(req, res) {
    res.json("testsucess");
})
app.post('/signin', function(req, res) {
    res.json("testsucess");
})

app.get('/me', function(req, res) {
    res.json("testsucess");
})

app.listen(port, () => {
    console.log(`listening on port${ port }`)
});