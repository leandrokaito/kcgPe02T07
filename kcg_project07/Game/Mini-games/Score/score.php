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
    <?php if(isset($_GET["name"], $_GET["score"])): ?>
        <!-- POSTリクエストを受け取ったときの処理 -->
        <?php 
            /* スコアに登録する情報 */
            $name = $_GET["name"]; //プレイヤー名
            $score = $_GET["score"]; //スコアの値
            $rank; //プレイヤーの順位(後の処理で取得)

            $appendCsv = fopen("./score.csv", "a"); //csvファイルへ書き込み
            $array = [$name, $score];
            fwrite($appendCsv, implode(",", $array) . "\n");
            fclose($appendCsv);

            sleep(0.5); //同期用
            /*
                書き込み後すぐにcsvファイルを読み込むと書き込み処理が間に合わずランキングデータがずれるため、
                同期代わりにsleep関数を使用し、0.5s処理を待たせています。
            */
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

            // //同位の順位平定
            // function arrayCountByScore ($array) {
            //     $results = [];
            //     foreach ($array as $it) {
            //         $key = (string)$it["score"];
            //         if (!isset($results[$key])) $results[$key] = [];
            //         $results[$key][] = $it;
            //     }
            //     return $results;
            // }
            //動作確認できず

            /* ランキングソート */
            usort($playerData, function ($a, $b) {
                $a2 = $a["score"];
                $b2 = $b["score"];
                if ($a2 == $b2) return 0;
                return ($a2 < $b2) ? 1 : -1;
            });

        ?>


        <!-- スコアをテーブルで表示 -->
        <table border="1" id="all_rank_list">
            <?php
                $maxView = 10; //ランキングの最大表示数(10位まで)

                $beforeRank = 0; //直前のプレイヤーの順位
                $beforeScore = 0; //直前のプレイヤーのスコア

                $setScore; //スコアを入れる変数
                $setRank; //順位を入れる変数
            ?>
            
            <?php for($i=0; $i < count($playerData); $i++): ?>


                <?php if($i == 0): ?>
                    <tr>
                        <th>順位</th>
                        <th>プレイヤー名</th>
                        <th>スコア</th>
                    </tr>
                    
                <?php else: ?>
                    
                    <?php
                        $setRank = $i;
                        $setName = $playerData[$i]["name"];
                        $setScore = $playerData[$i]["score"];
                        if($setScore == $beforeScore){
                            $setRank = $beforeRank;
                        }
                    ?>
                    <?php if($maxView > 0): ?>
                        <tr>
                            <td><?php echo($setRank); ?>位</td>
                            <td><?php echo($setName); ?></td>
                            <td><?php echo($setScore); ?></td>
                        </tr> 

                    <?php 
                        $maxView--;
                        endif;
                    ?>
                    <?php
                        $beforeRank = $setRank;
                        $beforeScore = $setScore;

                        if($setName == $name && $setScore == $score){
                            $rank = $setRank;
                        }
                    ?>

                <?php endif; ?>

            <?php endfor; ?>
        </table>
        
        <h1>あなたの順位</h1>
        <table border="1" id="my_score_data">
            <tr>
                <td><?php echo($rank); ?>位</td>
                <td><?php echo($name); ?></td>
                <td><?php echo($score); ?></td>
            </tr>
        </table>

    <?php else: ?>

    <form onsubmit="return false;">
        <p>プレイヤー名を入力</p>
        <input type="text" id="player_name" value="テスト太郎" name="name"><br>
        <button type="button" id="send_button">登録</button>
    </form>
    <?php endif; ?>


</body>
</html>