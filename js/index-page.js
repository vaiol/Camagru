let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
let fc = 18;
let pc = 30;
if (width <= 992) {
    fc = 6;
    pc = 12;
}
const photosInPage = pc;
const featuredCount = fc;

function generateIcon(str) {
    let icon = document.createElement('i');
    icon.className = "material-icons";
    icon.innerHTML = str;
    return icon;
}

function generatePhoto(photoJSON) {
    let img = document.createElement('img');
    img.src = photoJSON.src;
    let likes = document.createElement('div');
    likes.className = "likes";
    likes.innerHTML = photoJSON.likeCount;
    likes.appendChild(generateIcon('favorite'));
    let photo = document.createElement('div');
    photo.className = "photo";
    photo.addEventListener("click", function () {
        Router.navigate('photo/'+photoJSON.id);
        this.classList.add('openedPhoto');
    });
    photo.appendChild(img);
    photo.appendChild(likes);
    return photo;
}

function generateShowButtonPhoto(photoListNode, start, buttNext, genFunc, getFunc) {
    let button = document.createElement('div');
    button.className = "butt-next-button";
    button.innerHTML = "SHOW MORE";
    button.addEventListener("click", function () {
        button.style.visibility = "hidden";
        getFunc(start, start + photosInPage).then(function (myPhotoList) {
            showPhotos(photoListNode, myPhotoList, start + photosInPage, buttNext, genFunc, getFunc);
        });

    });
    return button;
}

function showPhotos(photoListNode, photoList, start, buttNext, genFunc, getFunc) {
    if (!genFunc) {
        genFunc = generatePhoto;
    }
    if (!getFunc) {
        getFunc = getPhotoList;
    }
    if (buttNext.firstChild) {
        buttNext.removeChild(buttNext.firstChild);
    }
    for (let i = 0, len = photoList.length; i < len; i++) {
        photoListNode.appendChild(genFunc(photoList[i], photoListNode));
    }
    if (photoList.length >= photosInPage) {
        buttNext.appendChild(generateShowButtonPhoto(photoListNode, start, buttNext, genFunc, getFunc));
    }
}


function openIndexPage() {
    let featuredPhotoListNode = document.getElementById('fPhotos');
    let laPhotoListNode = document.getElementById('laPhotos');
    let buttNext = document.getElementById('butt-next').firstElementChild;
    getFeaturedPhotoList(featuredCount).then(function (photoList) {
        showPhotos(featuredPhotoListNode, photoList, photosInPage, buttNext);
    });
    getPhotoList(0, photosInPage).then(function (photoList) {
        showPhotos(laPhotoListNode, photoList, photosInPage, buttNext);
    });
}