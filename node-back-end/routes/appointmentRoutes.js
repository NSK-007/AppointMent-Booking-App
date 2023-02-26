const express = require('express');
const addAppointmentController = require('../controllers/add-appointment');

const router = express.Router();

router.post('/add-appointment', addAppointmentController.postAppointment);

module.exports = router;