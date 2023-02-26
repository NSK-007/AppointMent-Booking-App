const express = require('express');
const AppointmentController = require('../controllers/appointment');

const router = express.Router();
router.get('/', AppointmentController.getAppointments);

router.get('/appointmentData/:id', AppointmentController.getAppointmentById);

router.post('/add-appointment', AppointmentController.postAppointment);

router.put('/edit-appointment/:id', AppointmentController.editAppointment);

router.delete('/delete-appointment/:id', AppointmentController.deleteAppointment);



module.exports = router;