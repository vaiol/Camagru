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
    if (start !== 15) {
        comentListNode.removeChild(comentListNode.lastChild);
    }
    for (var i = 0, len = commentList.length; i < len; i++) {
        comentListNode.appendChild(generateCommentBlock(commentList[i]));
    }
    if (commentList.length >= 15) {
        comentListNode.appendChild(generateShowButton(comentListNode, start, imgID));
    }
}