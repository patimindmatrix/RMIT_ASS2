const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
router.get("/", async (req, res) => {
  const listUser = await Users.findAll();
  res.json(listUser);
});

router.post("/", async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  var usr = {
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt),
  };
  const user = await Users.findOne({
    where: {
      [Op.or]: [{ email: req.body.email }, { username: req.body.username }],
    },
  });

  if (user) {
    console.log(user);
    res.status(404).json(usr);
  } else {
    created_user = await Users.create(usr);
    res.status(201).json(created_user);
  }
});

router.post("/login", async (req, res, next) => {
  const user = await Users.findOne({ where: { email: req.body.email } });

  if (user) {
    const password_valid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (password_valid) {
      token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        "123213fdas"
      );
      res.status(200).json(user);
    } else {
      res.status(400).json({ error: "Password Incorrect" });
    }
  } else {
    res.status(404).json({ error: "User does not exist" });
  }
});

router.put("/update", async (req, res, next) => {
  const user = await Users.findOne({ where: { id: req.body.id } });
  const salt = await bcrypt.genSalt(10);
  if (user) {
    const user1 = await Users.findOne({
      where: {
        [Op.or]: [{ email: req.body.email }, { username: req.body.username }],
      },
    });
    if (user1) {
      res.status(404).json({ error: "User is exist" });
    } else {
      user.set({
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt),
      });
      res.status(200).json(user);
    }
  } else {
    res.status(404).json({ error: "User does not exist" });
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  Users.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(function (deletedRecord) {
      if (deletedRecord === 1) {
        res.status(200).json({ message: "Deleted successfully" });
      } else {
        res.status(404).json({ message: "record not found" });
      }
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

module.exports = router;
