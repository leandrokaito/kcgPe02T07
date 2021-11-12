<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>

<link rel="stylesheet" href="../reset.css">
<link rel="stylesheet" href="./css/score.css">

<script src="./js/jquery-2.1.3.js"></script>
<script src="./js/score.js"></script>

<body>
    <?php if(isset($_POST["name"], $_POST["score"])): ?>
        <!-- POSTリクエストを受け取ったときの処理 -->
        <?php 
            /* スコアに登録する情報 */
            $name = $_POST["name"]; //プレイヤー名
            $score = $_POST["score"]; //スコアの値

            $appendCsv = fopen("./score.csv", "a");
            $array = [$name, $score];
            fwrite($appendCsv, implode(",", $array) . "\n");
            fclose($appendCsv);

            $scoreCsv = fopen("./score.csv", "r"); //csvファイルの読み込み
            $num = 0;
            $playerData = array();
            $keys = array();

            $count = 0;
            while($line = fgetcsv($scoreCsv)){

                if($num == 0){
                    foreach($line as $data){
                        array_push($keys, $data);
                    }
                    $num++;
                }else{
                    $i = 0;
                    foreach($line as $data){
                        $playerData[$count][$keys[$i]] = $data;
                        $i++;
                    }
                    $count++;
                }
            }

            fclose($scoreCsv);

            //同位の順位平定
            function arrayCountByScore ($array) {
                $results = [];
                foreach ($array as $it) {
                    $key = (string)$it["score"];
                    if (!isset($results[$key])) $results[$key] = [];
                    $results[$key][] = $it;
                }
                return $results;
            }

            //ランキングソート
            usort($playerData, function ($a, $b) {
                $a2 = $a["score"];
                $b2 = $b["score"];
                if ($a2 == $b2) return 0;
                return ($a2 < $b2) ? 1 : -1;
            });
        ?>

        <table border="1">
            <?php for($i=0; $i < count($playerData); $i++): ?>
                <tr>
                    <?php if($i == 0): ?>
                        <th>プレイヤー名</th>
                        <th>スコア</th>
                        
                    <?php else: ?>
                        <?php foreach($playerData[$i] as $data): ?>
                            <td>
                                <?php echo($data) ?>
                            </td>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tr>
            <?php endfor; ?>
        </table>
        


        <h1><a href="./score.php">戻る</a></h1>

    <?php else: ?>

    <form action="./score.php" method="POST">
        <p>プレイヤー名を入力</p>
        <input type="text" id="player_name" value="テスト太郎" name="name"><br>
        <input type="text" id="player_score" value="5200" name="score"><br>
        <button id="send_button">登録</button>
    </form>
    <?php endif; ?>


</body>
</html>