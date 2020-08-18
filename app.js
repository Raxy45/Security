require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const { hash } = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  session({
    secret: "ThisIsOurLittleSecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/securityDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  googleId: String,
  facebookId: String,
  secret: String,
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(
        profile
      ); /*The whole profile info is(i.e. googleid,name,etc) returned as JSON Object*/
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/oauth/facebook/mainpage",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

app.listen("3000", function () {
  console.log("Server started successfully at port 3000");
});

app.get("/", function (req, res) {
  res.render("home");
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
app.get(
  "/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/secrets");
  }
);
app.get("/oauth/facebook", passport.authenticate("facebook"));

app.get(
  "/oauth/facebook/mainpage",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/secrets");
  }
);

// End of oauth

app.get("/login", function (req, res) {
  res.render("login");
});
app.get("/logout", function (req, res) {
  req.logOut();
  res.redirect("/");
});
app.get("/register", function (req, res) {
  res.render("register");
});
app.get("/secrets", function (req, res) {
  if (req.isAuthenticated()) {
    User.find({ secret: { $ne: null } }, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          res.render("secrets", { secret: foundUser });
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/submit", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("submit");
  } else {
    res.redirect("/login");
  }
});
app.post("/submit", function (req, res) {
  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.secret = req.body.secret;
        foundUser.save(function (err) {
          if (!err) {
            res.redirect("/secrets");
          }
        });
      }
    }
  });
});
app.post("/login", function (req, res) {
  const userNew = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.logIn(userNew, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/secrets");
      });
    }
  });
});
app.post("/register", function (req, res) {
  User.register(
    { username: req.body.username, active: false },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/secrets");
        });
      }
    }
  );
});
