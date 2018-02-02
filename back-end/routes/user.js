const express = require ("express");
const User = require ("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();


router.post("/register", (req, res) => {
    let newObj = new User({
        username : req.body.username,
        email : req.body.email,
        phoneNumber : req.body.phoneNumber,
        password : req.body.password,
    });

    newObj.save((error) => {
        if (error) {
            res.status(500).send(error);
        }
        else {
            res.json(newObj);
        }
    });
});


router.post("/login", (req, res) => {

    query = {}

    if(req.body.usernamee){
        query.username = req.body.usernamee
        query.password = req.body.password
    }
    if(req.body.emaill){
        query.email = req.body.emaill
        query.password = req.body.password
    }
    if(req.body.phoneNumberr){
        query.phoneNumber = req.body.phoneNumberr
        query.password = req.body.password
    }

    //findOne ini pakemongoose
    User.findOne(query, (error, result) => {
        if(error){
            res.status(500).json(error);
        }
        else if (!result){
            res.status(404).json({ message : "User not Found!" });
        }
        else {
            const payload = {
                id : result._id,
                name : result.username
            };

            // const token = jwt.sign(payload, "secretkey", { expiresIn : 1500});
            // res.json ({ token : token });

            const token = jwt.sign(payload, "secretkey", {expiresIn :3000 });
            const userid = result._id
            const username =result.username
            const useremail =result.email
            const userphoneNumber = result.phoneNumber


            res.json({token:token, userid:userid, username:username, useremail:useremail, userphoneNumber:userphoneNumber});
        };
    });

});


  

module.exports =(function(){
    return router;
})();
