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

    var clipboard = new ClipboardJS('.copy');

    clipboard.on('success', function(e) {
        console.log(e);
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
    });
    clipboard.on('error', function(e) {
        console.log(e);
    });

    var update = function() {
        var date = moment(new Date())
        $('#current_time').html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
    };
    update();
    setInterval(update, 1000);
});