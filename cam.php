<?php require "header.html"; ?>
<div id="content">
    <div class="main-text">
        <div class="container">
            CAM
            <div class="line"></div>
        </div>
    </div>
    <div id="cam">
        <div class="container">
            <video id="video" autoplay></video>
            <input type='file' id='getimage' name="background-image" onchange="readURL();this.value=null;return false;">
            <div id="overlay-canvas">
                <p id="click-text">CLICK TO DOWNLOAD OTHER IMAGE</p>
                <canvas id="canvas"></canvas>
            </div>

            <div id="cans">
                <p>PREVIEW</p>
                <canvas id="canvas1"></canvas>
                <canvas id="canvas2"></canvas>
                <canvas id="canvas3"></canvas>
                <canvas id="canvas4"></canvas>
            </div>
            Rotate:
            <input type="range" name="rotate" min="-90" max="90" id="rotat">
            Resize:
            <input type="range" name="resize" min="-400" max="400" id="resize">
            <input type="hidden" value="0" id="img_resize">
            <div id="effects">
                <div class="effect" onclick="changeEffect('img/effects/e1.png')">
                    <img src="img/effects/e1.png" alt="effect1">
                </div>
                <div class="effect" onclick="changeEffect('img/effects/e2.png')">
                    <img src="img/effects/e2.png" alt="effect2">
                </div>
                <div class="effect" onclick="changeEffect('img/effects/e3.png')">
                    <img src="img/effects/e3.png" alt="effect3">
                </div>
                <div class="effect" onclick="changeEffect('img/effects/e4.png')">
                    <img src="img/effects/e4.png" alt="effect4">
                </div>
            </div>

        </div>
    </div>
    <div class="container">
        <div id="control">
            <div class="butt" style="margin-right: 0.4%" onclick="clearEffect()">
                CLEAR
            </div>
            <div class="butt" id="snap" style="margin-left: 0.4%">
                SAVE
            </div>
            <form method="post" accept-charset="utf-8" name="form1">
                <input name="hidden_data" id='hidden_data' type="hidden"/>
            </form>
        </div>
    </div>
</div>
<script src="js/cam.js"></script>
<script src="js/input-range.js"></script>
<?php require "footer.html"; ?>

<!--                 onclick="document.getElementById('getimage').click();"-->
