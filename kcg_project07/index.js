
$(function(){
    $("#next_game").click(function(){
        iframe = document.getElementById("game_box");
        iframe.contentWindow.clearMiniGame();
    });
});