<?php
//register.php
include 'database.php';
include 'header.php';

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    echo '<div id="computer">
        <form class="frmStyle" method="post" action="">
        <p class="formTitle">Enlist Today!</p><br>
        <label class = "lblReg" for="user_name">Username: ></label><input class = "frmReg" type="text" name="user_name" />
        </br>
        <label class = "lblReg" for="user_password">Password: ></label><input class = "frmReg" type="password" name="user_password">
        </br>
        <label class = "lblReg" for="user_pass_check">Password Confirm: ></label><input class = "frmReg" type="password" name="user_pass_check">
        </br>
        <label class = "lblReg" for="user_email">E-mail: ></label><input class = "frmReg" type="email" name="user_email">
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
        $name = $_POST['user_name'];
        if (!preg_match("/^[a-zA-Z ]*$/", $name)) {
            $errors[] = 'The username can only contain letters and digits.';
        }
        if (strlen($_POST['user_name']) > 30) {
            $errors[] = 'The username cannot be longer than 30 characters.';
        }
    } else {
        $errors[] = 'The username field must not be empty.';
    }


    if (isset($_POST['user_password'])) {
        if ($_POST['user_password'] != $_POST['user_pass_check']) {
            $errors[] = 'The two passwords did not match.';
        }
    } else {
        $errors[] = 'The password field cannot be empty.';
    }

    if (!empty($errors)) /* check for an empty array, if there are errors, they're in this array (note the ! operator) */ {
        echo 'Errors in fields';
        echo '<ul>';
        foreach ($errors as $key => $value) /* walk through the array so all the errors get displayed */ {
            echo '<li>' . $value . '</li>'; /* this generates a nice error list */
        }
        echo '</ul>';
        header('Location: error_register.php');
    } else {
        
        $sqlUserCheck = "SELECT user_name FROM users WHERE user_name='" . $_POST['user_name'] . "';";
        $check = mysqli_query($connection, $sqlUserCheck);
        $num = mysql_num_rows($check);
        if($num>0){
            header('Location: error_register.php');
        }else{
           $sql = "INSERT INTO users(user_name, user_password, user_email ,user_date, user_access) VALUES('" . $_POST['user_name'] . "','" . sha1($_POST['user_password']) . "','" . $_POST['user_email'] . "',NOW(),0);";

            $result = mysqli_query($connection, $sql);
            if (!$result) {
                //something went wrong, display the error
                echo 'Something went wrong while registering. Please try again later.';
                echo mysql_error(); //debugging purposes, uncomment when needed
            } else {
                header('Location: login.php');
            } 
        }             
    }
}
?>