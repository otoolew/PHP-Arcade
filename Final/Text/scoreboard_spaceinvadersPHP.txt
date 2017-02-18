
<?php
include 'header.php';
include 'savescore_spaceinvaders.php';
?>
<div class="scoreContent">
    <div class="scoreBar">
        <form action="spaceinvaders.php">
            <input class="btnCenter" type="submit" value="Play Again" />
        </form>
    </div> 
    <p class = "topScoreTitle">Space Invaders Score</p><br>
    <div class="scoreboard">       
        <table class= "tblScore" cellpadding="3">
            <thead>
            <th>Player</th>             
            <th>Score</th>
            </thead>
            <tbody>
                <td><?php echo $_SESSION['user_name']; ?></td>             
                <td><?php echo $_POST['score']; ?></td>
            </tbody>          
        </table>           
    </div>                                  
</div>

<?php
include 'footer.php';
?>