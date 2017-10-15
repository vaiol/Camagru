var photosInPage = 30;

function generateCommentBlock(commentJSON) {
    var commentAuthor = document.createElement('div');
    commentAuthor.className = "comment-author";
    commentAuthor.innerHTML = commentJSON.user;
    var commentText = document.createElement('div');
    commentText.className = "comment-text";

    commentText.innerHTML = "<pre>"+commentJSON.text+"</pre>";

    var div = document.createElement('div');
    div.appendChild(commentAuthor);
    div.appendChild(commentText);
    var img = document.createElement('img');
    img.src = getUserAvatar(commentJSON.user);

    var comment = document.createElement('div');
    comment.className = "comment";
    comment.appendChild(img);
    comment.appendChild(div);
    return comment;
}


function generateShowButton(comentListNode, start, imgID) {
    var button = document.createElement('div');
    button.className = "butt-next-button";
    button.innerHTML = "SHOW MORE";
    button.addEventListener("click", function () {
        showComments(comentListNode, getCommentList(imgID, start, start + 14), start + 15, imgID);
    });
    return button;
}

function showComments(comentListNode, commentList, start, imgID) {
    // if (start !== 15) {
    //     comentListNode.removeChild(comentListNode.lastChild);
    // }
    for (var i = 0, len = commentList.length; i < len; i++) {
        comentListNode.appendChild(generateCommentBlock(commentList[i]));
    }
    if (commentList.length >= 15) {
        comentListNode.appendChild(generateShowButton(comentListNode, start, imgID));
    }
}

function generateIcon(str) {
    var icon = document.createElement('i');
    icon.className = "material-icons";
    icon.innerHTML = str;
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
    photo.onclick = "Router.navigate('photo/"+photoJSON.id+"');";
    photo.appendChild(img);
    photo.appendChild(likes);
}

function generateShowButtonPhoto(photoListNode, start, imgID) {
    var button = document.createElement('div');
    button.className = "butt-next-button";
    button.innerHTML = "SHOW MORE";
    var buttNext = document.createElement('div');
    buttNext.id = "butt-next";
    var container = document.createElement('div');
    container.className = "container";
    container.appendChild(button);
    buttNext.appendChild(container);

    buttNext.addEventListener("click", function () {
        showPhotos(photoListNode, getPhotoList(start, start + photosInPage - 1), start + photosInPage);
    });
    return button;
}

function showPhotos(photoListNode, photoList, start) {
    for (var i = 0, len = photoList.length; i < len; i++) {
        photoListNode.appendChild(generatePhoto(photoList[i]));
    }
    if (commentList.length >= photosInPage) {
        photoListNode.appendChild(generateShowButton(photoListNode, start, imgID));
    }
}