const pool = require("./db");
const query = require("./query");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();

const register = (req, res) => {
  const { name, email, pass } = req.body;
  pool.query(query.registerUser, [name, email, pass], (error, result) => {
    if (error) {
      console.error("Error during registration:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.status(200).json(result.rows);
  });
};

const login = (req, res) => {
  const { email, pass } = req.body;
  pool.query(query.logInPassCheck, [email], (error, result) => {
    if (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.rows.length !== 0) {
      const user = result.rows[0];
      const token = jwt.sign(user, process.env.ACCESS_TOKEN);
      if (user.password === pass) {
        res.status(200).json({ message: "logsuccess", user: user, token: token });
      } else {
        res.status(401).json({ message: "Wrong Password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
};

const getBooks = (req, res) => {
  const userEmail = req.user.email;
  if (userEmail) {
    pool.query(query.getBookInfo, [userEmail], (error, result) => {
      if (error) {
        console.error("Error fetching books:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.rows.length !== 0) {
        res.status(200).json({ result: result.rows });
      } else {
        res.json({ message: "No Books", result: [] });
      }
    });
  } else {
    res.json({result:[ ] });
  }
};

const addBook = (req, res) => {
  const userEmail = req.user.email;
  const { name, author, description } = req.body;
  pool.query(query.addBook, [name, author, description, userEmail], (error, result) => {
    if (error) {
      console.error("Error adding book:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.status(200).json(result.rows);
  });
};

const deleteBook = (req, res) => {
  const { id } = req.body;
  pool.query(query.deleteBook, [id], (error, result) => {
    if (error) {
      console.error("Error deleting book:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.status(200).json(result.rows);
  });
};

const updateBook = (req, res) => {
  const { name, author, description, id } = req.body;
  pool.query(query.updateBook, [name, author, description, id], (error, result) => {
    if (error) {
      console.error("Error updating book:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.status(200).json(result.rows);
  });
};

const verifyUser = (req, res, next) => {
  const accessTokenHeader = req.headers["authorization"];

  if (!accessTokenHeader) {
    return res.sendStatus(401);
  }

  const accessToken = accessTokenHeader.split(" ")[1];

  if (!accessToken) {
    return res.json("Unauthorized");
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid or expired access token");
    }
    req.user = user;
    next();
  });
};

module.exports = {
  getBooks,
  addBook,
  deleteBook,
  updateBook,
  register,
  login,
  verifyUser,
};
