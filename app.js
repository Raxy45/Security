const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const app=express();
const ejs=require("ejs");
const encrypt = require("mongoose-encryption");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine",'ejs');
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/securityDB",{useNewUrlParser: true,useUnifiedTopology: true});

const userSchema=new mongoose.Schema({
    email:String,
    password:String
})

/************************************This is the new part !****************************************************/

const secret="ThisIsOurLittleSecret";  /*The key*/
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password']});
const User=mongoose.model("User",userSchema);

app.listen("3000",function(){
    console.log("Server started successfully at port 3000");
})

app.get("/",function(req,res){
    res.render("home");
})
app.get("/login",function(req,res){
    res.render("login");
})
app.get("/register",function(req,res){
    res.render("register");
})
// app.get("/secrets",function(req,res){
//     res.render("secrets");
// })

app.post("/login",function(req,res){
    User.findOne({email:req.body.username},function(err,foundUser){
        if(err){
            console.log(err);
        }
        else{
            if(foundUser){
                if(foundUser.password===req.body.password){
                    res.render("secrets");
                }
                else{
                    res.redirect("/login");
                }
            }
        }
    })
})
app.post("/register",function(req,res){
    const userNew=new User({
        email:req.body.username,
        password:req.body.password
    })
    userNew.save(function(err){
        if(!err){
            res.render("secrets");
        }
    });
})
