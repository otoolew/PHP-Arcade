<?php
include 'header.php';
if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] == true) {
    $user_ID = $_SESSION["user_ID"];
    $user_name = $_SESSION["user_name"];
} else {
    header('Location: login.php');
}
?>

<div id="gameDiv">        
    <form action="scoreboard_spaceinvaders.php" method="post" id="myForm1">          
        <input type="hidden" id="user_ID" name="user_ID" value="<?php echo $user_ID ?>"/>
        <input type="hidden" id="user_name" name="user_name" value="<?php echo $user_name ?>"/>
        <input type="hidden" id="score" name="score" value="<?php $score ?>"/>
        <input type="submit" value="Sumit" style="display: none;"/>            
    </form>
    <div id="starfield"></div>
    <script src="scripts/spaceinvaders.js" type="text/javascript"></script> 
</div>
</div>';


