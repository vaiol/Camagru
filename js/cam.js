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

var img = null;
time = setInterval(function(){
    if (window.matchMedia( "(min-width: 601px)" ).matches) {
        document.getElementById('cans').style.height = document.getElementById('canvas').offsetHeight+'px';
    } else {
        document.getElementById('cans').style.height= 'auto';
    }
    document.getElementById('click-text').style.lineHeight = document.getElementById('canvas').offsetHeight+'px';
    var width;
    var height;
    if (img !== null) {
        width = img.width;
        height = img.height;
        canvas.width = width;
        canvas.height = height;
        context.drawImage(img, 0, 0, width, height);
    } else {
        width = document.getElementById('video').offsetWidth;
        height = document.getElementById('video').offsetHeight;
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
    }
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

    document.getElementById('hidden_data').value = canvas.toDataURL("image/png");
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
    img = null;
};

function readURL() {
    console.log('yoyo');
    var file = document.getElementById("getimage").files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        img = new Image();
        img.src = reader.result;
        console.log('success 2')
    };
    if (file) {
        reader.readAsDataURL(file);
    }
}