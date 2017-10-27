function deletePhotoNode(id, photoNode, node) {
    if (photoNode.classList.contains('deletePhotoNode')) {
        node.removeChild(photoNode);
        deletePhoto(id);
    }
    let opened = document.getElementsByClassName('deletePhotoNode');
    for (let i = 0, len = opened.length; i < len; i++) {
        opened[i].classList.remove('deletePhotoNode');
    }
    photoNode.classList.add('deletePhotoNode');
    setTimeout(() => photoNode.classList.remove('deletePhotoNode'), 1000);
}

function generateMyPhoto(photoJSON, node) {
    let img = document.createElement('img');
    img.src = photoJSON.src;
    let photo = document.createElement('div');
    photo.className = "photo";
    let div = document.createElement('div');
    let p1 = document.createElement('p');
    p1.innerHTML = "double click to";
    let p2 = document.createElement('p');
    p2.innerHTML = "DELETE";
    div.appendChild(p1);
    div.appendChild(generateIcon('highlight_off'));
    div.appendChild(p2);
    let deleteit = document.createElement('div');
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
    let myPhotoListNode = document.getElementById('myPhotos');
    let buttNext = document.getElementById('butt-next').firstElementChild;
    getMyPhotoList(0, photosInPage).then(function (myPhotoList) {
        showPhotos(myPhotoListNode, myPhotoList, photosInPage, buttNext, generateMyPhoto, getMyPhotoList);
    });
    getCurrentUserAvatar().then((ava) => {
        document.querySelector("#p-author > img").src = ava;
    });
    document.querySelector("#p-author > div").innerHTML = getCurrentUser();


}


function uploadAva() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/x-png,image/gif,image/jpeg';
    input.value = "";
    input.onchange = function () {
        let file = this.files[0];
        let reader = new FileReader();
        reader.onloadend = function () {
            let img = new Image();
            img.onload = () => {
                let newImg = HERMITE.resize_image(img, 100, 100, undefined, false);
                newImg.onload = () => {
                    document.getElementById('p-author').firstElementChild.src = newImg.src;
                };


            };
            img.src = this.result;


        };
        if (file) {
            reader.readAsDataURL(file);
        }
        this.value = null;
        return false;
    };
    input.click();
}