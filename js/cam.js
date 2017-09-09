//GET VIDEO FROM WEBCAM
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
var moveX = 0;
var moveY = 0;
var isDragging = false;
var prevX = 0;
var prevY = 0;
var uploadedImg = null;
var maskImg = null;

function changePageStyle() {
    if (window.matchMedia( "(min-width: 601px)" ).matches) {
        document.getElementById('previews').style.height = document.getElementById('canvas').offsetHeight+'px';
    } else {
        document.getElementById('previews').style.height= 'auto';
    }
    document.getElementById('click-text').style.lineHeight = document.getElementById('canvas').offsetHeight+'px';
}

function renderFrame() {
    changePageStyle();

    if (uploadedImg === null) {
        //GET PICTURE FROM WEBCAM
        canvas.width = document.getElementById('video').offsetWidth;
        canvas.height = document.getElementById('video').offsetHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
    } else {
        //GET PICTURE FROM UPLOADED IMAGE
        canvas.width = uploadedImg.width;
        canvas.height = uploadedImg.height;
        context.drawImage(uploadedImg, 0, 0, canvas.width, canvas.height);
    }

    if (maskImg !== null)
    {
        //RENDER MASK FRAME WITH ROTATING, RESIZING AND MOVING
        const resize = parseInt(document.getElementById("resize").value);
        const imgWidth = parseInt(canvas.width) + resize;
        const imgHeight = parseInt(canvas.height) + resize;
        const nextMoveX = moveX - resize / 2;
        const nextMoveY = moveY - resize / 2;
        context.save();
        context.translate(nextMoveX + imgWidth / 2, nextMoveY + imgHeight / 3);
        context.rotate(document.getElementById("rotat").value * Math.PI / 180);
        context.translate((nextMoveX + imgWidth /2) * -1, (nextMoveY + imgHeight/3) * -1);
        context.drawImage(maskImg, nextMoveX, nextMoveY, imgWidth, imgHeight);
        context.restore();
    }
}

//RENDER 40 FRAMES IN SECOND
setInterval(renderFrame, 25);

function renderPreviews() {
    var previews = [];
    var childs = document.getElementById('previews').childNodes;
    childs.forEach(function(currentValue) {
        if(currentValue.tagName === 'CANVAS'){
            previews.push(currentValue);
        }
    });
    for (var i = previews.length - 1; i >= 0; i--) {
        var currentContext = previews[i].getContext('2d');
        var nextCanvas;
        if (i === 0) {
            nextCanvas = canvas;
        } else {
            nextCanvas = previews[i - 1];
        }
        previews[i].width = nextCanvas.width;
        previews[i].height = nextCanvas.height;
        currentContext.drawImage(nextCanvas, 0, 0, nextCanvas.width, nextCanvas.height);
    }
}

function saveImage() {
    renderPreviews();
    document.getElementById('hidden_data').value = canvas.toDataURL("image/png");
    var fd = new FormData(document.forms["form1"]);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'camsave.php', true);
    xhr.send(fd);
}

function changeEffect(src) {
    maskImg = new Image();
    maskImg.src = src;
}
function clearEffect() {
    maskImg = null;
    uploadedImg = null;
}

function uploadImg() {
    var file = document.getElementById("getimage").files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        uploadedImg = new Image();
        uploadedImg.src = reader.result;
    };
    if (file) {
        reader.readAsDataURL(file);
    }
}

document.getElementById("canvas").addEventListener("mousedown", function() {
    isDragging = true;
    prevX=0;
    prevY=0;
});

window.addEventListener("mouseup", function() {
    isDragging = false;
    prevX=0;
    prevY=0;
});

window.addEventListener("mousemove", function() {
    if( isDragging === true && maskImg !== null) {
        if( prevX>0 || prevY>0) {
            moveX += event.pageX - prevX;
            moveY += event.pageY - prevY;
        }
        prevX = event.pageX;
        prevY = event.pageY;
    }
});
