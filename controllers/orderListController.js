const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL || "postgres://edjrblcydonapn:42e1f69ee902115d76f4acf357a35cb5576916a4417bf172c59565e6c8e12624@ec2-174-129-214-42.compute-1.amazonaws.com:5432/d7oveiplirdm04?ssl=true";
const pool = new Pool({ connectionString: connectionString });

function addToGo(req, res) {
    var result = req.body.order;
    console.log("Back from add Form:");
    console.log(result);

    if (result != null && Array.isArray(result)) {
        result.forEach(element => {
            console.log("Back from element:");
            console.log(element);
            Number(element);
            var sql = "UPDATE order_list SET staff_id = 2 WHERE id = " + element;
            pool.query(sql, function(err, result) {
                // If an error occurred...
                if (err) {
                    console.log("Error in query: ")
                    console.log(err);
                }
                // Log this to the console for debugging purposes.
                console.log("Updated");
            });
        })
    } else if (result != null) {
        console.log("Back from result:");
        console.log(result);
        Number(result);
        var sql = "UPDATE order_list SET staff_id = 2 WHERE id = " + result;
        pool.query(sql, function(err, result) {
            // If an error occurred...
            if (err) {
                console.log("Error in query: ")
                console.log(err);
            }
            // Log this to the console for debugging purposes.
            console.log("Updated");
        })
    }
    ownedList(req, res);
}

function ownedList(req, res) {
    var sql = "SELECT * FROM order_list WHERE (staff_id = 2)";
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
        res.render('pages/index', { "rowsjson": rowsjson });
    });
}


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
        res.render('pages/getOrder', { "rowsjson": rowsjson });
    });
}

module.exports = {
    addToGo: addToGo,
    getOrder: getOrder
};