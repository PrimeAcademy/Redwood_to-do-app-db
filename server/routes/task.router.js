const express = require('express');
//pool/pg
const pool = require('../modules/pool.js')

const router = express.Router();

// Routes
// /task GET
router.get('/', (req, res) => {
    //snag all the stuff in the DB
    // tasks
    // send back to client
    // ERROR -- log message, send 500

    const queryText = `SELECT * FROM "tasks" ORDER BY "isComplete";`;

    pool.query(queryText)
        .then(result => {
            console.log("Result from /tasks GET:", result.rows)
            res.send(result.rows);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })

});

// /task POST

router.post('/', (req, res) => {
    console.log("/task POST starting with data:", req.body)

    const queryText = `
        INSERT INTO "tasks" ("task")
	        VALUES ($1);
    `

    const queryParams = [req.body.name]

    pool.query(queryText, queryParams)
        .then((result) => {
            console.log("Succesfully completed POST to insert.")
            res.sendStatus(201)
        })
        .catch((err) => {
            console.log("Error with /task POST:", err)
            res.sendStatus(500)
        })

})

// /task/:id DELETE

router.delete('/:id', (req, res) => {
    console.log("DELETE on /tasks/:id with params:", req.params)

    const queryText = `
        DELETE FROM "tasks"
	        WHERE "id"=$1;
    `

    const queryParams = [req.params.id]

    pool.query(queryText, queryParams)
        .then((result) => {
            console.log("Success DELETE for id:", req.params.id)
            res.sendStatus(201)
        })
        .catch((err) => {
            console.log("Error with /task DELETE:", err)
            res.sendStatus(500)
        })
})

// /task/:id PUT
// localhost:5001/task/:id
// localhost:5001/task/1
// req.params.id
router.put('/:id', (req, res) => {
    console.log("req.params:", req.params)

    const queryText = `
        UPDATE "tasks" SET "isComplete"= NOT "isComplete" WHERE "id"=$1;
    `

    const queryParams = [req.params.id]

    pool.query(queryText, queryParams)
        .then((result) => {
            console.log("Successfully PUT on /task")
            res.sendStatus(201)
        })
        .catch((err) => {
            console.log("Error with /task PUT:", err)
            res.sendStatus(500)
        })


});


module.exports = router;