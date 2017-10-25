//GET VIDEO FROM WEBCAM
let video = null;
let errorVideo = null;
let canvas = null;
let context = null;
let moveX = 0;
let moveY = 0;
let isDragging = false;
let prevX = 0;
let prevY = 0;
let uploadedImg = null;
let maskImg = null;
let maskFlag = false;
let corsProxy = '/camagru/controller/fetch.php?url=';
let prevCanvasWidth = -1;
let vRender = null;
let localStream = null;
let maskSave = null;
let arrMasks = ['img/effects/p1.png', 'img/effects/p2.png', 'img/effects/p3.png', 'img/effects/p4.png'];

const maxImgSize = 2000;

let HERMITE = new Hermite_class();


navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;


function startStream() {
    if (!video) {
        video = document.getElementById('video');
        video.onloadedmetadata = function(e) {
            video.play();
        };
        navigator.getUserMedia({ video: true },
            function(stream) {
                localStream = stream;
                video.src = window.URL.createObjectURL(localStream);
                errorVideo = null;
            },
            function(err) {
                errorVideo = err.name;
                video = null;
            });
    }
}

function stopStream() {
    if (video) {
        video.src = "";
        video.mozSrcObject = null;
        video = null;
        localStream.getTracks()[0].stop();
        localStream = null;
    }
}

function rangesInit() {
    let event1 = document.createEvent('HTMLEvents');
    event1.initEvent('input', true, false);
    let ranges = document.querySelectorAll('input[type=range]');
    ranges.forEach(function (currentRange) {
        currentRange.addEventListener('input', function(e) {
            let min = e.target.min,
                max = e.target.max,
                val = e.target.value;

            e.target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
        });
        currentRange.dispatchEvent(event1);
    });
}


function videoStart() {
    startStream();
    rangesInit();
    downloadMasks(arrMasks);
    restorePreviews();
    makePreviewMask(maskSave);

    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    canvas.addEventListener("mousedown", maskMoveStart);
    canvas.addEventListener("touchstart", handleStart, false);
    window.addEventListener("mouseup", maskMoveFinish);
    canvas.addEventListener("touchend", handleEnd, false);
    window.addEventListener("mousemove", maskMove);
    canvas.addEventListener("touchmove", handleMove, false);
    vRender = setInterval(renderFrame, 25);
}

function videoFinish() {
    stopStream();
    savePreviews();
    canvas = null;
    context = null;
    if (vRender) {
        clearInterval(vRender);
        vRender = null;
    }
    maskFlag = false;

}

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
    } else if (uploadedImg) {
        canvas.width = uploadedImg.width;
        canvas.height = uploadedImg.height;
        console.log('width : ' + uploadedImg.width + '; height: ' + uploadedImg.height);
        console.log();
        context.drawImage(uploadedImg, 0, 0, canvas.width, canvas.height);
    }

    if (maskFlag) {
        //Change mask size to the canvas size:
        const smaller = 0.5;
        const ratio = (maskImg.width / maskImg.height);
        if (maskImg.height > maskImg.width) {
            maskImg.height = canvas.height * smaller;
            maskImg.width = maskImg.height * ratio;
        } else {
            maskImg.width = canvas.width * smaller;
            maskImg.height = maskImg.width / ratio;
        }

        //count shift to place mask in center of canvas:
        let shiftX = canvas.width - maskImg.width;
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

function renderPreviews() {
    let previews = [];
    let children = document.getElementById('previews').childNodes;
    children.forEach(function(currentValue) {
        if(currentValue.tagName === 'CANVAS'){
            previews.push(currentValue);
        }
    });
    for (let i = previews.length - 1; i >= 0; i--) {
        let currentContext = previews[i].getContext('2d');
        let nextCanvas;
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

let s = null;
let sHeight = null;

function savePreviews() {
    if (!canvas) {
        return;
    }
    sHeight = canvas.offsetHeight+'px';
    let previews = document.getElementById('previews');
    if (previews) {
        s = [];
        let children = document.getElementById('previews').childNodes;
        children.forEach(function(currentValue) {
            if(currentValue.tagName === 'CANVAS') {
                let img = new Image();
                img.src = currentValue.toDataURL("image/png");
                img.onload = function () {
                    s.push(img);
                };
            }
        });
    }
}

function restorePreviews() {
    if (s) {
        let i = 0;
        let children = document.getElementById('previews').childNodes;

        children.forEach(function(currentValue) {
            if(currentValue.tagName === 'CANVAS') {
                let currentContext = currentValue.getContext('2d');
                currentValue.width = s[i].width;
                currentValue.height = s[i].height;
                currentContext.drawImage(s[i], 0, 0, s[i].width, s[i].height);
                i++;
            }
        });
        document.getElementById('previews').style.height = sHeight;
        document.getElementById('canvas').height = sHeight;
    }
    s = null;
}



/*
 * MASK MOVING
 */

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
    if(isDragging === true && maskImg !== null) {
        if( prevX > 0 || prevY > 0) {
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
    let touches = evt.changedTouches;
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
    isDragging = false;
    prevX = 0;
    prevY = 0;
}

/*
 * UPLOAD TOOLS
 */


function overBoxOpen() {
    let overlay = document.getElementById("over-elem");
    let overBox = document.getElementById("over-box");
    overlay.classList.remove('hidden');
    overBox.classList.remove('hidden');
    overlay.style.display = "block";
    overBox.style.display = "block";
    overlay.classList.toggle('overlayOpen');
    overlay.classList.toggle('overlayClose');
    overBox.classList.toggle('overlayOpen');
    overBox.classList.toggle('overlayClose');
    if (document.body.offsetHeight > window.innerHeight) {
        document.body.classList.toggle('noscroll');
    }
}

function overBoxClose() {
    let overlay = document.getElementById("over-elem");
    let overBox = document.getElementById("over-box");
    overlay.classList.toggle('overlayOpen');
    overlay.classList.toggle('overlayClose');
    overBox.classList.toggle('overlayOpen');
    overBox.classList.toggle('overlayClose');

    setTimeout(function() {
        overlay.style.display = "none";
        overBox.style.display = "none";
        if (document.body.offsetHeight > window.innerHeight) {
            document.body.classList.toggle('noscroll');
        }
    }, 200);
}


/*PREVIEW DOWNLOADED MASK*/

















function createMaskImg(src) {
    let img = new Image();
    img.src = src;
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = function () {
        if (img.width > img.height) {
            img.style.width = '90%';
        } else {
            img.style.height = '90%';
        }
    };
    return img;
}


function makePreviewMask(src) {
    let div = document.getElementById("previewMask");
    if (!src) {
        div.addEventListener('click', function () {
            overBoxOpen();
        });
        return;
    }
    let newElement = div.cloneNode(true);
    while (newElement.firstChild) {
        newElement.removeChild(newElement.firstChild);
    }
    newElement.appendChild(createMaskImg(src));
    newElement.addEventListener('click', function () {
        changeEffect(src);
    });
    div.parentNode.replaceChild(newElement, div);
}

function createMaskNode(src) {
    let div = document.createElement('div');
    div.className = 'effect';
    div.onclick = function () {
        changeEffect(src);
    };
    div.appendChild(createMaskImg(src));
    return div;
}

function downloadMasks(arr) {
    let effectsBlock = document.getElementById("effects");
    for (let i = 0, len = arr.length; i < len; i++) {
        effectsBlock.appendChild(createMaskNode(arr[i]));
    }
    let prev = document.createElement('div');
    prev.id = 'previewMask';
    prev.className = 'effect';
    prev.innerHTML = '<p>UPLOAD YOUR MASK</p>';
    effectsBlock.appendChild(prev);

}














// <img src='dfgdfg'></img>

function changeEffect(src, loaded) {
    let newMask = new Image();
    newMask.onload = function () {
        maskFlag = true;
        maskImg = newMask;
        if (loaded) {
            maskSave = newMask.src;
            makePreviewMask(maskSave);
        }

    };
    newMask.onerror = function () {
        toastIt('MASK IS BROKEN');
    };
    newMask.src = src;
    document.getElementById('eff-control').style.display = 'flex';
}

function changeImg(src) {
    let img = new Image();
    img.onload = function () {
        let resizeNeeded, width, height;
        if (img.width > maxImgSize) {
            resizeNeeded = true;
            let ratio = img.width / maxImgSize;
            height = img.height / ratio;
            width = maxImgSize;
        } else if (img.height > maxImgSize) {
            resizeNeeded = true;
            let ratio = img.height / maxImgSize;
            width = img.width / ratio;
            height = maxImgSize;
        }
        if (resizeNeeded) {
            let newImg = HERMITE.resize_image(img, width, height, undefined, true);
            newImg.onload = function () {
                uploadedImg = newImg;
                stopStream();
            };
        } else {
            uploadedImg = img;
            stopStream();
        }
    };
    img.onerror = function () {
        uploadedImg = null;
        toastIt('IMAGE IS BROKEN!1');
    };
    img.src = src;
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
    let event = document.createEvent('Event');
    event.initEvent('input', true, true);
    document.getElementById('rotat').dispatchEvent(event);
    document.getElementById('resize').dispatchEvent(event);
    document.getElementById('eff-control').style.display = 'none';
    startStream();
}

function uploadImg() {
    let file = document.getElementById("uploadImg").files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
        changeImg(reader.result);

        overBoxClose();
    };
    if (file) {
        reader.readAsDataURL(file);
    }
}

function uploadMask() {
    let file = document.getElementById("uploadMask").files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
        changeEffect(reader.result, true);
        overBoxClose();
    };
    if (file) {
        reader.readAsDataURL(file);
    }
}

function sendLinkMask() {
    let link = document.getElementById('linkMask').value;
    if (link) {
        changeEffect(corsProxy + link, true);
        overBoxClose();
    }
}

function sendLinkImg() {
    let link = document.getElementById('linkImg').value;
    if (link) {
        changeImg(corsProxy + link);
        overBoxClose();
    }
}



function saveImage() {
    renderPreviews();
    try {
        document.getElementById('f-file').value = document.getElementById('canvas1').toDataURL("image/png");
        document.getElementById('f-login').value = getCurrentUser();
        document.getElementById('f-type').value = 'PUT';
    } catch (error) {
        toastIt('Some Error');
    }

    let fd = new FormData(document.forms["form1"]);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'controller/controller-photo.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            // console.log(xhr.getAllResponseHeaders());
            console.log(xhr.responseText);
            // console.log('DONE - stache', xhr.status);
        }
    };
    xhr.onload = function () {
        console.log('DONE', xhr.status);
    };
    xhr.send(fd);
}

