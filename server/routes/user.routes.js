const { request } = require('express');
const exp = require('express');
const { Db } = require('mongodb');

//import bcryptjs for password hashing
const bcryptjs = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");

//import jsonwebtoken to create a token for authentication
const jwt = require("jsonwebtoken");

const expressAsyncHandler = require('express-async-handler');
const userApp = exp.Router();

userApp.get('/test', (req, res) => {
    res.send({ message: "User API Working" });
})

//Route for user login (POST)
userApp.post('/login', expressAsyncHandler(async (req, res) => {
    //Get userCollection object
    const userCollection = req.app.get("userCollection");

    //search for the user with the given emailID
    const user = await userCollection.findOne({ email: req.body.email });
    //Logic for Authentication
    if (user == null)
        res.send({ message: "User Not Found" });
    else {
        //Compare the password with the hashed password
        //let isMatch = await bcryptjs.compare(req.body.password, user.password);
        // if (isMatch == false)
        //     res.send({ message: "Incorrect Password" });
        // else {
        //     //Create a token
        //     const token = jwt.sign({ emailID: user.emailID }, "123456", { expiresIn: 60 });
        //     res.send({ message: "Login Successful", payload: token, userObj: user });
        // }
        if(req.body.password === user.password)
            res.send({message: "Login Successful", userObj: user});
        else
            res.send({message: "Incorrect Password"});
    }
}))

//To extraxt body from request
userApp.use(exp.json());

module.exports = userApp;