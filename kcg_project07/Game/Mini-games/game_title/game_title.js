/* 変数一覧 */
let gameList; //ゲームの一覧
let playIndex = 0; //現在プレイしているゲームの番数
let gameScore = 0; //ゲームのスコア
let decPoints = 0; //ミスした回数
const decScore = 100; //ミスによる減少値
const baseScore = 1000; //スコアの最低値
/*－－－－*/

/* 整数を分秒の値に分ける */
function convertTime(time){
    let min = Math.floor(time / 60);
    let sec = time % 60;
    
    let playTime = {
        min: min,
        sec: sec
    }

    return playTime;
}

/* プレイデータをリセットする */
function resetData(){
    playIndex = 0;
    gameScore = 0;
    decPoints = 0;
    playTime = 0;
}

/* ゲーム一覧のcsvファイル(game_list.csv)を取得する関数 */
function getGameList(){
    let req = new XMLHttpRequest();

    req.open("get", "../csv/game_list.csv", true);
    req.send(null);

    req.onload = function(){
        csvToArray(req.responseText);
    }
}

/* csvのデータを配列にconvertする。 */
function csvToArray(data){
    let array = data.split("\n");
    gameList = array;
}

/* 各ミニゲームにおけるスコアの集計 */
function scoreCal(){
    let material;
    if(playTime >= 300){
        material = 1;
    }else{
        material = 1 + ((600 - (playTime*2)) / 300);
    }
    gameScore += (baseScore * material);
}

/* 最終スコアからミスした分のスコアを減算 */
function scoreDec(){

    //ミスをしていた場合は減算
    if(decPoints != 0){
        let dec = decScore * decPoints;
        if(gameScore - dec > baseScore){
            gameScore -= dec;
        }else{
            gameScore = baseScore;
        }

    }else{
        //ミスがなかった場合はボーナス加算
        gameScore += baseScore;
    }

    gameScore = Math.floor(gameScore);
}

/* プレイデータの値をまとめて返す */
function returnScore(){
    let scoreData = {
        score: gameScore,
        miss: decPoints,
        time: playTime
    }

    return scoreData;
}

/* 次のゲームを遊ぶ */
function advanceGame(){
    let nextGame = gameList[playIndex];

    if(nextGame){
        //次に遊ぶゲームがある場合
        $("#game_screen").load(`./${nextGame}/`);
        playIndex++;
    }else{
        //次のゲームがない場合（全ゲームクリア）
        clearInterval(playTimeInterval);
        scoreDec();
        $("#game_screen").load("./Score/");
    }
}

/* 各ミニゲームをクリアしたときの処理 */
function clearMiniGame(){

    alert("Clear game number of " + playIndex);

    scoreCal();
    advanceGame();
}

/* 各ゲームでミスをしたときの処理 */
function missCounter(){
    decPoints++;
}

/* プレイ時間の計測 */
let playTimeInterval;
let playTime = 0;
function startGameTimer(){
    playTimeInterval = setInterval(function(){
        playTime++;
    }, 1000);
}

//音声(audio)を再生する関数
function playAudioInit(audio){
    audio.pause();
    audio.currentTime = 0;
    audio.play();
}

//初期化
$(function(){

    getGameList();

    $(".mode_selecter").click(function(){
        let id = $(this).attr("id");

        switch(id){
            case "main_mode_button":

                $("#title_screen").hide();
                $("#game_screen").show();

                advanceGame();
                startGameTimer();
                
                break;

            case "free_mode_button":

                alert("coming soon (FREE MODE)");

                break;
        }
    });

    $(document).on("click", ".selecter", function(){
        let selectSound = $("#select_sound").get(0);
        playAudioInit(selectSound);
    });

    $(document).on("click", "#finish_this_game", function(){
        clearMiniGame();
    });
});