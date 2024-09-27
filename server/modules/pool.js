// Connect to DB
const pg = require('pg');

let pool;
// ! Need to require dotenv if you want to use environment variable to use cloud DB on locally running app.
// require('dotenv').config()

// * If there is an existing DATABASE_URL, then use it...
if (process.env.DATABASE_URL) {
     console.log("DATABASE_URL EXISTS!")
    // Use render database.
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })
} else {
    console.log("DATABASE_URL NOT EXISTS!, ", process.env.DATABASE_URL)
    pool = new pg.Pool({
        database : 'weekend-to-do-app', // DB NAME not table!
        host: 'localhost',
        port: 5432,
        idleTimeoutMillis: 30000
    })

}


/// ================

pool.on('connect', () => {
    console.log('DB CONNECTED');
});

pool.on('error', (err) => {
    console.log('ERROR CONNECTING');
    console.log(err);
});

module.exports = pool;

