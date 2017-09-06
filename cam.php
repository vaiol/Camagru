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
            <div id="overlay-canvas">
                <p>CLICK TO DOWNLOAD OTHER IMAGE</p>
                <canvas id="canvas"></canvas>
            </div>

            <div id="cans">
                <p>PREVIEW</p>
                <canvas id="canvas1"></canvas>
                <canvas id="canvas2"></canvas>
                <canvas id="canvas3"></canvas>
                <canvas id="canvas4"></canvas>
            </div>

            <div id="effects">
                <div class="effect" onclick="changeEffect('p1.png')">
                    <img src="p1.png" alt="effect1">
                </div>
                <div class="effect" onclick="changeEffect('p2.png')">
                    <img src="p2.png" alt="effect2">
                </div>
                <div class="effect" onclick="changeEffect('p3.png')">
                    <img src="p3.png" alt="effect3">
                </div>
                <div class="effect" onclick="changeEffect('p4.png')">
                    <img src="p4.png" alt="effect4">
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
    <script>
        var video = document.getElementById('video');
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                video.src = window.URL.createObjectURL(stream);
                video.play();
            });
        }
        else if(navigator.getUserMedia) {
            navigator.getUserMedia({ video: true }, function(stream) {
                video.src = stream;
                video.play();
            }, errBack);
        } else if(navigator.webkitGetUserMedia) {
            navigator.webkitGetUserMedia({ video: true }, function(stream){
                video.src = window.webkitURL.createObjectURL(stream);
                video.play();
            }, errBack);
        } else if(navigator.mozGetUserMedia) {
            navigator.mozGetUserMedia({ video: true }, function(stream){
                video.src = window.URL.createObjectURL(stream);
                video.play();
            }, errBack);
        }
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var imageObj1 = new Image();
        imageObj1.src = "p0.png";


        time = setInterval(function(){
//            console.log(document.getElementById('canvas').style.height);
            if (window.matchMedia( "(min-width: 601px)" ).matches) {
                console.log("big");
                document.getElementById('cans').style.height = document.getElementById('canvas').offsetHeight+'px';
            } else {
                console.log("small");
                document.getElementById('cans').style.height= 'auto';
            }
            var width = document.getElementById('video').offsetWidth;
            var height = document.getElementById('video').offsetHeight;
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);
            context.drawImage(imageObj1, 0, 0, width, height);
        },10);

        var canvas1 = document.getElementById('canvas1');
        var context1 = canvas1.getContext('2d');
        var canvas2 = document.getElementById('canvas2');
        var context2 = canvas2.getContext('2d');
        var canvas3 = document.getElementById('canvas3');
        var context3 = canvas3.getContext('2d');
        var canvas4 = document.getElementById('canvas4');
        var context4 = canvas4.getContext('2d');

        /*SAVE*/
        document.getElementById("snap").addEventListener("click", function() {
            var width = document.getElementById('canvas').offsetWidth;
            var height = document.getElementById('canvas').offsetHeight;

            canvas4.width = width;
            canvas4.height = height;
            context4.drawImage(canvas3, 0, 0, width, height);
            canvas3.width = width;
            canvas3.height = height;
            context3.drawImage(canvas2, 0, 0, width, height);
            canvas2.width = width;
            canvas2.height = height;
            context2.drawImage(canvas1, 0, 0, width, height);
            canvas1.width = width;
            canvas1.height = height;
            context1.drawImage(canvas, 0, 0, width, height);

            var imagefile = canvas.toDataURL("image/png");
            document.getElementById('hidden_data').value = imagefile;
            var fd = new FormData(document.forms["form1"]);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'camsave.php', true);
            xhr.send(fd);
        });
        var changeEffect = function(src) {
            imageObj1.src = src;
        };
        var clearEffect = function() {
            imageObj1.src = "p0.png";
        }
    </script>
<?php require "footer.html"; ?>