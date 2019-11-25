const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg')

const connectionString = process.env.DATABASE_URL || "postgres://edjrblcydonapn:42e1f69ee902115d76f4acf357a35cb5576916a4417bf172c59565e6c8e12624@ec2-174-129-214-42.compute-1.amazonaws.com:5432/d7oveiplirdm04?ssl=true";
const pool = new Pool({ connectionString: connectionString });

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .get('/getOrder', getOrder)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function getOrder(req, res) {
    var sql = "SELECT * FROM order_list WHERE (staff_id = 1)";
    console.log("result.rows");
    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }

        // Log this to the console for debugging purposes.
        console.log("Back from DB with result:");
        console.log(result.rows);
        rowsjson = result.rows;
        console.log(rowsjson);
        res.render('pages/getOrder', { "rowsjson": rowsjson });
    });

}