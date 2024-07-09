const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Task = require("../models/tasks");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const secret="asdfjioefr4io"
const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userdoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userdoc);
  } catch (e) {
    res.json(e);
  }
};
const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userdoc = await User.findOne({ username });
    const userok = bcrypt.compareSync(password, userdoc.password);
    if (userok) {
      jwt.sign({ username, id: userdoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userdoc._id,
          username: userdoc.username,
        });
      });
    }
  } catch (err) {
    res.json(err);
  }
};
const Logout=async(req,res)=>{
    res.cookie('token','').json('ok');
}
const createTask=async(req,res)=>{
    try{
        const{task,status,date}=req.body;
        jwt.verify(token,secret,{},(err,info)=>{
            if(err) throw err;
            return Task.create({
                task,
                status,
                date,
                user:info.id,
            });
            res.json('task created');
        })
        
    }
    catch(e){
        res.json(e);
    }
}
const getTasks=async(req,res)=>{
    res.json(await Task.find().populate('user',['username'])).limit(10)
};

const updateTask=async(req,res)=>{
    jwt.verify(token,secret,{},async(err,info)=>{
        if(err) throw err;
        const {id}=req.params;
        const{task,status,date}=req.body;
        const taskdoc=await Task.findOne({_id:id});
        await taskdoc.updateOne({task,status,date});
        res.json(taskdoc);
    })
}