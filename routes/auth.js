const router = require("express").Router();
const User = require("../models/User");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register" , async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password)
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(err){
        // res.status(500).json(err);
        console.log(err);
    }

    
});


//LOGIN

router.post("/login", async(req,res) =>{
    try{
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json("Wrong credentials");
        const hashedPassword = md5(req.body.password);
        
        hashedPassword !== user.password && res.status(401).json("Wrong credentials");

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin : user.isAdmin,
        }, 
        process.env.JWT_SEC,
        {expiresIn: "3d"}
        );

        const {password, ...others} = user._doc;
        
        res.status(200).json({... others, accessToken});
    } 
    catch(err){
        console.log(err);
    }
})

module.exports = router 