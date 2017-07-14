<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>IP</title>
    <link rel="stylesheet" type="text/css" href="style/ip.css?v=<?=time();?>">
</head>
<body class="Site">
<header>
    <button onclick="w3_open()" class="w3-button w3-large" id="open-btn">☰</button>
    <div id="head-block">
        <img id="logo" src="img/logo.png" alt="logo">
    </div>
    <div class="w3-sidebar w3-bar-block w3-border-right w3-animate-left" style="display:none;z-index:5" id="mySidebar">
        <button onclick="w3_close()" class="w3-bar-item w3-large">Close &times;</button>
        <a href="#" class="w3-bar-item w3-button">Link 1</a>
        <a href="#" class="w3-bar-item w3-button">Link 2</a>
        <a href="#" class="w3-bar-item w3-button">Link 3</a>
    </div>
    <div class="w3-overlay w3-animate-opacity" onclick="w3_close()" style="cursor:pointer" id="myOverlay"></div>
</header>

<div id="content">
    <div class="container">
        <div class="photo">

        </div>
        <div class="photo">

        </div>
        <div class="photo">

        </div>
        <div class="photo">

        </div>
        <div class="photo">

        </div>
        <div class="photo">

        </div>
        <div class="photo">

        </div>
    </div>
</div>
<footer>

</footer>
<script>
    function w3_open() {
        document.getElementById("mySidebar").style.display = "block";
        document.getElementById("myOverlay").style.display = "block";
    }

    function w3_close() {
        document.getElementById("mySidebar").style.display = "none";
        document.getElementById("myOverlay").style.display = "none";
    }
</script>
</body>
</html>