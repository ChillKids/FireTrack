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


})