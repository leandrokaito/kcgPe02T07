

$(function(){

    $("#front_view_box").fadeIn(500);
    $("#front_view").addClass("scale_up");

    setTimeout(function(){
        $("#front_view").fadeOut(450);
        setTimeout(function(){
            $("#front_view").removeClass("scale_up").css({
                transform: "scale(3)"
            });
            $("#shadow_frame, #front_view").fadeIn(500);
            $("#front_view").addClass("slide_to_right");
            setTimeout(function(){
                $("#front_view_box").fadeOut(480);
                setTimeout(function(){
                    $("#load_box").load("./FastHit/fastHit.html");
                }, 500);
            }, 3500);
        }, 450);
    }, 2500);

});