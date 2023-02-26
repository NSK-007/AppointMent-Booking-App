const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = require('./routes/appointmentRoutes');
const { Sequelize } = require('sequelize');
const sequelize = require('./utils/database');

app.use(cors());


app.use(bodyParser.json({extended:false}));


app.use(router);

sequelize
    .sync()
    .then(() => {
        app.listen(8080);
    })
    .catch(err => console.log(err))
