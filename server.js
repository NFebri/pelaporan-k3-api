require('dotenv').config()
const express = require('express')
const authRoutes = require('./routes/auth')
const apiRoutes = require('./routes/api')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const app = express()
const logger = require('morgan')

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});
app.use('/api', authRoutes);
app.use('/api', apiRoutes);
app.use(express.static('public'))

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))