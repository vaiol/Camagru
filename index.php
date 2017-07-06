<?php
session_start();
if ($_SESSION['user'] === null || $_SESSION['user'] == "") {
	header("Location: login.php?action=register#pop");
	exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Index</title>
    <link rel="stylesheet" type="text/css" href="style/main.css?v=<?=time();?>">
</head>
<body id="pop">
<div id="background"></div>
<header>
	<nav>
		<div class="main" onclick="window.location='index.php';">
			CAMAGRU
		</div>
		<div class="drop coral-1">
			<button class="menu coral-1" onclick="window.location='logout.php';">logout</button>
		</div>
	</nav>
</header>

<section id="content">
	<p id="create_label">Main Page:</p>
    <div id="info">
        <p>
            <?php
                if ($_GET['action'] == "registered") echo "User successfully registered! You can login!";
                else if ($_GET['action'] == "welcome") echo "WELCOME!!!";
			    else echo "143";
			?>
        </p>
    </div>
</section>
</body>
</html>