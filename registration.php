<?php
session_start();
if ($_SESSION['loggued_on_user'] != null && $_SESSION['loggued_on_user'] != "") {
	header("Location: ../index.php");
	exit;
} else if ($_POST['submit'] == "OK") {
	$login = $_POST['login'];
	$pass = $_POST['passwd'];
	if ($pass == null || $pass == "") {
		header("Location: registration.php?action=error#pop");
		exit;
	}
    if (!add_user($login, $pass)) {
		header("Location: registration.php?action=exist#pop");
		exit;
    }
	header("Location: ../index.php?action=registered#pop");
	exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Registration</title>
    <link rel="stylesheet" type="text/css" href="style/main.css?v=<?=time();?>">
</head>
<body id="pop">
<div id="background"></div>
<header>
    <nav>
        <div class="main" onclick="window.location='index.php';">
            CAMAGRU
        </div>
        <div class="drop">
            <button class="menu" onclick="window.location='logout.php';">logout</button>
        </div>
    </nav>
</header>
<section id="content">
	<p id="create_label">Registration:</p>
    <div id="info">
        <p><?php if ($_GET['action'] == "error") echo "Wrong Password! Try again!";
			else if ($_GET['action'] == "exist") echo "User exist!";
			else echo "143"?></p>
    </div>
	<form id="create_form" action="registration.php" method="post">
		<div id="create_container">
			<div id="create_input">
				<p>Login:</p>
				<input type="text" name="login" value=""><br>
				<p>Password:</p>
				<input type="password" name="passwd" value=""><br>
			</div>
			<input id="create_button" name="submit" type="submit" value="OK">
		</div>
	</form>
</section>
</body>
</html>