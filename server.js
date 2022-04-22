require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const routes = require('./controllers/products')

// Middleware 
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use('/', routes)

mongoose.connect (process.env.DATABASE_URL)
mongoose.connection
  .on("connected", () => { console.log("Connected to mongoose!") })
  .on("close", () => { console.log("mongoose disconnected") })
  .on("error", (error) => { console.log(error) });







// LISTEN
app.listen(PORT, () => console.log(`You are listening to port: ${PORT}...`));