//GET VIDEO FROM WEBCAM
var video = document.getElementById('video');
var errorVideo = null;
video.onloadedmetadata = function(e) {
    video.play();
};
navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

if (navigator.getUserMedia) {
    navigator.getUserMedia({ video: true },
        function(stream) {
            video.src = window.URL.createObjectURL(stream);
            errorVideo = null;
        },
        function(err) {
            errorVideo = err.name;
        }
    );
} else {
    errorVideo = "Your browser doesn't support 'getUserMedia'";
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
var maskFlag = false;
var prevCanvasWidth = -1;



function changePageStyle() {
    if (window.matchMedia( "(min-width: 601px)" ).matches) {
        document.getElementById('previews').style.height = document.getElementById('canvas').offsetHeight+'px';
    } else {
        document.getElementById('previews').style.height= 'auto';
    }
    document.getElementById('errText').style.lineHeight = document.getElementById('canvas').offsetHeight+'px';
}

function renderFrame() {
    changePageStyle();

    if (errorVideo !== null) {
        document.getElementById('errText').innerHTML = errorVideo;
        document.getElementById('overlay-canvas').style.backgroundColor = '#999999';
        clearInterval(vRender);
    }

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

    if (maskFlag) {
        //Change mask size to the canvas size:
        const ratio = (maskImg.width / maskImg.height);
        maskImg.height = canvas.height;
        maskImg.width = maskImg.height * ratio;
        //count shift to place mask in center of canvas:
        var shiftX = canvas.width - maskImg.width;
        shiftX = shiftX > 0 ? shiftX / 2 : 0;
        //get size of mask after resize:
        const resize = parseInt(document.getElementById("resize").value);
        const resizeX = maskImg.width * (resize / 100);
        const resizeY = maskImg.height * (resize / 100);
        const imgWidth = maskImg.width + resizeX;
        const imgHeight = maskImg.height + resizeY;
        //change moveXY if canvas.width was changed
        const moveRatio = prevCanvasWidth > 0 ? prevCanvasWidth / canvas.width : 1;
        //get new coordinate for mask:
        const nextMoveX = shiftX + (moveX / moveRatio) - resizeX / 2;
        const nextMoveY = (moveY / moveRatio) - resizeY / 4;
        //draw mask:
        context.save();
        context.translate(nextMoveX + imgWidth / 2, nextMoveY + imgHeight / 3);
        context.rotate(document.getElementById("rotat").value * Math.PI / 180);
        context.translate((nextMoveX + imgWidth / 2) * -1, (nextMoveY + imgHeight / 3) * -1);
        context.drawImage(maskImg, nextMoveX, nextMoveY, imgWidth, imgHeight);
        context.restore();
    }
}

//RENDER 40 FRAMES IN SECOND
var vRender = setInterval(renderFrame, 25);

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
    maskFlag = false;
    maskImg = new Image();
    maskImg.crossOrigin="anonymous";
    maskImg.onload = function(){
      maskFlag = true;
    };
    maskImg.onerror = function(){
        clearEffect();
        toastIt('Broken link for mask');
    };
    maskImg.src = src;
    document.getElementById('eff-control').style.display = 'flex';
}
function clearEffect() {
    maskFlag = false;
    maskImg = null;
    uploadedImg = null;
    moveX = 0;
    moveY = 0;
    isDragging = false;
    prevX = 0;
    prevY = 0;
    prevCanvasWidth = -1;
    document.getElementById('rotat').value = '0';
    document.getElementById('resize').value = '0';
    var event = document.createEvent('Event');
    event.initEvent('input', true, true);
    document.getElementById('rotat').dispatchEvent(event);
    document.getElementById('resize').dispatchEvent(event);
    document.getElementById('eff-control').style.display = 'none';
}

function uploadImg() {
    var file = document.getElementById("uploadImg").files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        uploadedImg = new Image();
        uploadedImg.src = reader.result;
        overBoxClose();
    };
    if (file) {
        reader.readAsDataURL(file);
    }
}

function uploadMask() {
    var file = document.getElementById("uploadMask").files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        changeEffect(reader.result);
        overBoxClose();
    };
    if (file) {
        reader.readAsDataURL(file);
    }
}

function sendLinkMask() {
    var link = document.getElementById('linkMask').value;
    if (link) {
        changeEffect(link);
        overBoxClose();
    }

}

function sendLinkImg() {
    var link = document.getElementById('linkImg').value;
    if (link) {
        uploadedImg = new Image();
        uploadedImg.onerror = function () {
            toastIt('Broken link for image');
            uploadedImg = null;
        };
        uploadedImg.crossOrigin = "anonymous";
        uploadedImg.src = document.getElementById('linkImg').value;
        overBoxClose();
    }
}




function maskMoveStart() {
    isDragging = true;
    prevX=0;
    prevY=0;
}

function maskMoveFinish() {
    isDragging = false;
    prevX=0;
    prevY=0;
}

function maskMove() {
    if( isDragging === true && maskImg !== null) {
        if( prevX>0 || prevY>0) {
            moveX += event.pageX - prevX;
            moveY += event.pageY - prevY;
        }
        prevX = event.pageX;
        prevY = event.pageY;
        prevCanvasWidth = canvas.width;
    }
}

function handleStart(evt) {
    evt.preventDefault();
    isDragging = true;
    prevX=0;
    prevY=0;
}

function handleMove(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;
    if( isDragging === true && maskImg !== null) {
        if( prevX>0 || prevY>0) {
            moveX += touches[0].pageX - prevX;
            moveY += touches[0].pageY  - prevY;
        }
        prevX = touches[0].pageX;
        prevY = touches[0].pageY;
        prevCanvasWidth = canvas.width;
    }
}

function handleEnd(evt) {
    evt.preventDefault();
    console.log("touchend");
    isDragging = false;
    prevX=0;
    prevY=0;
}


canvas.addEventListener("mousedown", maskMoveStart);
canvas.addEventListener("touchstart", handleStart, false);

window.addEventListener("mouseup", maskMoveFinish);
canvas.addEventListener("touchend", handleEnd, false);

window.addEventListener("mousemove", maskMove);
canvas.addEventListener("touchmove", handleMove, false);
