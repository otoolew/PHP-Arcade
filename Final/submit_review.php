<?php

$sql = "INSERT INTO reviews (review_user, review_date, review_comment) VALUES('" . $_SESSION['user_ID'] . "',NOW(),'" . $_POST['rating'] . "','" . $_POST['comment'] . "');";
$result = mysqli_query($connection, $sql);
if (!$result) {
    //something went wrong, display the error
    echo 'Error' . mysqli_error();
} else {
    header('Location: reviews.php');
}