const bcrypt = require('bcrypt');
const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const app=express();
const ejs=require("ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine",'ejs');
app.use(express.static("public"));
const saltRounds = 10;

mongoose.connect("mongodb://localhost:27017/securityDB",{useNewUrlParser: true,useUnifiedTopology: true});

const userSchema=new mongoose.Schema({
    email:String,
    password:String
})

/* We deleted process.env.SECRET and mongoose-encryption as well as dotenv modules***************/
/*Because we no longer need them as we are saving the password directly using hash password */
/* Also while checking we are using the has function i.e. converting req.body.password into hash first and the checking it */
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
                bcrypt.compare(req.body.password, foundUser.password, function(err, result) {
                    if(result == true ){
                        res.render("secrets");
                    }
                    else{
                        res.redirect("/login");
                    }
                });   
            }
        }
    })
})
app.post("/register",function(req,res){
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const userNew=new User({
            email:req.body.username,
            password:hash
        })
        userNew.save(function(err){
            if(!err){
                res.render("secrets");
            }
        });
    });
})
