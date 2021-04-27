jQuery(document).ready(function($) {

    document.getElementById("button").addEventListener("click", () => {

        $.ajax({
            url: "/gamestatus",
            method: "POST",
            data: {
                game: 5
            },
            success: function(data) {
                console.log(data);
            }
        });

    });

});