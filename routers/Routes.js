const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthControllers');
const shelterController = require('../controllers/ShelterControllers');


router.post('/shelters', authController.protect, shelterController.post);
router.put('/shelters/:id', authController.protect, shelterController.put);
router.delete('/:id', authController.protect, shelterController.deleteShelter);
router.get('/:id', authController.protect, shelterController.getShelter);