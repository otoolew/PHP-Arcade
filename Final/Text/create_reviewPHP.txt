<?php
include 'database.php';
include 'header.php';
if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] == true) {
    $user_ID = $_SESSION["user_ID"];
    $user_name = $_SESSION["user_name"];
}else{
    header('Location: login.php');
}
//$sql = "INSERT INTO reviews(review_user, review_date, review_rating, review_comment) VALUES('" . $_SESSION['user_name'] . "',NOW(),'" . $_POST['review_rating'] . "','" . $_POST['review_comment'] . "');";

if ($_SERVER['REQUEST_METHOD'] != 'POST') {    
    echo'<div class="scoreContent">   
        <p class = "topScoreTitle">Write Review</p><br>
        <form id = "reviewForm" method="post" action=""> 
            
            <label class="review-label">Rating: </label>

            <input class="radio-input" type="radio" name="rating" value="1" />
            <label class="review-label">1</label>

            <input class="radio-input" type="radio" name="rating" value="2" />
            <label class="review-label">2</label>

            <input class="radio-input" type="radio" name="rating" value="3" />
            <label class="review-label">3</label>

            <input class="radio-input" type="radio" name="rating" value="4" />
            <label class="review-label">4</label>

            <input class="radio-input" type="radio" name="rating" value="5" checked/>
            <label class="review-label">5</label> 
            </br>
            <p></p>
            </br>
            <label class="review-label">Comment: </label></br>
            <textarea class = "reviewComment" name = "comment" rows="4" cols="50" form = "reviewForm" ></textarea>
            </br>
            <p></p>
            </br>
            <input type="submit" class="btnForm" name="submit" value="Submit"> 
        </form>    
    </div>';
} else {

    //the form has been posted, so save it
    //// $sql = "INSERT INTO users(user_name, user_password, user_email ,user_date, user_access) VALUES('" . $_POST['user_name'] . "','" . sha1($_POST['user_password']) . "','" . $_POST['user_email'] . "',NOW(),0);";
    // INSERT INTO categories (category_name, category_desc) VALUES('Games','Discussion about games');
    
    //INSERT INTO reviews(review_user, review_date, review_rating, review_comment) VALUES('Test',NOW(),'5','Needs more skills');
    $sql = "INSERT INTO reviews (review_user, review_date, review_rating, review_comment) VALUES('" . $_SESSION['user_ID'] . "',NOW(),'" . $_POST['rating'] . "','" . $_POST['comment'] . "');";
    $result = mysqli_query($connection, $sql);
    if (!$result) {
        //something went wrong, display the error
        echo 'Error' . mysqli_error($connection);
    } else {
        header('Location: reviews.php');
    }
}
?>