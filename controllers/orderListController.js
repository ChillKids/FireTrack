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
            var sql = "UPDATE order_list SET staff_id = " + req.session.user.user_id + "WHERE id = " + element;
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
        var sql = "UPDATE order_list SET staff_id =" + req.session.user.user_id + " WHERE id = " + result;
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
    if (!req.session.user) {
        res.redirect('/login');
    }
    var id = req.session.user.user_id;
    console.log('id: ' + id);
    var sql = "SELECT * FROM order_list WHERE staff_id =" + id;
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

function login(req, res) {
    console.log("I logined !!!!!!");
    console.log("start");
    var username = req.body.username;
    var password = req.body.password;
    console.log("name :" + username + "password" + password);

    var sql = "SELECT password, id FROM staff_info WHERE name = '" + username + "'";
    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        // Log this to the console for debugging purposes.
        if (result.rows.length >= 1 && password == result.rows[0].password) {
            console.log("right password");
            var user_id = result.rows[0].id;
            var session = req.session;
            console.log("user_id" + user_id);
            var user = { user_id: user_id, user_name: username };
            session.user = user;
            console.log("session_user: " + session.user.user_id);
            var result = { success: true };
            res.json(result);
            res.end();
        } else {
            console.log("wrong password");
            var result = { success: false };
            res.json(result);
        }

    });

}

function logout(req, res) {
    if (req.session.id && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
}

function deleteOrder(req, res) {
    order_id = req.body.order_id;
    var sql = "DELETE FROM order_list WHERE id =" + order_id;
    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
            var result = { success: false };
            res.json(reselt);
        }
        // Log this to the console for debugging purposes.
        console.log("Deleted!");
        var result = { success: true };
        res.json(result);


    });
}

module.exports = {
    addToGo: addToGo,
    getOrder: getOrder,
    login: login,
    logout: logout,
    deleteOrder: deleteOrder
};