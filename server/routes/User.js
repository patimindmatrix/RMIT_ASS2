const express = require('express')
const { sequelize } = require('../models')
const { DataTypes } = require('sequelize')
const router = express.Router()
const { Users } = require('../models')
const bcryptjs = require('bcryptjs')

router.get("/", async (req, res) => {
    const listUsers = await Users.findAll();
    res.json(listUsers)
})

router.post("/", async (req, res) => {
    const user = req.body
    user.password = await bcryptjs.hash(user.password, 1);
    const result = await Users.create(user);
    res.send(result);
})

module.exports = router