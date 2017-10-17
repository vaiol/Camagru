const photosInPage = 30;
const featuredCount = 18;

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

function generateShowButtonPhoto(photoListNode, start, buttNext) {
    var button = document.createElement('div');
    button.className = "butt-next-button";
    button.innerHTML = "SHOW MORE";
    button.addEventListener("click", function () {
        showPhotos(photoListNode, getPhotoList(start, start + photosInPage - 1), start + photosInPage, buttNext);
    });
    return button;
}

function showPhotos(photoListNode, photoList, start, buttNext) {
    if (buttNext.firstChild) {
        buttNext.removeChild(buttNext.firstChild);
    }
    for (var i = 0, len = photoList.length; i < len; i++) {
        photoListNode.appendChild(generatePhoto(photoList[i]));
    }
    if (photoList.length >= photosInPage) {
        buttNext.appendChild(generateShowButtonPhoto(photoListNode, start, buttNext));
    }
}


function openIndexPage() {
    var featuredPhotoListNode = document.getElementById('fPhotos');
    var laPhotoListNode = document.getElementById('laPhotos');
    var buttNext = document.getElementById('butt-next').firstElementChild;
    showPhotos(featuredPhotoListNode, getFeaturedPhotoList(featuredCount), -1, buttNext);
    showPhotos(laPhotoListNode, getPhotoList(0, photosInPage), photosInPage, buttNext);
}