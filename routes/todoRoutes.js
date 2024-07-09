const express=require('express');
const {register,
    Login,
    Logout,
    createTask,
    getTasks,
    updateTask
}=require('../controllers/taskControllers');
const router=express.Router();
router.post('/register',register);
router.post('/login',Login);
router.post('/logout',Logout);
router.post('/createTask',createTask);
router.get('/getTasks',getTasks);
router.put('/updateTask',updateTask);
module.exports=router;