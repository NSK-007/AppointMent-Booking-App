const express = require('express');
const AppointmentController = require('../controllers/appointment');

const router = express.Router();
router.get('/', AppointmentController.getAppointments);

router.post('/add-appointment', AppointmentController.postAppointment);


module.exports = router;