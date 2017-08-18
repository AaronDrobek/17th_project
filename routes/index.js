const express = require("express");
const router = express.Router();

let user = {username: "doctorclaw"  ,password: "opensaysme"};

function authenticate(req, res, next){
  if (req.session.token) {
    res.redirect("/");
  } else {
    console.log("No token");
    next();
  }
}
// router.use("/public", express.static("public"));

router.get("/", function(req, res, next) {
  if (req.session.token) {
    next();
  } else {
    res.redirect("/login")
  }
}, function(req, res) {
  res.render("home", {user: req.session.username});
});

router.get("/login", function(req, res){
  res.render ("login");
})

// router.post("/", function(req, res) {
//   let obj = {
//     username: req.body.username,
//     password: req.body.password
//   };
//   if (obj.username == user.username && obj.password == user.password) {
//    req.session.user = obj;
//    req.session.token = "hjhhuioiejij3242324";
//    res.redirect("/login");
//  } else {
//    res.redirect("/");
//  }
// });

router.post('/login', function(req, res){
  console.log(req.body);

  req.checkBody("username", 'username must be 8 to 25 characters ').isLength({min:8, max:25});
  req.checkBody("username", "username cannot be empty.").notEmpty();
  req.checkBody("password", 'password minimum of 8 characters required').isLength({min:8, max:25});
  req.checkBody("password", "password cannot be empty.").notEmpty();
  req.checkBody("username", 'username cannot contain special characters ').isAlphanumeric();


  let errors = req.getValidationResult();
  let messages = [];

  errors.then(function(result) {
    result.array().forEach(function(error) {
      messages.push(error.msg);
    })
    let obj = {
      errors: messages,
      username: req.body.username,
      password: req.body.password,
    }

    console.log("messages:" + messages);
    console.log("messages.class:" + messages.constructor.name);
    console.log("messages.length:" + messages.length);
    if (obj.errors.length == 0){
      req.session.user = obj;
        req.session.token = "hjhhuioiejij3242324";
        res.redirect("/");


    }else{
      console.log(obj.errors.length, "the number of errors");
    }


    //
    // if (username == user.username && password == user.password) {
    //   req.session.user= obj;
    //   req.session.token = "ajlkjlkaj;ldkfj";
    //   res.redirect("/");
    // }else{
    res.render("error", obj);

    // }
    // console.log("errors");
    // } else {
    //
    //   req.session.username = req.body.username;
    //   // req.session.token = Math.floor(Math.random()* 1000000000);
    //   res.redirect("/");

    // }
  });
});
module.exports = router;
