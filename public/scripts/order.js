$(document).ready(function() {

    const grid = new Muuri('.grid', {
        dragEnabled: true,
        dragAxis: 'y'
    })

    $(document).on('click', '.delete', function(e) {
        {
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
        }
    })

    $(document).on('click', '.return', function(e) {
        {
            console.log("start returning");
            var params = {
                order_id: $(this).val()
            }

            $.post("/returnOrder", params, function(result) {
                if (result && result.success) {
                    console.log("success!");
                    window.location.reload(true);
                } else {
                    console.log("failed!");
                    alert("Failed to return. Try again.");
                }
            })
        }
    })
});