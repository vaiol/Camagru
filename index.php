<?php
function getRoot() {
    $arr = explode('/', $_SERVER['PHP_SELF']);
    if(!empty($arr[count($arr)-1])) {
        unset($arr[count($arr)-1]);
    }
    $file = implode('/',$arr);
    $file = $file.'/';
    return $file;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Camagru</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <base href="<?=getRoot()?>">
    <link rel="icon" href="favicon.png">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Play|Roboto|Saira+Extra+Condensed">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" type="text/css" href="style/sidebar.css">
    <link rel="stylesheet" type="text/css" href="style/index-page.css">
    <link rel="stylesheet" type="text/css" href="style/photo-page.css">
    <link rel="stylesheet" type="text/css" href="style/toast.css">

    <script src="js/Router.js"></script>
    <script src="js/ImageProcessing.js"></script>
    <script src="js/ImageUploader.js"></script>
    <script src="js/sidebar.js"></script>
    <script src="js/logic.js"></script>
    <script src="js/cam-page.js"></script>
    <script src="js/diana.js"></script>
    <script src="js/photo-page.js"></script>
    <script src="js/index-page.js"></script>
    <script src="js/profile-page.js"></script>
    <script src="js/login-page.js"></script>
    <script src="js/toast.js"></script>
</head>
<body class="Site">
<header>
    <nav>
        <button id="open-btn" class="nav-btn" onclick="sidebarOpen()" ><i class="material-icons">menu</i></button>
        <div id="logo" onclick='Router.navigate("index")'>
            <img src="img/logo.png" alt="logo">
        </div>
        <div id="navigation">
            <a onclick='Router.navigate("index")' class="active" id="indexPage"><i class="material-icons">home</i>Home</a>
        </div>
    </nav>
    <section id="myOverlay" class="overlayClose hidden"  onclick="sidebarClose()">
        <div id='mySidebar' class="hidden sidebarClose" onclick="stopBubble(event)">
            <div onclick='Router.navigate("profile");sidebarClose()'>
                <img>
                <div></div>
            </div>
            <a onclick='Router.navigate("index");sidebarClose()'><i class="material-icons">home</i>Home</a>
        </div>
    </section>
</header>

<div id="content">

</div>

<div id="toast"></div>
<script src="js/routerConfig.js"></script>

<footer>
    <div class="progress" id="progress-all">
        <div class="determinate width0"></div>
    </div>
    <div id="foot">
        <div class="container">
            <div class="column s8">
                <h2>About Project</h2>
                <h3>App’s users should be able to select an image in a list of superposable images (for
                    instance a picture frame, or other “we don’t wanna know what you are using this for”
                    objects), take a picture with his/her webcam and admire the result that should be mixing
                    both pictures. All captured images should be public, likeables and commentable.</h3>
            </div>
            <div class="column s1"></div>
            <div class="column s3">
                <h2>Connect</h2>
                <a target="_blank" href="https://github.com/vaiol" class="social">
                    <img src="img/social-github.png" alt="github">
                </a>
                <a target="_blank" href="https://www.linkedin.com/in/astepano/" class="social">
                    <img src="img/social-linkedin.png" alt="linkedin">
                </a>
                <a target="_blank" href="https://www.google.com/+AlexanderStepanovans" class="social">
                    <img src="img/social-google.png" alt="google">
                </a>
                <a target="_blank" href="http://telegram.me/astepano" class="social">
                    <img src="img/social-telegram.png" alt="telegram">
                </a>
            </div>
        </div>
    </div>

    <div id="author">
        <div class="container">
            © 2017 Alexander Stepanov, All rights reserved.
        </div>
    </div>
</footer>
</body>
</html>