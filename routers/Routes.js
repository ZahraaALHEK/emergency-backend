const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthControllers');
const shelterController = require('../controllers/ShelterControllers');


router.post('/addShelter', authController.protect, shelterController.post);
router.put('/addShelter', authController.protect, shelterController.put);