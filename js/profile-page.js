


function deletePhoto(id, photoNode, node) {
    if (photoNode.classList.contains('deletePhoto')) {
        // photoNode.classList.add('none')
        node.removeChild(photoNode);
        console.log('deletePhoto(id)');
    }
    var opened = document.getElementsByClassName('deletePhoto');
    for (var i = 0, len = opened.length; i < len; i++) {
        opened[i].classList.remove('deletePhoto');
    }
    photoNode.classList.add('deletePhoto');
    setTimeout(function () {
        photoNode.classList.remove('deletePhoto');
    }, 3000);
}

function generateMyPhoto(photoJSON, node) {
    var img = document.createElement('img');
    img.src = photoJSON.src;
    var photo = document.createElement('div');
    photo.className = "photo";
// <div class="deleteIt"><div><p>double click to</p><i class="material-icons">highlight_off</i><p>DELETE</p></div></div>
    var div = document.createElement('div');
    var p1 = document.createElement('p');
    p1.innerHTML = "double click to";
    p1.style.fontSize = '10px';
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
        deletePhoto(photoJSON.id, this, node);
    });
    // photo.appendChild(img);
    return photo;
}

function openProfilePage() {
    var myPhotoListNode = document.getElementById('myPhotos');
    var buttNext = document.getElementById('butt-next').firstElementChild;
    showPhotos(myPhotoListNode, getMyPhotoList(0, photosInPage), photosInPage, buttNext, generateMyPhoto);
}