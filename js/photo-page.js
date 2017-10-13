var authorBlock = document.getElementById('author-block');
var endofdiv = document.getElementById('endofdiv');
var content = document.getElementById('overlay-content');
var commentBlock = document.getElementById('comment-block');
var commentList = document.getElementById('comment-list');
var likeButt = document.getElementById('like-button');
var chatButt = document.getElementById('chat-button');
var authorButt = document.getElementById('author-button');
var likeCount = document.getElementById('like-counter');
var chatCount = document.getElementById('chat-counter');
var overlay = document.getElementById('overlay-main');
var photo = document.getElementById('image-full');
var textareaComm = document.getElementById('add-comment').firstElementChild.firstElementChild;

var likeTrigger = false;
var chatTrigger = false;

var imgID = null;

var opened = false;


function openPhotoPage(id) {
    console.log("open"+id);
    if (opened) {
        closePhotoPage();
    }
    opened = true;
    imgID = id;
    overlay.classList.toggle('hidden');
    overlay.classList.toggle('overlayOpen');
    overlay.classList.toggle('overlayClose');
    if (document.body.offsetHeight > window.innerHeight) {
        document.body.classList.toggle('noscroll');
    }
    overlay.scrollTop = 0;
    //PUT DATA
    var photoJSON = getPhotoById(id);
    photo.src = photoJSON.src;
    likeCount.innerHTML = photoJSON.likeCount;
    chatCount.innerHTML = photoJSON.chatCount;
    authorButt.firstElementChild.src = getCurrentUserAvatar();
    authorButt.lastElementChild.innerHTML = getCurrentUser();
    likeTrigger = isLiked(id);
    if (likeTrigger) {
        likeButt.innerHTML = "favorite";
    } else {
        likeButt.innerHTML = "favorite_border";
    }
    chatTrigger = false;
}

/*EVENTS*/
function closePhotoPage() {
    Router.navigate();
    opened = false;
    overlay.classList.toggle('overlayOpen');
    overlay.classList.toggle('overlayClose');
    setTimeout(function() {
        overlay.classList.toggle('hidden');
        if (document.body.offsetHeight > window.innerHeight) {
            document.body.classList.toggle('noscroll');
        }
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
    imgID = null;
}

function likePhoto() {
    if (imgID === null) {
        return;
    }
    var likes = parseInt(likeCount.innerHTML);
    if (likeTrigger) {
        likeCount.innerHTML = likes - 1;
        likeButt.innerHTML = "favorite_border";
        likeTrigger = false;
        makeDislike(imgID);
    } else {
        likeCount.innerHTML = likes + 1;
        likeButt.innerHTML = "favorite";
        likeTrigger = true;
        makeLike(imgID);
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

likeButt.addEventListener("click", likePhoto);
overlay.addEventListener("click", closePhotoPage);
chatButt.addEventListener("click", openChat);
authorButt.addEventListener("click", openAuthor);


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

content.addEventListener('mouseover', mouseOverContent);
content.addEventListener('mouseout', mouseOutContent);


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



