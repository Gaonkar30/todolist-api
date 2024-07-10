const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); 
const Task = require("../models/tasks"); 
const jwt = require("jsonwebtoken");

const salt = bcrypt.genSaltSync(10);
const secret = "asdfjioefr4io";

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userdoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userdoc);
  } catch (e) {
    res.status(500).json(e);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userdoc = await User.findOne({ username });
    if (!userdoc) {
      return res.status(400).json("Invalid credentials");
    }
    const userok = bcrypt.compareSync(password, userdoc.password);
    if (userok) {
      jwt.sign({ username, id: userdoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userdoc._id,
          username: userdoc.username,
        });
      });
    } else {
      res.status(400).json("Invalid credentials");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const logout = async (req, res) => {
  res.cookie("token", "").json("ok");
};

const createTask = async (req, res) => {
  try {
    const { task, status, date } = req.body;
    const token = req.cookies.token; 
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const taskdoc = await Task.create({
        task,
        status,
        date,
        userid: info.id, 
      });
      res.json(taskdoc);
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

const getTasks = async (req, res) => {
  res.json(await Task.find().populate("userid", ["username"]).limit(10));
};

const updateTask = async (req, res) => {
  try {
    const token = req.cookies.token; 
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const { id } = req.params;
      const { task, status, date } = req.body;
      const taskdoc = await Task.findById(id);
      if (taskdoc.userid.toString() === info.id) {
        // Verify task ownership
        await taskdoc.updateOne({ task, status, date });
        res.json(taskdoc);
      } else {
        res.status(403).json("Unauthorized");
      }
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = {
  register,
  login,
  logout,
  createTask,
  getTasks,
  updateTask,
};
