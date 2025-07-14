const express = require("express");
const sendMail = require("../Utils/sendMailer.js");
const jwt = require("jsonwebtoken");
const USER = require("../Models/User.js");
const bcrypt = require("bcrypt");
const node_Cache = require("node-cache");
const isAuth = require("../Utils/Auth.js");
const passport = require('passport');
const router = express.Router();
const nodeCache = new node_Cache();

router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    if (await USER.findOne({ email })) {
      res.status(401).json({
        message: "user already exist",
      });
    } else {
      const password = await bcrypt.hash(req.body.password, 15);
      const createUser = await USER.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: password,
      });
      nodeCache.set("user", createUser);
      const token = createUser.createToken();
      res
        .status(201)
        .cookie("auth_token", token, {
          expires: new Date(Date.now() + 600000000 * 230),
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
        })
        .json({
          message: "User created",
          seccess: true,
        });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ///// login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await USER.findOne({ email }).select("+password");
    const passVerify = await user?.comparePassword(password);
    if (!user || !passVerify) {
      res.status(400).json({ message: "inValid" });
    } else {
      const token = user.createToken();
      res
        .status(201)
        .cookie("auth_token", token, {
          expires: new Date(Date.now() + 600000000 * 230),
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
        })
        .json({
          message: "User logged in",
          seccess: true,
          user,
        });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/// logout user
router.get("/logout", async (req, res) => {
  try {
    nodeCache.del("user");
    res
      .status(200)
      .cookie("auth_token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      })
      .json({
        message: "user logged out",
      });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// ///// logout user
router.get("/getuser", isAuth, async (req, res) => {
  try {
    if (nodeCache.has("user")) {
      const user = nodeCache.get("user");
      res.status(200).json({
        user,
      });
    } else if (await USER.findById(req.user)) {
      const user = await USER.findById(req.user);
      nodeCache.set("user", user);
      res.status(200).json({
        user,
      });
    } else {
      res.status(401).json({
        message: "User not found!",
      });
    }
  } catch (error) { }
})
  .patch("/user/changepassword", isAuth, async (req, res) => {
    const { password, newpassword, confirmpassword } = req.body;
    try {
      const user = await USER.findOne(req.user);
      const passVerify = await user.comparePassword(password);
      if (newpassword !== confirmpassword || !passVerify) {
        res.status(403).json({
          message: "confirm password is incorrect",
        });
      } else {
        const passwordhashed = await bcrypt.hash(newpassword, 12);
        user.password = passwordhashed;
        await user.save();
        res.status(201).json({
          message: "Password change",
          user,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  })
  .patch("/changerole", isAuth, async (req, res) => {
    const { email, key, role } = req.body;
    try {
      nodeCache.del("user");
      if (key === "naeem") {
        const user = await USER.findOne({ email });
        user.role = role;
        await user.save();
        res.status(200).json({
          message: "role changed",
        });
      } else {
        res.status(401).json({
          message: "unauthorize user!",
        });
      }
    } catch (error) { }
  })
  .post("/forgetpassword", async (req, res) => {
    const { email } = req.body;
    try {
      const user = await USER.findOne({ email });
      if (!user) {
        res.status(404).json({ message: "not found" });
      } else {
        sendMail(
          email,
          (phone = ""),
          (message = "hello this is forgit password emiail")
        );
        res.status(200).json({
          message: "found",
          user,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }).get('/oauth', passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    failureRedirect: "http://localhost:3000/login"
  })).get("/callback", passport.authenticate("google", { session: false }), (req, res) => {
    if (req.user) {
      res.cookie("auth_token", req.user.token,
        {
          expires: new Date(Date.now() + 600000000 * 234),
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/"
        })
      res.redirect(process.env.CLIENT_URL);
    }

  })

module.exports = router;
