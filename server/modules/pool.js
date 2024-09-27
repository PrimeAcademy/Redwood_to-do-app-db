// Connect to DB
const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
   database : 'weekend-to-do-app', // DB NAME not table!
    host: 'localhost',
    port: 5432,
    idleTimeoutMillis: 30000
})

pool.on('connect', () => {
    console.log('DB CONNECTED');
});

pool.on('error', (err) => {
    console.log('ERROR CONNECTING');
    console.log(err);
});

module.exports = pool;

