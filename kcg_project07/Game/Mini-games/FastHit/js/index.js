

$(function(){

    $("#front_view_box").fadeIn(500);
    $("#front_view").addClass("scale_up");

    setTimeout(function(){
        $("#front_view").fadeOut(500).css({
            width: "120%",
            height: "120%"
        });
        $("#shadow_frame #front_view").fadeIn(500);
    }, 2500);

});