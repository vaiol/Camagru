<?php
include "users_data.php";
include "../util/whoami.php";
session_start();
if ($_SESSION['loggued_on_user'] == null || $_SESSION['loggued_on_user'] == "") {
	header("Location: login.php");
	exit;
}
if ($_POST['submit'] == "OK") {
	$oldpw = $_POST['oldpw'];
	$newpw = $_POST['newpw'];
	header("Location: change_pass.php?action=error");
	if (change_pass($_SESSION['loggued_on_user'], $oldpw, $newpw)) {
		header("Location: me.php?action=success#msg");
    } else {
		header("Location: change_pass.php?action=error#msg");
    }
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Change Password</title>
	<link rel="stylesheet" type="text/css" href="../style/main.css">
</head>
<body id="msg">
<div id="background"></div>
<header>
    <nav>
        <div class="logo" onclick="window.location='../index.php';">
            STORE
        </div>
        <div class="drop">
            <button class="drop-button" onclick="window.location='../index.php?type=Flower';">Flowers</button>
        </div>
        <div class="drop">
            <button class="drop-button" onclick="window.location='../index.php?type=Device';">Devices</button>
        </div>
        <div class="drop">
            <button class="drop-button" onclick="window.location='../product/cart.php';">Cart</button>
        </div>
        <div class="drop">
            <button class="drop-button" onclick="window.location='login.php';"><?php whoami()?></button>
        </div>
    </nav>
</header>
<section id="content">
	<p id="create_label">Change password:</p>
    <div id="popup">
        <p><?php if ($_GET['action'] == "error") echo "Wrong Password! Try again!";
			else echo "143"?></p>
    </div>
	<form id="create_form" action="change_pass.php" method="post">
		<div id="create_container">
			<div id="create_input">
				<p>Old password:</p>
				<input type="password" name="oldpw" value=""><br>
				<p>New password:</p>
				<input type="password" name="newpw" value=""><br>
			</div>
			<input id="create_button" name="submit" type="submit" value="OK">
		</div>
	</form>
</section>

</body>
</html>