const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const taskRouter = require('./routes/task.router.js')

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
const PORT = 5001;
app.listen( PORT, () => {
  console.log( 'Listening on port', PORT );
})