function login() {
    var username = $("#username").val();
    var password = $("#password").val();

    console.log("username: " + username + " password: " + password);
    var x = location.host + "/toGo";

    var params = {
        username: username,
        password: password
    };

    $.post("/login", params, function(result) {
        if (result && result.success) {
            console.log("success!");
            console.log(x);
            location.href = '/toGo';
        } else {
            console.log("crab!");
            $("#error").html("username or password are incorrect.");
        }
    });
}

function logout() {
    $.post("/logout", function(result) {
        if (result && result.success) {
            $("#status").text("Successfully logged out.");
        } else {
            $("#status").text("Error logging out.");
        }
    });
}