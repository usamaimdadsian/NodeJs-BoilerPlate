require('module-alias')('../package.json')
require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const { getSecret } = require('./secrets');
const {usersRoute,projectsRoute} = require('@/routes')

mongoose.Promise = global.Promise;
mongoose.connect(getSecret('dbUri'),{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false })
.then(
  () => {
    console.log('Connected to mongoDB');
  },
  (err) => console.log('Error connecting to mongoDB', err)
);

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
// app.use(cookieParser());
app.use(cors({origin: '*'}));

// Routes
app.use('/api/users', usersRoute);
app.use('/api/projects', projectsRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { app };
