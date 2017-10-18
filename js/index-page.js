var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var fc = 18;
var pc = 30;
if (width <= 992) {
    fc = 6;
    pc = 12;
}
const photosInPage = pc;
const featuredCount = fc;

function generateIcon(str) {
    var icon = document.createElement('i');
    icon.className = "material-icons";
    icon.innerHTML = str;
    return icon;
}

function generatePhoto(photoJSON) {
    var img = document.createElement('img');
    img.src = photoJSON.src;
    var likes = document.createElement('div');
    likes.className = "likes";
    likes.innerHTML = photoJSON.likeCount;
    likes.appendChild(generateIcon('favorite'));
    var photo = document.createElement('div');
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
    var button = document.createElement('div');
    button.className = "butt-next-button";
    button.innerHTML = "SHOW MORE";
    button.addEventListener("click", function () {
        showPhotos(photoListNode, getFunc(start, start + photosInPage - 1), start + photosInPage, buttNext, genFunc);
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
    for (var i = 0, len = photoList.length; i < len; i++) {
        photoListNode.appendChild(genFunc(photoList[i], photoListNode));
    }
    if (photoList.length >= photosInPage) {
        buttNext.appendChild(generateShowButtonPhoto(photoListNode, start, buttNext, genFunc, getFunc));
    }
}


function openIndexPage() {
    var featuredPhotoListNode = document.getElementById('fPhotos');
    var laPhotoListNode = document.getElementById('laPhotos');
    var buttNext = document.getElementById('butt-next').firstElementChild;
    showPhotos(featuredPhotoListNode, getFeaturedPhotoList(featuredCount), -1, buttNext);
    showPhotos(laPhotoListNode, getPhotoList(0, photosInPage), photosInPage, buttNext);
}