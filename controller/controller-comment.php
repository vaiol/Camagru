<?php
require_once __DIR__.'/../API/API.php';
require_once "mailSender.php";

$type = $_POST['type'];
$photoID = $_POST['img'];

$authorID = selectSession($_COOKIE["name"], $_COOKIE["sessionID"]);


if ($type == 'PUT') {
    if (empty($authorID)) {
        http_response_code(403);
        return;
    }
    $comment = $_POST['text'];
    putComment($photoID, $authorID, $comment);
}

if ($type == 'GET') {
    $first = $_POST['first'];
    $last = $_POST['last'];
    getCommentList($photoID, $first, $last);
}



function putComment($photoID, $authorID, $comment) {
    insertComment($photoID, $authorID, $comment);
    $arr = getPhotoEmail($photoID);
    if ($arr['notification'] != 1) {
        return ;
    }
    $n = getUserName($authorID);
    $e = $arr['email'];
    commentSend($e, $photoID, $n, $comment);
}

function getCommentList($photoID, $first, $last) {
    $result = selectCommentList($photoID, $first, $last);
    $result = json_encode($result);
    print $result;
}