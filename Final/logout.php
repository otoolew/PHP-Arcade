<?php 
include 'header.php';
include 'footer.php';
session_unset();
$_SESSION['logged_in'] = false;
session_destroy();
header('Location: index.php');
