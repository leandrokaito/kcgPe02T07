<?php

?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>

<script src="../../../jQuery/jquery-2.1.3.js"></script>

<script>

    $(function(){
        let score;

        $("button").click(function(){
        let id = $(this).attr("id");

        switch(id){
            case "receive":
                let req = new XMLHttpRequest();

                req.open("get", "./score.csv", true);
                req.send(null);

                req.onload = function(){
                    // csvToArray(req.responseText);
                    let data = req.responseText;
                    let array = data.split("\n");
                    score = array;
                }
                alert(score);
                break;

            case "send":

                break;
        }
    }); 
    })

</script>

<body>
    <button type="button" id="receive">受信</button>
    <button type="button" id="send">送信</button>
</body>
</html>