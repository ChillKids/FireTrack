$(document).ready(function() {
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

    var frm = $('#insertForm');

    frm.submit(function(e) {

        e.preventDefault();

        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            success: function(data) {
                console.log('Submission was successful.');
                console.log(data);
                if (alert("Success")) {
                    window.location.reload();
                };

            },
            error: function(data) {
                console.log('An error occurred.');
                console.log(data);
                alert("failed to checkout. Please Try again")
            },
        });
    });
})