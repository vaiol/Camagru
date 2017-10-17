var authorBlock = null;
var endofdiv = null;
var overlayContent = null;
var commentBlock = null;
var commentList = null;
var likeButt = null;
var chatButt = null;
var authorButt = null;
var likeCount = null;
var chatCount = null;
var overlay = null;
var photo = null;
var textareaComm = null;
var openBtn = null;
var backBtn = null;

var likeTrigger = false;
var chatTrigger = false;

var imgID = null;
var openedPhoto = false;

const commentCount = 15;

function openPhotoPage(id) {
    if (openedPhoto) {
        closePhotoPage();
    }
    authorBlock = document.getElementById('author-block');
    endofdiv = document.getElementById('endofdiv');
    overlayContent = document.getElementById('overlay-content');
    commentBlock = document.getElementById('comment-block');
    commentList = document.getElementById('comment-list');
    likeButt = document.getElementById('like-button');
    chatButt = document.getElementById('chat-button');
    authorButt = document.getElementById('author-button');
    likeCount = document.getElementById('like-counter');
    chatCount = document.getElementById('chat-counter');
    overlay = document.getElementById('overlay-main');
    photo = document.getElementById('image-full');
    textareaComm = document.getElementById('add-comment').firstElementChild.firstElementChild;
    openBtn = document.getElementById('open-btn');
    backBtn = document.getElementById('back-btn');

    likeButt.addEventListener("click", likePhoto);
    overlay.addEventListener("click", closePhotoPage);
    chatButt.addEventListener("click", openChat);
    authorButt.addEventListener("click", openAuthor);
    overlayContent.addEventListener('mouseover', mouseOverContent);
    overlayContent.addEventListener('mouseout', mouseOutContent);

    openedPhoto = true;
    imgID = id;

    overlay.classList.remove('hidden');
    overlay.classList.add('overlayOpen');
    overlay.classList.remove('overlayClose');

    if (document.body.offsetWidth < window.innerWidth) {
        document.body.classList.add('noscroll15');
    }
    document.body.classList.add('noscroll');
    overlay.scrollTop = 0;
    //PUT DATA
    var photoJSON = getPhotoById(id);
    photo.src = photoJSON.src;
    likeCount.innerHTML = photoJSON.likeCount;
    chatCount.innerHTML = photoJSON.chatCount;
    authorButt.firstElementChild.src = getUserAvatar(photoJSON.user);
    authorButt.lastElementChild.innerHTML = photoJSON.user;
    likeTrigger = isLiked(id);
    if (likeTrigger) {
        likeButt.innerHTML = "favorite";
        likeButt.style.color = "#ef5350";
    } else {
        likeButt.innerHTML = "favorite_border";
        likeButt.style.color = "#816d65";
    }
    chatTrigger = false;
    if (window.matchMedia( "(max-width: 992px)" ).matches) {
        openBtn.classList.add('none');
        backBtn.classList.remove('none');
    }
}

/*EVENTS*/
function closePhotoPage(e, page1) {
    if (!openedPhoto) {
        return;
    }
    var nextPage = page1 ? page1 : 'index';
    Router.navigate(nextPage);
    openedPhoto = false;
    overlay.classList.remove('overlayOpen');
    overlay.classList.add('overlayClose');
    setTimeout(function() {
        overlay.classList.toggle('hidden');
        document.body.classList.remove('noscroll15');
        document.body.classList.remove('noscroll');
    }, 200);
    overlay.scrollTop = 0;
    if (chatTrigger) {
        authorBlock.classList.toggle('author-hover');
        commentBlock.classList.toggle('comm-hidden');
        commentBlock.classList.toggle('comm-visible');
        commentBlock.classList.toggle('none');
        endofdiv.classList.toggle('none');
        chatTrigger = false;
    }
    commentList.innerHTML = "";
    openBtn.classList.remove('none');
    backBtn.classList.add('none');
    imgID = null;
    var opened = document.getElementsByClassName('openedPhoto');
    for (var i = 0, len = opened.length; i < len; i++) {
        opened[i].classList.remove('openedPhoto');
    }
}

function likePhoto() {
    if (imgID === null) {
        return;
    }
    var opened = document.getElementsByClassName('openedPhoto');
    var likes = parseInt(likeCount.innerHTML);
    if (likeTrigger) {
        likeCount.innerHTML = likes - 1;
        likeButt.innerHTML = "favorite_border";
        likeButt.style.color = "#816d65";
        likeTrigger = false;
        opened[0].lastElementChild.innerHTML = (likes - 1).toString(10);
        opened[0].lastElementChild.appendChild(generateIcon('favorite'));
        makeDislike(imgID);
    } else {
        likeCount.innerHTML = likes + 1;
        likeButt.innerHTML = "favorite";
        likeButt.style.color = "#ef5350";
        likeTrigger = true;
        opened[0].lastElementChild.innerHTML = (likes + 1).toString(10);
        opened[0].lastElementChild.appendChild(generateIcon('favorite'));
        makeLike(imgID);
    }
}


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
        showComments(comentListNode, getCommentList(imgID, start, start + commentCount - 1), start + commentCount, imgID);
    });
    return button;
}

function showComments(comentListNode, commentList, start, imgID) {
    if (start !== commentCount) {
        comentListNode.removeChild(comentListNode.lastChild);
    }
    for (var i = 0, len = commentList.length; i < len; i++) {
        comentListNode.appendChild(generateCommentBlock(commentList[i]));
    }
    if (commentList.length >= commentCount) {
        comentListNode.appendChild(generateShowButton(comentListNode, start, imgID));
    }
}


function openChat() {
    if (chatTrigger) {
        authorBlock.classList.toggle('author-hover');
        commentBlock.classList.toggle('comm-hidden');
        commentBlock.classList.toggle('comm-visible');
        setTimeout(function() {
            commentBlock.classList.toggle('none');
            endofdiv.classList.toggle('none');
        }, 200);
        chatTrigger = false;
        commentList.innerHTML = "";
    } else {
        authorBlock.classList.toggle('author-hover');
        commentBlock.classList.toggle('comm-hidden');
        commentBlock.classList.toggle('comm-visible');
        commentBlock.classList.toggle('none');
        endofdiv.classList.toggle('none');
        chatTrigger = true;
        showComments(commentList, getCommentList(imgID, 0, 14), 15, imgID);
    }
}

function openAuthor() {
    //do something
}



function addComment() {
    var msg = textareaComm.value.trim();
    if (msg) {
        var commentJSON = {
            "user": getCurrentUser(),
            "text": msg,
            "img": imgID
        };
        chatCount.innerHTML = parseInt(chatCount.innerHTML) + 1;
        sendComment(sendComment);
        commentList.insertBefore(generateCommentBlock(commentJSON), commentList.firstChild);
        callDiana(commentList);
    }
    textareaComm.value = "";
}




/*HOVER OVER IMAGE PAGE WITH TIMEOUT*/

var timeoutMouse;

function mouseOverContent() {
    authorBlock.style.marginTop = '-4px';
    clearTimeout(timeoutMouse);
}

function mouseOutContent() {
    timeoutMouse = setTimeout(function() {
        authorBlock.style.marginTop = '-58px';
    }, 500);
}




/*ADDITIONAL*/

function stopBubble(e) {
    if (!e)
        e = window.event;
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}



