<?php
include 'database.php';
include 'header.php';
//if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] == true) {
$user_ID = $_SESSION["user_ID"];
$user_name = $_SESSION["user_name"];
//} else {
//    header('Location: login.php');
//}

$sql_user = "SELECT * FROM users WHERE user_ID = 4;";
$user_result = mysqli_query($connection, $sql_user);
$row_user = mysqli_fetch_assoc($user_result);

if ($_SERVER['REQUEST_METHOD'] != 'POST') {

    echo '<div id="computer">
        <form class="frmStyle" method="post" action="">
        <p class="formTitle">Edit User</p><br>
        <label class = "lblReg" for="user_name">Username: ></label><input class = "frmReg" type="text" name="user_name" value = "' . $user_name . '" />
        </br>
        <label class = "lblReg" for="user_email">E-mail: ></label><input class = "frmReg" type="email" name="user_email" value = "' . $row_user['user_email'] . '">
        </br>
        <div id="btnBar">
            <input type="submit" class="btnForm" name="submit" value="Submit" > 
        </div>
        </br>
     </form>
     </div>';
} else {
    $errors = array(); /* declare the array for later use */

    if (isset($_POST['user_name'])) {
        //the user name exists
        $name = $_POST['user_name'];
        if (!preg_match("/^[a-zA-Z ]*$/", $name)) {
            $errors['user_name'] = 'The username can only contain letters.';
        }
        if (strlen($_POST['user_name']) > 30) {
            $errors['user_name_length'] = 'The username cannot be longer than 30 characters.';
        }
    } else {
        $errors['empty_username'] = 'The username field must not be empty.';
    }
    if (!empty($errors)) /* check for an empty array, if there are errors, they're in this array (note the ! operator) */ {
        include 'error_message.php';
    } else {

        $sqlUserCheck = "SELECT user_name FROM users WHERE user_name='" . $_POST['user_name'] . "';";
        $check = mysqli_query($connection, $sqlUserCheck);
        $num = mysqli_num_rows($check);
        if ($num > 0) {
            echo'<div class="scoreboard">               
        </br>
            <label class="review-labelView">Error: </label></br>
            <p class = "viewComment"> That User Name is already taken.</p>        
        </br>
    </div>';
        } else {
            //$sql = "INSERT INTO users(user_name, user_password, user_email ,user_date, user_access) VALUES('" . $_POST['user_name'] . "','" . sha1($_POST['user_password']) . "','" . $_POST['user_email'] . "',NOW(),0);";
            $sql = "UPDATE users SET user_name='" . $_POST['user_name'] . "'WHERE user_ID = '" . $_SESSION['user_ID'] . "';";
            $result = mysqli_query($connection, $sql);
            if (!$result) {
                //something went wrong, display the error
                echo 'Something went wrong while registering. Please try again later.';
                echo mysql_error(); //debugging purposes, uncomment when needed
            } else {
                session_unset();
                $_SESSION['logged_in'] = false;
                session_destroy();
                header('Location: login.php');
            }
        }
    }
}
?>
</body>
</html>