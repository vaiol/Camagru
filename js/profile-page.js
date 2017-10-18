


function deletePhotoNode(id, photoNode, node) {
    if (photoNode.classList.contains('deletePhotoNode')) {
        node.removeChild(photoNode);
        deletePhoto(id);
    }
    var opened = document.getElementsByClassName('deletePhotoNode');
    for (var i = 0, len = opened.length; i < len; i++) {
        opened[i].classList.remove('deletePhotoNode');
    }
    photoNode.classList.add('deletePhotoNode');
    setTimeout(function () {
        photoNode.classList.remove('deletePhotoNode');
    }, 1000);
}

function generateMyPhoto(photoJSON, node) {
    var img = document.createElement('img');
    img.src = photoJSON.src;
    var photo = document.createElement('div');
    photo.className = "photo";
    var div = document.createElement('div');
    var p1 = document.createElement('p');
    p1.innerHTML = "double click to";
    var p2 = document.createElement('p');
    p2.innerHTML = "DELETE";
    div.appendChild(p1);
    div.appendChild(generateIcon('highlight_off'));
    div.appendChild(p2);
    var deleteit = document.createElement('div');
    deleteit.className = "deleteIt";
    deleteit.appendChild(div);
    photo.appendChild(img);
    photo.appendChild(deleteit);
    photo.addEventListener("click", function () {
        deletePhotoNode(photoJSON.id, this, node);
    });
    return photo;
}

function openProfilePage() {
    var myPhotoListNode = document.getElementById('myPhotos');
    var buttNext = document.getElementById('butt-next').firstElementChild;
    showPhotos(myPhotoListNode, getMyPhotoList(0, photosInPage), photosInPage, buttNext, generateMyPhoto, getMyPhotoList);
}