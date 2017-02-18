<?php

include 'database.php';

$sql = "INSERT INTO spaceinvaders(si_user, si_score, si_date) VALUES('" . $_SESSION['user_ID'] . "','" . $_POST['score'] . "',NOW());";

$result = mysqli_query($connection, $sql);
if (!$result) {
    //something went wrong, display the error
    echo 'DB Error.';
    //echo mysql_error(); //debugging purposes, uncomment when needed
} else {
    echo 'Successfully saved.';
}

