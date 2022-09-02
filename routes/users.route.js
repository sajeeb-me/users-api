const express = require('express');
const usersController = require('../controllers/users.controller');

const router = express.Router();

router
    .route('/random')
    .get(usersController.getRandomUser);

router
    .route('/all')
    .get(usersController.getAllUsers);

router
    .route('/:id')
    .get(usersController.getUserDetails);


module.exports = router;