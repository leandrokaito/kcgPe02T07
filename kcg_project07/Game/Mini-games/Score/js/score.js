let playerScore;

function getParam(){
    let param = window.location.search.substring(1);

    param = param.split("=");
    
    return param[1];
}

$(function(){
    playerScore = getParam();
    
    $(document).on("click", "#send_button", function(){
        let playerName = $("#player_name").val();

        location.href = `./score.php?name=${playerName}&score=${playerScore}`;
});
});