<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>IP</title>
    <link rel="stylesheet" type="text/css" href="style/ip.css?v=<?=time();?>">
    <script src="js/ip.js"></script>
</head>
<body class="Site">
<header>
    <button onclick="w3_open()" class="w3-button w3-large" id="open-btn">☰</button>
    <nav>
        <img id="logo" src="img/logo.png" alt="logo">
    </nav>
    <div class="w3-bar-block" style="display:none;" id="mySidebar">
        <button onclick="w3_close()" class="w3-bar-item w3-large">Close &times;</button>
        <a href="#" class="w3-bar-item w3-button">Link 1</a>
        <a href="#" class="w3-bar-item w3-button">Link 2</a>
        <a href="#" class="w3-bar-item w3-button">Link 3</a>
    </div>
    <div  id="myOverlay" onclick="w3_close()" style="cursor:pointer"></div>
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
</body>
</html>