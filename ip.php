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
    <button onclick="sidebarOpen()" id="open-btn">☰</button>
    <nav>
        <img id="logo" src="img/logo.png" alt="logo">
    </nav>
    <div id="mySidebar" class="hidden sidebarClose">
        <button onclick="sidebarClose()">Close &times;</button>
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
    </div>
    <div id="myOverlay" class="hidden overlayClose" onclick="sidebarClose()"></div>
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