<?php
include 'session.php';
echo '<!DOCTYPE HTML>
<html>
<head>
<meta charset = "UTF-8">
<title>Arcade Knights</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="scripts/helpers.js" type="text/javascript"></script>      
<link href="css/main.css" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Allerta+Stencil"rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet" type="text/css">
</head>
<body>
<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="index.php">Arcade Knights</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
        <li><a href="topscores.php">Top Score Boards</a></li>
        <li><a href="spaceinvaders.php">Space Invaders</a></li>
        <li><a href="astroids.php">Astroids</a></li>
        <li><a href="jacked.php">JAcked!</a></li> 
        <li><a href="reviews.php">Game Reviews</a></li>
      </ul>';

if (isset($_SESSION['logged_in'])&& $_SESSION['logged_in']) {
    echo '<ul class="nav navbar-nav navbar-right">
    
        <li><a href="scoreboard_user.php"><span class="glyphicon glyphicon-user"></span> Hello ' . $_SESSION['user_name'] . '</a></li>
        <li><a href="edit_user.php"><span class="glyphicon glyphicon-wrench"></span> Edit</a></li>
        <li><a href="logout.php"><span class="glyphicon glyphicon-log-in"></span> Log Out</a></li>
      </ul>';
} else {
    echo '<ul class="nav navbar-nav navbar-right">
        <li><a href="register.php"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
        <li><a href="login.php"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
      </ul>';
}
echo '   </div>
  </div>
</nav>
<body>';

