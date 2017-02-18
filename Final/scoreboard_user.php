<?php
include 'header.php';
include 'database.php';
$ast_total = "SELECT SUM(ast_score) AS TotalScore FROM astroids WHERE astroids.ast_user = '" . $_SESSION['user_ID'] . "';";
$ast_best = "SELECT Max(ast_score) AS BestScore FROM astroids WHERE astroids.ast_user = '" . $_SESSION['user_ID'] . "';";

$si_total = "SELECT SUM(si_score) AS TotalScore FROM spaceinvaders WHERE spaceinvaders.si_user = '" . $_SESSION['user_ID'] . "';";
$si_best = "SELECT MAX(si_score) AS BestScore FROM spaceinvaders WHERE spaceinvaders.si_user = '" . $_SESSION['user_ID'] . "';";

$ast_result = mysqli_query($connection, $ast_total);
$ast_best_result = mysqli_query($connection, $ast_best);

$si_result = mysqli_query($connection, $si_total);
$si_best_result = mysqli_query($connection, $si_best);

if (mysqli_num_rows($ast_result) == 0) {
    echo '0 rows returned.';
} else {
    //display category data
    $si_row = mysqli_fetch_assoc($si_result);
    $ast_row = mysqli_fetch_assoc($ast_result);
    $si_best_row = mysqli_fetch_assoc($si_best_result);
    $ast_best_row = mysqli_fetch_assoc($ast_best_result);

    echo '<div class="scoreContent">            
    <p class="topScoreTitle"> ' . $_SESSION['user_name'] . '\'s Total Scores</p><br>
    <div class="scoreboard">
        <table class = "tblScore" cellpadding="3">
            <thead>
            <th>Game</th>             
            <th>Score</th>
            </thead>
            <tbody>
                <tr>
                <td>Space Invaders</td>             
                <td>' . $si_row['TotalScore'] . '</td>
                </tr>
                <tr>
                <td>Astroids</td>
                <td>' . $ast_row['TotalScore'] . '</td>
                </tr>             
            </tbody>
        </table>
        
        <p class="topScoreTitle">Best Round Scores</p><br>
        <table class= "tblScore" cellpadding="3">
            <thead>
            <th>Game</th>             
            <th>Score</th>
            </thead>
            <tbody>
                <tr>
                <td>Space Invaders</td>             
                <td>' . $si_best_row['BestScore'] . '</td>
                </tr>
                <tr>
                <td>Astroids</td>
                <td>' . $ast_best_row['BestScore'] . '</td>
                </tr>             
            </tbody>
        </table>    
    </div>                                  
</div>';
}
    


