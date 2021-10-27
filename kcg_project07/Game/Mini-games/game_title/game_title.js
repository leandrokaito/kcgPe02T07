/* 変数一覧 */
let gameList; //ゲームの一覧
let playIndex = 0; //現在プレイしているゲームの番数
let gameScore = 0; //ゲームのスコア
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

/* スコアの集計 */
function scoreCal(){
    let material;
    if(playTime >= 300){
        material = 1;
    }else{
        material = 1 + ((600 - (playTime*2)) / 300);
    }
    gameScore += (baseScore * material);
}

/* 次のゲームを遊ぶ */
function advanceGame(){
    let nextGame = gameList[playIndex];

    if(nextGame){
        //次に遊ぶゲームがある場合
        $("#game_screen").load(`./${nextGame}/`,function(){
            /*追加・試し->Ferdi*/
            $.getScript("./WingyGirl/wingyCode.js") /*Wingy Girlのスクリプト読み込みテスト*/
        });
        startGameTimer();
        playIndex++;
    }else{
        //次のゲームがない場合（全ゲームクリア）
        alert(`all game complete!\nスコア＞【${Math.floor(gameScore)}】`); //とりあえず
    }
}

/* 各ミニゲームをクリアしたときの処理 */
function clearMiniGame(){
    clearInterval(playTimeInterval);

    alert("Clear game number of " + playIndex);

    scoreCal();
    advanceGame();
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
});