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
    getNotif().then(function (response) {
        if (response == 1) {
            insertNotif(generateNotifButton("DISABLE NOTIFICATIONS", disableNotificationsController));
        } else {
            insertNotif(generateNotifButton("ENABLE NOTIFICATIONS", enableNotificationsController));
        }
    });
    getCurrentUserAvatar().then((ava) => {
        document.querySelector("#p-author > img").src = ava;
    });
    document.querySelector("#p-author > div").innerHTML = getCurrentUser();
}

let avaUploader = new ImageUploader();
avaUploader.onerror = () => toastIt("Some Error Occurred");
avaUploader.onSizeError = () => toastIt("Maximum file size is 6 MB!");
avaUploader.onTypeError = () => toastIt("Only image type file supported");
avaUploader.onFileError = () => toastIt("File empty or broken");
avaUploader.onImageError = () => toastIt("Image is broken!");
avaUploader.onload = (loadedImg) => {
    let newImg = new ImageProcessing(loadedImg).squarify().cut(200, 200).toJPG().getImage();
    newImg.onload = () => {
        document.querySelector("#p-author > img").src = newImg.src;
        avatarCache = newImg.src;
        authorImg.src = newImg.src;
        sendAva(newImg.src);
    };
    toastIt("Ava changed successful");
};

function uploadAva() {
    avaUploader.load();
}


function generateNotifButton(content, controller) {
    let div = document.createElement("div");
    div.className = "butt";
    div.id = "p-notif";
    div.innerHTML = content;
    div.addEventListener("click", controller);
    return div;
}

function insertNotif(butt) {
    let parent = document.querySelector("#p-butts > .butt").parentNode;
    let ref = document.querySelector("#p-butts > .butt").nextElementSibling;
    parent.insertBefore(butt, ref);
}

function disableNotificationsController() {
    disableNotifications().then(function (response) {
        if (response == 1) {
            let notif = document.querySelector("#p-notif");
            if (notif) {
                notif.parentNode.removeChild(notif);
            }
            insertNotif(generateNotifButton("ENABLE NOTIFICATIONS", enableNotificationsController));
            toastIt("Notification disabled!")
        } else {
            toastIt("Error: " + response);
        }
    });
}

function enableNotificationsController() {
    enableNotifications().then(function (response) {
        if (response == 1) {
            let notif = document.querySelector("#p-notif");
            if (notif) {
                notif.parentNode.removeChild(notif);
            }
            insertNotif(generateNotifButton("DISABLE NOTIFICATIONS", disableNotificationsController));
            toastIt("Notification enabled!")
        } else {
            toastIt("Error: " + response);
        }
    });
}