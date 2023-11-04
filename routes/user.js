const express = require('express');
const router = express.Router();

const { register, login, getUserByName } = require('../controllers/user');

router.post('/register', register);
router.post('/login', login);
router.get('/:username', getUserByName);



module.exports = router;
