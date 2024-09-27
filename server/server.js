const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const taskRouter = require('./routes/task.router.js')

// Configures our server to read enviornment variable file (.env)
  // This will be inherited by the rest of your server.
require('dotenv').config()

console.log("Enviornment Variables:", process.env.PORT)

// Setup bodyParser - urlencoded for jQuery, json for axios/react - Postman can do either
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

// Setup static files
app.use( express.static( 'server/public' ) );

// Routes
// /task GET
// /task POST
// /task/:id DELETE
// /task/:id PUT
app.use('/task', taskRouter);

// Start listening
const PORT = process.env.PORT || 5001;
app.listen( PORT, () => {
  console.log( 'Listening on port', PORT );
})