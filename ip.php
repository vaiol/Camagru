<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>IP</title>
    <link href="https://fonts.googleapis.com/css?family=Play|Roboto|Saira+Extra+Condensed" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="style/sidebar.css?v=<?=time();?>">
    <link rel="stylesheet" type="text/css" href="style/ip.css?v=<?=time();?>">
    <script src="js/ip.js"></script>
</head>
<body class="Site">
<header>
    <nav>
        <button id="open-btn" onclick="sidebarOpen()" >☰</button>
        <div id="logo">
            <img src="img/logo.png" alt="logo">
        </div>
        <div id="navigation">
            <a href="#"><i class="material-icons">photo_camera</i>Cam</a>
            <a href="#"><i class="material-icons">dashboard</i>My Feed</a>
            <div>Logout</div>
        </div>
    </nav>
    <div id="mySidebar" class="hidden sidebarClose">
        <button onclick="sidebarClose()"><i class="material-icons">clear</i>Close</button>
        <a href="#"><i class="material-icons">home</i>Home</a>
        <a href="#"><i class="material-icons">photo_camera</i>Cam</a>
        <a href="#"><i class="material-icons">dashboard</i>My Feed</a>
        <a href="#"><i class="material-icons">highlight_off</i>Logout</a>
    </div>
    <div id="myOverlay" class="hidden overlayClose" onclick="sidebarClose()"></div>
</header>
<div id="content">
    <div class="container wide-container">
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
    <div id="foot">
        <div class="container">
            <div class="column">
                <h2>About Project</h2>
                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</h3>
            </div>
            <div class="column">
                <h2>Connect</h2>
                <div class="social"></div>
                <div class="social"></div>
                <div class="social"></div>
                <div class="social"></div>
            </div>
        </div>
    </div>

    <div id="author">

    </div>
</footer>
</body>
</html>