<?php
require_once "API/user_functions.php";
session_start();
if ($_SESSION['user'] !== null && $_SESSION['user'] != "") {
	header("Location: index.php");
	exit;
} else if ($_POST['submit'] == "login") {
	$email = $_POST['email'];
	$password = $_POST['password'];
	$auth = false;
	if (($auth = auth($email, $password)) === true) {
		$_SESSION['user'] = $email;
		header("Location: index.php?action=welcome#pop");
		exit;
	} else if ($auth == 'active') {
		$_SESSION['user'] = "";
		header("Location: login.php?action=active#pop");
		exit;
	} else {
		$_SESSION['user'] = "";
		header("Location: login.php?action=error#pop");
		exit;
	}
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Index</title>
	<link rel="stylesheet" type="text/css" href="style/main.css?v=<?=time();?>">
    <script src="js/main.js"></script>
</head>
<body id="pop">
<div id="background"></div>
<header>
    <nav>
        <div class="logo" onclick="window.location='index.php';">
            CAMAGRU
        </div>
        <div class="drop coral-1">
            <button class="drop-button coral-1" onclick="window.location='logout.php';">USER</button>
            <div class="drop-content">
                <button class="drop-info">
                    COMMENTS:
                    <div class="inline">100</div>
                </button>
                <button class="drop-info">
                    LIKES:
                    <div class="inline">1020</div>
                </button>
                <button class="drop-button" onclick="window.location='logout.php';">LOGOUT</button>
            </div>
        </div>
    </nav>
</header>
<section id="content">
	<p id="create_label">Main Page:</p>
	<div id="popup">
		<p>
			<?php
				if ($_GET['action'] == "error") echo "Wrong Password or user doesn't exist! Try again!";
				else if ($_GET['action'] == "register") echo "Main page only for authorized user!";
				else if ($_GET['action'] == "active") echo "Please confirm your email address!";
				else echo "143";
			?>
		</p>
	</div>
	<form id="create_form" action="login.php" method="post">
		<div id="create_container">
			<div id="create_input">
				<p>Email:</p>
				<input type="text" name="email" value=""><br>
				<p>Password:</p>
				<input type="password" name="password" value=""><br>
			</div>
			<input class="create_button coral-1" name="submit" type="submit" value="login">
		</div>
	</form>
	<button class="button coral-1" onclick="window.location='registration.php';">Create Account</button>
    <button class="button" onclick="window.location='registration.php';">Forgot Password</button>
</section>
</body>
</html>
