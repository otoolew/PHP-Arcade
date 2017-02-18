<?php
include 'database.php';
include 'header.php';
function check_input($data) {
    $raw = $data;
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);

    if ($raw == $data) {
        return true;
    } else {
        return false;
    }
}

if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] == true) {
    echo 'You are already signed in, you can <a href="logout.php">sign out</a> if you want.';
} else {
    if ($_SERVER['REQUEST_METHOD'] != 'POST') {
        echo '<div id="computer">
        <form class="frmStyle" method="post" action="">
        <p class="formTitle">Sign In!</p><br>
        <label class = "lblReg" for="user_name">Username: ></label><input class = "frmReg" type="text" name="user_name" />
        </br>
        <label class = "lblReg" for="user_password">Password: ></label><input class = "frmReg" type="password" name="user_password">
        </br>              
        <div id="btnBar">           
            <input type="submit" class="btnForm" name="submit" value="Submit" > 
        </div>
        </br>
     </form>
     </div>';
    } else {       
        
        if (!(check_input($_POST['user_name'])&&check_input($_POST['password']))) {
            header('Location: error_login.php');
        }else {
            
            $sql = "SELECT user_ID, user_name, user_access FROM users WHERE user_name = '" . $_POST['user_name'] . "' AND user_password = '" . sha1($_POST['user_password']) . "';";

            $result = mysqli_query($connection, $sql);
            if ($result) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $_SESSION['user_ID'] = $row[user_ID];
                    $username = $_SESSION['user_name'] = $row[user_name];
                    $_SESSION['user_password'] = $row[user_password];
                    $_SESSION['logged_in'] = true;
                    header('Location: index.php');
                }
            } else {
                $_SESSION['logged_in'] = false;
                header('Location: error_login.php');
            }
        }
        if ($_SESSION['logged_in'] == false){
            header('Location: error_login.php');
        }
    }
}
?>