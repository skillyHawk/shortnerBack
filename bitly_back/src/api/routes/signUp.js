const express = require('express');
const router = express.Router();

const DataBaseHandler = require("../config/DataBaseHandler");
const dataBaseHandler = new DataBaseHandler();

const connection = dataBaseHandler.createConnection();

const jwtSecret = process.env.JWT_SECRET || "jwt_secret";
const saltRounds = process.env.SALT_ROUNDS || "10";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", (req, res, next) => {
    const formData = req.body;
    bcrypt.hash(formData.password, parseInt(saltRounds), (err, hash) => {
      formData.password = hash;
      const newUser = formData;
      connection.query("INSERT INTO User SET ?", [newUser], (err, results) => {
        if (err) {
            console.log(newUser)
          return res.status(400).send(err.sqlMessage);
        } else {
            newUser.password = undefined;
            newUser.idUser = results.insertId
            return res.status(201).send({
                User: newUser,
                token: jwt.sign(JSON.stringify(newUser), jwtSecret)
                });
            }
        });
    });
  });

module.exports = router;