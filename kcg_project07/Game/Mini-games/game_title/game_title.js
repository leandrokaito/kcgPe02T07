let gameList;

function getGameList(){
    let req = new XMLHttpRequest();

    req.open("get", "../csv/game_list.csv", true);
    req.send(null);

    req.onload = function(){
        csvToArray(req.responseText);
        alert("処理を終了")
    }
}

function csvToArray(data){
    let array = data.split("\n");

    alert(array)
}

//初期化
$(function(){
    $(".mode_selecter").click(function(){
        let id = $(this).attr("id");

        switch(id){
            case "main_mode_button":

                getGameList();

                break;

            case "free_mode_button":

                alert("this is a Free")

                break;
        }
    });
});