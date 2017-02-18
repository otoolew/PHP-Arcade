<?php
//Create the connection
//Use the Pitt server or for your local stack use "localhost"
$host = "localhost";
//$host = "sis-teach-01.sis.pitt.edu";
//Your Pitt username for the Pitt server and "root" for localhost
$user = "wbo4";
//Your PeopleSoft ID for the Pitt server and your password, if any, for localhost
$password = "";
//Name of your db - Pitt username for Pitt, and whatever you named it for local
$dbname = "wbo4";
$dbSuccess = false;
$connection = mysqli_connect($host, $user, $password, $dbname);
if (mysqli_connect_errno()) {
    die("Database connection failed: " .
            mysqli_connect_error() .
            " (" . mysqli_connect_errno() . ")"
    );
}else{
    $dbSuccess = true;
}