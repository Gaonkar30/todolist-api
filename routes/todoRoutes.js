const express = require('express');
const {
  register,
  login,
  logout,
  createTask,
  getTasks,
  updateTask,
} = require('../controllers/taskControllers'); 

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/createTask', createTask);
router.get('/getTasks', getTasks);
router.put('/updateTask/:id', updateTask); 

module.exports = router;
