/* 変数一覧 */
let gameList; //ゲームの一覧
let playIndex = 0; //現在プレイしているゲームの番数
let gameScore = 0; //ゲームのスコア
let decPoints = 0; //ミスした回数
const decScore = 250; //ミスによる減少値
const baseScore = 1000; //スコアの最低値
/* －－－－*/



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

//最終スコアからミスした分のスコアを減算
function scoreDec(){

    //ミスをしていたときの減算処理
    if(decPoints != 0){
        let dec = decScore * decPoints;
        if(gameScore - dec > baseScore){
            gameScore -= dec;
        }else{
            gameScore = baseScore;
        }

        decPoints = 0;
    }
}

/* 次のゲームを遊ぶ */
function advanceGame(){
    let nextGame = gameList[playIndex];

    if(nextGame){
        //次に遊ぶゲームがある場合
        $("#game_screen").load(`./${nextGame}/`);
        startGameTimer();
        playIndex++;
    }else{
        //次のゲームがない場合（全ゲームクリア）
        let miss = decPoints;
        scoreDec();
        alert(`all game complete!\nスコア＞【${Math.floor(gameScore)}】\nミスした回数＞【${miss}回】`); //とりあえず
    }
}

/* 各ミニゲームをクリアしたときの処理 */
function clearMiniGame(){
    clearInterval(playTimeInterval);

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

//初期化
$(function(){

    getGameList();

    $(".mode_selecter").click(function(){
        let id = $(this).attr("id");

        switch(id){
            case "main_mode_button":
                alert("clicked MAIN MODE")

                $("#title_screen").hide();
                $("#game_screen").show();

                advanceGame();

                break;

            case "free_mode_button":

                alert("coming soon (FREE MODE)");

                break;
        }
    });

    $(document).on("click", "#finish_this_game", function(){
        clearMiniGame();
    });

    $(document).on("click", "#miss_button", function(){
        missCounter();
    });
});