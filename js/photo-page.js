let authorBlock = null;
let endofdiv = null;
let overlayContent = null;
let commentBlock = null;
let commentList = null;
let likeButt = null;
let chatButt = null;
let authorButt = null;
let likeCount = null;
let chatCount = null;
let overlay = null;
let photo = null;
let textareaComm = null;
let openBtn = null;
let addCommentField = null;

let likeTrigger = false;
let chatTrigger = false;

let imgID = null;
let openedPhoto = false;

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
    addCommentField = document.getElementById("add-comment");

    likeButt.addEventListener("click", likePhoto);
    overlay.addEventListener("click", closePhotoPage);
    chatButt.addEventListener("click", openChat);
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
    let photoCacheJSON = getPhotoCacheByID(id);
    if (photoCacheJSON) {
        photo.src = photoCacheJSON.src;
        likeCount.innerHTML = photoCacheJSON.likeCount;
        chatCount.innerHTML = photoCacheJSON.chatCount;
        getUserAvatar(photoCacheJSON.user).then((ava) => {
            authorButt.firstElementChild.src = ava;
        });
        authorButt.lastElementChild.innerHTML = photoCacheJSON.user;
    }


    getPhotoById(id).then((photoJSON) => {
        photo.src = photoJSON.src;
        likeCount.innerHTML = photoJSON.likeCount;
        chatCount.innerHTML = photoJSON.chatCount;
        getUserAvatar(photoJSON.user).then((ava) => {
            authorButt.firstElementChild.src = ava;
        });
        authorButt.lastElementChild.innerHTML = photoJSON.user;
    });

    chatTrigger = false;
    openBtn.classList.add('none');
    openBtn.parentNode.insertBefore(generateBackButton(closePhotoPage), openBtn);

    if (getCurrentUser()) {
        isLiked(id).then((isLiked) => {
            likeTrigger = isLiked;
            if (isLiked) {
                likeButt.innerHTML = "favorite";
                likeButt.style.color = "#ef5350";
            } else {
                likeButt.innerHTML = "favorite_border";
                likeButt.style.color = "#816d65";
            }
        });
    } else {
        likeButt.innerHTML = "favorite";
        likeButt.style.color = "#ef5350";
    }
}

/*EVENTS*/
function closePhotoPage(e, page1) {
    if (!openedPhoto) {
        return;
    }
    let nextPage = page1 ? page1 : 'index';
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
    let backBtn = document.querySelector("#back-btn");
    if (backBtn) {
        backBtn.parentNode.removeChild(backBtn);
    }
    imgID = null;
    let opened = document.getElementsByClassName('openedPhoto');
    for (let i = 0, len = opened.length; i < len; i++) {
        opened[i].classList.remove('openedPhoto');
    }
}

function likePhoto() {
    if (imgID === null || !getCurrentUser()) {
        return;
    }
    let opened = document.getElementsByClassName('openedPhoto');
    let likes = parseInt(likeCount.innerHTML);
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



/*COMMENTS*/

function generateCommentBlock(commentJSON) {
    let commentAuthor = document.createElement('div');
    commentAuthor.className = "comment-author";
    commentAuthor.innerHTML = commentJSON.user;
    let commentText = document.createElement('div');
    commentText.className = "comment-text";
    commentJSON.text = commentJSON.text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    commentText.innerHTML = "<pre>"+commentJSON.text+"</pre>";

    let div = document.createElement('div');
    div.appendChild(commentAuthor);
    div.appendChild(commentText);
    let img = document.createElement('img');
    getUserAvatar(commentJSON.user).then((ava) => {
        img.src = ava;
    });
    let comment = document.createElement('div');
    comment.className = "comment";
    comment.appendChild(img);
    comment.appendChild(div);
    return comment;
}


function generateShowButton(commentListNode, start, imgID) {
    let button = document.createElement('div');
    button.className = "butt-next-button";
    button.innerHTML = "SHOW MORE";
    button.addEventListener("click", function () {
        getCommentList(imgID, start, start + commentCount).then((list) => {
            showComments(commentListNode, list, start + commentCount, imgID);
        });
    });
    return button;
}

function showComments(commentListNode, commentList, start, imgID) {
    if (start !== commentCount) {
        commentListNode.removeChild(commentListNode.lastChild);
    }
    for (let i = 0, len = commentList.length; i < len; i++) {
        commentListNode.appendChild(generateCommentBlock(commentList[i]));
    }
    if (commentList.length >= commentCount) {
        commentListNode.appendChild(generateShowButton(commentListNode, start, imgID));
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
        if (getCurrentUser()) {
            addCommentField.classList.remove("none");
            addCommentField.nextElementSibling.classList.remove("none");
        } else {
            addCommentField.classList.add("none");
            addCommentField.nextElementSibling.classList.add("none");
        }
        getCommentList(imgID, 0, commentCount).then((list) => {
            if (list.length === 0 && !getCurrentUser()) {
                return;
            }
            authorBlock.classList.toggle('author-hover');
            commentBlock.classList.toggle('comm-hidden');
            commentBlock.classList.toggle('comm-visible');
            commentBlock.classList.toggle('none');
            endofdiv.classList.toggle('none');
            chatTrigger = true;
            showComments(commentList, list, commentCount, imgID);
        });
    }
}

function addComment() {
    let msg = textareaComm.value.trim();
    if (msg) {
        let commentJSON = {
            "user": getCurrentUser(),
            "text": msg,
            "img": imgID
        };
        chatCount.innerHTML = parseInt(chatCount.innerHTML) + 1;
        sendComment(commentJSON);
        commentList.insertBefore(generateCommentBlock(commentJSON), commentList.firstChild);
        callDiana(commentList);
    }
    textareaComm.value = "";
}




/*HOVER OVER IMAGE PAGE WITH TIMEOUT*/

let timeoutMouse;

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



