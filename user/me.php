<?php
include "users_data.php";
include "../util/whoami.php";
include "../product/products_data.php";
session_start();
if ($_SESSION['loggued_on_user'] == null || $_SESSION['loggued_on_user'] == "") {
	header("Location: login.php");
	exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>About Me</title>
    <link rel="stylesheet" type="text/css" href="../style/main.css">
</head>
<body id="msg">
<div id="background"></div>
<header>
    <nav>
        <div class="main" onclick="window.location='../index.php';">
            STORE
        </div>
        <div class="drop">
            <button class="menu" onclick="window.location='../index.php?type=Flower';">Flowers</button>
        </div>
        <div class="drop">
            <button class="menu" onclick="window.location='../index.php?type=Device';">Devices</button>
        </div>
        <div class="drop">
            <button class="menu" onclick="window.location='../product/cart.php';">Cart</button>
        </div>
        <div class="drop">
            <button class="menu" onclick="window.location='login.php';"><?php whoami()?></button>
        </div>
    </nav>
</header>
<section id="content">
    <p id="create_label">Login: <?php whoami()?></p>
    <div id="info">
        <p><?php if ($_GET['action'] == "success") echo "Password successfully changed!";
			else echo "143"?></p>
    </div>
    <button class="inline-button green" onclick="window.location='change_pass.php';">Change Password</button>
    <button class="inline-button red" onclick="window.location='../logout.php';">Logout</button>
    <div class="line"></div>
    <p class="labe">List of orders</p>
    <?php
    $allproducts = unserialize(file_get_contents("../db/products"));
    $array = get_orders($_SESSION['loggued_on_user']);
    foreach ($array as $key => $order) {
		$total = 0;
		foreach ($order['products'] as $pkey) {
			$total += $allproducts[$pkey]['price'];
        }
		$msg = $order['status'];
		if ($msg == "wait")
		    $msg = "Waiting for approvment!";
		else if ($msg == "closed")
			$msg = "Delivered!";
		else if ($msg == "inprocess")
			$msg = "In Process!";
        echo "<div class='product'>
            <div class='inline'>
                <p class='big coral'>Order: </p>
                <p>#".($key + 1)."</p>
            </div>
            <div class='inline'>
                <p class='big coral'>Total price: </p>
                <p>".$total."</p>
            </div>
            <div class='inline'>
                <p class='big coral'>Status: </p>
                <p>".$msg."</p>
            </div>
            </div>";
    }
    ?>

    <?php if (is_admin($_SESSION['loggued_on_user']) )
    echo "<button class=\"inline-button red\" onclick=\"window.location='../admin/admin.php';\">ADMIN PANEL!!!</button>";?>
    <div class="user_delim"></div>
</section>
</body>
</html>