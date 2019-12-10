$(document).ready(function() {
    $('#delete').click(function() {
        console.log("start deleting");
        var params = {
            order_id: $(this).val()
        }
        $.post("/deleteOrder", params, function(result) {
            if (result && result.success) {
                console.log("success!");
                window.location.reload(true);
            } else {
                console.log("failed!");
                alert("Failed to delete. Try again.");
            }
        })

    });

});