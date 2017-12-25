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
let localStream = [];
let maskSave = null;
let arrMasks = ['img/effects/p1.png', 'img/effects/p2.png', 'img/effects/p3.png', 'img/effects/p4.png'];
let previews = null;
let pcam = null;


navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;



let openedCam = false;

setInterval(stopStream, 20);

function startStream() {
    if (!video && openedCam) {
        video = document.getElementById('video');
        video.onloadedmetadata = function(e) {
            video.play();
        };
        navigator.getUserMedia({ video: true },
            function(stream) {
                localStream.push(stream);
                if (video) {
                    video.src = window.URL.createObjectURL(stream);
                }
                errorVideo = null;
            },
            function(err) {
                errorVideo = err.name;
                video = null;
            });
    }
}

function stopStream() {
    if (!openedCam && video) {
        video.src = "";
        video.mozSrcObject = null;
        video = null;
    }
    if (!openedCam) {
        for (let i = 0, len = localStream.length; i < len; i++) {
            localStream[i].getTracks()[0].stop();
            localStream.splice(i, 1);
        }

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
    openedCam = true;
    startStream();
    rangesInit();
    downloadMasks(arrMasks);
    restorePreviews();
    makePreviewMask(maskSave);

    previews = document.getElementById('previews');
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    canvas.addEventListener("mousedown", maskMoveStart);
    canvas.addEventListener("touchstart", handleStart, false);
    window.addEventListener("mouseup", maskMoveFinish);
    canvas.addEventListener("touchend", handleEnd, false);
    window.addEventListener("mousemove", maskMove);
    canvas.addEventListener("touchmove", handleMove, false);
    vRender = setInterval(renderFrame, 25);
    pcam = document.querySelector("#progress-cam > div");
}

function videoFinish() {
    openedCam = false;
    if (vRender) {
        clearInterval(vRender);
        vRender = null;
    }
    canvas = null;
    context = null;
    maskFlag = false;
    pcam = null;
}




/* RENDERING */

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
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
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
        let sX = moveX;
        let nextMoveX = shiftX - (moveX / moveRatio) - resizeX / 2;
        let nextMoveY = (moveY / moveRatio) - resizeY / 4;
        //border for moving:
        if (nextMoveY > (canvas.height - imgHeight / 2)) {
            nextMoveY = (canvas.height - imgHeight / 2);
            moveY = (nextMoveY + resizeY / 4) * moveRatio;
        }
        if (nextMoveY < (0 - imgHeight / 2)) {
            nextMoveY = (0 - imgHeight / 2);
            moveY = (nextMoveY + resizeY / 4) * moveRatio;
        }

        if (nextMoveX > (canvas.width - imgWidth / 2)) {
            nextMoveX = (canvas.width - imgWidth / 2);
            moveX = -(nextMoveX - shiftX + resizeX / 2) * moveRatio;
        }
        if (nextMoveX < (0 - imgWidth / 2)) {
            nextMoveX = (0 - imgWidth / 2);
            moveX = -(nextMoveX - shiftX + resizeX / 2) * moveRatio;
        }
        //draw mask:
        context.save();
        context.translate(nextMoveX + imgWidth / 2, nextMoveY + imgHeight / 3);
        context.rotate(document.getElementById("rotat").value * Math.PI / 180);
        context.translate((nextMoveX + imgWidth / 2) * -1, (nextMoveY + imgHeight / 3) * -1);
        context.drawImage(maskImg, nextMoveX, nextMoveY, imgWidth, imgHeight);
        context.restore();

    }
}

function changePageStyle() {
    if (window.matchMedia( "(min-width: 601px)" ).matches) {
        document.getElementById('previews').style.height = document.getElementById('canvas').offsetHeight+'px';
    } else {
        document.getElementById('previews').style.height= 'auto';
    }
    document.getElementById('errText').style.lineHeight = document.getElementById('canvas').offsetHeight+'px';
}

/* MASK MOVING */

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

/* UPLOAD TOOLS */

function overBoxOpen() {
    let overlay = document.getElementById("over-elem");
    let overBox = document.getElementById("over-box");
    let openBtn = document.getElementById('open-btn');
    openBtn.classList.add('none');
    openBtn.parentNode.insertBefore(generateBackButton(overBoxClose), openBtn);
    overlay.classList.remove('hidden');
    overBox.classList.remove('hidden');
    overlay.style.display = "block";
    overBox.style.display = "block";
    overlay.classList.toggle('overlayOpen');
    overlay.classList.toggle('overlayClose');
    overBox.classList.toggle('overlayOpen');
    overBox.classList.toggle('overlayClose');
    if (document.body.offsetWidth < window.innerWidth) {
        document.body.classList.add('noscroll15');
    }
    document.body.classList.add('noscroll');
}

function overBoxClose() {
    let overlay = document.getElementById("over-elem");
    let overBox = document.getElementById("over-box");
    let openBtn = document.getElementById('open-btn');
    let backBtn = document.getElementById('back-btn');
    openBtn.classList.remove('none');
    if (backBtn) {
        backBtn.parentNode.removeChild(backBtn);
    }

    overlay.classList.toggle('overlayOpen');
    overlay.classList.toggle('overlayClose');
    overBox.classList.toggle('overlayOpen');
    overBox.classList.toggle('overlayClose');

    setTimeout(function() {
        overlay.style.display = "none";
        overBox.style.display = "none";
        document.body.classList.remove('noscroll15');
        document.body.classList.remove('noscroll');
    }, 200);
}

/* SET DOWNLOADED MASK */

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

/* LOAD DEFAULT MASKS */

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

/* UPLOAD BACKGROUND IMAGE */

let imageUploader = new ImageUploader(10, 2000, 2000);
imageUploader.onerror = () => toastIt("Some Error Occurred");
imageUploader.onSizeError = () => toastIt("Maximum file size is 10 MB!");
imageUploader.onTypeError = () => toastIt("Only image type file supported");
imageUploader.onFileError = () => toastIt("File empty or broken");
imageUploader.onImageError = () => toastIt("Image is broken!");
imageUploader.onloadend = () => overBoxClose();
imageUploader.onload = (newImg) => {
    uploadedImg = newImg;
    stopStream();
    toastIt("File uploaded successful");
};

function uploadImg() {
    imageUploader.load();
}

function sendLinkImg() {
    let link = document.getElementById('linkImg').value;
    if (link) {
        let img = new Image();
        img.onload = function () {
            ImageUploader.resize(img, 2000, 2000, function (newImg) {
                uploadedImg = newImg;
                stopStream();
            });
        };
        img.onerror = function () {
            uploadedImg = null;
            toastIt('IMAGE IS BROKEN!1');
        };
        img.src = corsProxy + link;
        overBoxClose();
    }
}

/* UPLOAD MASK */

let maskUploader = new ImageUploader();
maskUploader.onerror = () => toastIt("Some Error Occurred");
maskUploader.onSizeError = () => toastIt("Maximum file size is 6 MB!");
maskUploader.onTypeError = () => toastIt("Only image type file supported");
maskUploader.onFileError = () => toastIt("File empty or broken");
maskUploader.onImageError = () => toastIt("Image is broken!");
maskUploader.onloadend = () => overBoxClose();
maskUploader.onload = (newMask) => {
    maskFlag = true;
    maskImg = newMask;
    maskSave = newMask.src;
    makePreviewMask(maskSave);
    document.getElementById('eff-control').style.display = 'flex';
    toastIt("File uploaded successful");
};

function uploadMask() {
    maskUploader.load();
}

function sendLinkMask() {
    let link = document.getElementById('linkMask').value;
    if (link) {
        changeEffect(corsProxy + link, true);
        overBoxClose();
    }
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

function changeEffect(src, loaded) {
    let newMask = new Image();
    newMask.onload = function () {
        maskFlag = true;
        maskImg = newMask;
        if (loaded) {
            maskSave = newMask.src;
            makePreviewMask(maskSave);
        }
        document.getElementById('eff-control').style.display = 'flex';
    };
    newMask.onerror = function () {
        toastIt('MASK IS BROKEN');
    };
    newMask.src = src;
}

/* RESTORE PREVIEWS */

function restorePreviews() {
    getMyPhotoList(0, 6).then(function (list) {
        if (list) {
            for (let i = 0, len = list.length; i < len; i++) {
                let img = new Image();
                img.src = list[i].src;
                previews.appendChild(img);
            }
        }
    });
}

/* SAVE IMAGE */

function insertAfter(elem, newElem) {
    let next = elem.nextSibling;
    if (next) {
        previews.insertBefore(newElem, next);
    } else {
        previews.appendChild(newElem);
    }
    if (previews.childElementCount > 10) {
        previews.removeChild(previews.lastElementChild);
    }
}

function saveImage() {
    let imageSrc = document.getElementById('canvas').toDataURL("image/png");
    let img = new Image();
    img.onload = function () {
        let newImg = new ImageProcessing(img).toJPG().getImage();
        newImg.onload = function () {
            try {
                document.getElementById('f-file').value = newImg.src;
                document.getElementById('f-login').value = getCurrentUser();
                document.getElementById('f-type').value = 'PUT';
            } catch (error) {
                toastIt('Some error occurred');
                return;
            }
            insertAfter(previews.firstElementChild, newImg);
            let fd = new FormData(document.forms["form1"]);
            uploadPhotoRes(fd);
        };
    };
    img.src = imageSrc;
}

function saveImagePHP() {
    
}

