let score;
let miss;
let time;

function setPlayData(pd){
    score = pd.score;
    miss = pd.miss;
    time = convertTime(pd.time);

    $("#miss_count").text(miss);

    if(time.min > 0){
        $("#clear_time").append(`${String(time.min)}分`);
    }
    $("#clear_time").append(` ${String(time.sec)}秒`);

    $("#play_score_box").text(score);
}

$(function(){
    let pd = returnScore();
    setPlayData(pd);

    $(document).on("click", "#score_entry_button", function(){
        $("#play_score_view").fadeOut(1000);
        $("#score_frame").attr("src", `./Score/score.php?playerScore=${score}`);
        $("#score_box, #score_box *").fadeIn(1000);
    });

    $(document).on("click", "#back_to_title", function(){
        resetData();
        $(document).off();
        $("#game_screen").fadeOut(3000)
        setTimeout(function(){
            $("#title_screen").fadeIn(3000);
            $("#game_screen").html("");
        }, 3000);
    });
});