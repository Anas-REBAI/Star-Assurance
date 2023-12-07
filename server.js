// import "express" module
const express = require('express');
// import "body-parser" module
const bodyParser = require('body-parser');
// import "mongoose" module
const mongoose = require('mongoose');
// import "routes"
const userRouter = require('./backend/routes/user-route');

// creates express application (app)
const app = express();
// app configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
// DataBase
const databaseName = 'assurance';
const db_url = process.env.DB_URL || `mongodb://127.0.0.1:27017`;
mongoose
  .connect(`${db_url}/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

// path
app.use('/user', userRouter);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});