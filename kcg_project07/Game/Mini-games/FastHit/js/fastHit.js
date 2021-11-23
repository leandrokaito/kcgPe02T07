

/* アニメーション関連 */
function personMove(person, key){
    switch(key){
        case "pop":
            person.addClass("poped");
            setTimeout(function(){
                person.css({
                    "width": "20rem",
                    "height": "20rem",
                    "top": 0,
                    "transform": "scale(1)"
                });
            }, 300);
            break;
        
        case "push":
            person.removeClass("poped").addClass("push");
            setTimeout(function(){
                person.css({
                    "width": 0,
                    "height": 0,
                    "top": "20rem",
                    "transform": "scale(0)"
                });
                person.removeClass("push");
            }, 300);
            break;
    }
}

$(function(){
    $("#play_screen").fadeIn(500);

    setTimeout(function(){
        personMove($(".tutorial .person"), "pop");
    }, 5000);

    $(document).on("mousemove","#play_screen", function(e){
        $("#aim_pointer").css({
            "top": `${e.clientY}px`,
            "left": `${e.clientX}px`,
            "transform": "none"
        });
    });

    $(document).on("click", ".poped", function(){
        personMove($(this), "push");
        return false;
    });
});