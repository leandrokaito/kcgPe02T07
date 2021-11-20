
$(function(){
    $("#play_screen").fadeIn(500);

    $("#play_screen").on("mousemove", function(e){
        $("#aim_pointer").css({
            "top": `${e.clientY}px`,
            "left": `${e.clientX}px`
        });
    });
});