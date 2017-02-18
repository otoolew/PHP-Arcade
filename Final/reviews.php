<?php

include 'database.php';
include 'header.php';
if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] == true) {
    $user_ID = $_SESSION["user_ID"];
    $user_name = $_SESSION["user_name"];
} else {
    header('Location: login.php');
}


$ratings = "SELECT count(review_rating) AS total, SUM(review_rating)/count(review_rating) AS average FROM reviews;";
$ratings_result = mysqli_query($connection, $ratings);
$ratings_row = mysqli_fetch_assoc($ratings_result);
echo '<div class="scoreContent">            
    <p id="reviewTitleJAcked"> JAcked Reviews</p><br>
    <div class="scoreboard">
        <table class = "tblReview" cellpadding="3">
            <thead>
            <td>Reviews</td>             
            <td>Average Rating</td>
            </thead>
            <tbody>
                <tr>                            
                <td>' . $ratings_row['total'] . '</td>                     
                <td>' . $ratings_row['average'] . '</td>
                </tr>             
            </tbody>
        </table>
        </br>
        <div id = "reviewLink">
            <a class="btnForm" href="create_review.php" target="_blank" style="text-decoration: none;color: black;">Write a Review</a>
        </div>';

$reviews = "SELECT users.user_name, reviews.* FROM reviews INNER JOIN users ON reviews.review_user = users.user_ID GROUP BY user_name ORDER BY review_date DESC;";
$reviews_result = mysqli_query($connection, $reviews);

            
while ($reviews_row = mysqli_fetch_assoc($reviews_result)) {
    $reviews_row['review_date'] = date("m.d.y");
    echo'<div class="reviewContent">   
    <p class = "reviewTitle">Rating: ' . $reviews_row['review_rating'] . ' out of 5</p><br>      
    <div class="scoreboard">       
        <table class= "tblScore" cellpadding="3">
            <thead>
            <th>Date</th>             
            <th>User</th>
            </thead>
            <tbody>
            <td>' . $reviews_row['review_date'] . '</td>             
            <td>' . $reviews_row['user_name'] . '</td>
            </tbody>          
        </table> 
        </br>
            <label class="review-labelView">Comment: </label></br>
            <p class = "viewComment">' . $reviews_row['review_comment'] . '</p>        
        </br>
    </div>
    
</div>';
}
echo'</div>
</div>';
?>


