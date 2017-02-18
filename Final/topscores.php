<?php

include 'header.php';
include 'database.php';
//SELECT users.user_name, MAX(si_score) AS TopScore FROM spaceinvaders INNER JOIN users ON spaceinvaders.si_user = users.user_ID GROUP BY user_name ORDER BY MAX(si_score) DESC;
$si_best = "SELECT users.user_name, MAX(si_score) AS TopScore FROM spaceinvaders INNER JOIN users ON spaceinvaders.si_user = users.user_ID GROUP BY user_name ORDER BY MAX(si_score) DESC;";
$ast_best = "SELECT users.user_name, MAX(ast_score) AS TopScore FROM astroids INNER JOIN users ON astroids.ast_user = users.user_ID GROUP BY user_name ORDER BY MAX(ast_score) DESC;";

$si_result = mysqli_query($connection, $si_best);
$ast_result = mysqli_query($connection, $ast_best);

if (mysqli_num_rows($ast_result) == 0) {
    echo '0 rows returned.';
} else {
    //display category data
    echo '<div class="scoreBoardContent">            
    <p class = "topScoreTitle">Space Invaders Best Round</p><br>
    <div class="scoreboard">
        <table class = "tblScore" cellpadding="3">
            <thead>
            <th>Player</th>             
            <th>Score</th>
            </thead>
            <tbody>';
    while($si_row = mysqli_fetch_assoc($si_result)){
    echo '<tr>';
    echo '<td>' . $si_row['user_name'] . '</td>';
    echo '<td>' . $si_row['TopScore'] . '</td>';
    echo '</tr>';
    }

    echo'</tbody>
        </table>     
        <p class = "topScoreTitle">Astroids Best Round</p><br>
        <table class= "tblScore" cellpadding="3">       
            <thead>
            <th>Player</th>             
            <th>Score</th>
            </thead>
            <tbody>';
    while($ast_row = mysqli_fetch_assoc($ast_result)){
    echo '<tr>';
    echo '<td>' . $ast_row['user_name'] . '</td>';
    echo '<td>' . $ast_row['TopScore'] . '</td>';
    echo '</tr>';
    }
    echo'</tbody>
        </table>    
    </div>                               
</div>';
}
?>
</html>