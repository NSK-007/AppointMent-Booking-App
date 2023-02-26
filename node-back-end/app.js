const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = require('./routes/appointmentRoutes');

app.use(cors());


app.use(bodyParser.json({extended:false}));


app.use(router);
app.listen(8080);