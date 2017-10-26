<?php
require_once __DIR__.'/../API/API.php';




$type = $_POST['type'];
$login = $_POST['login'];
$photoID = $_POST['img'];

$authorID = getUserId($login);

if (empty($authorID)) {
    http_response_code(403);
    return;
}

if ($type == 'PUT') {
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
}

function getCommentList($photoID, $first, $last) {
    $result = selectCommentList($photoID, $first, $last);
    $result = json_encode($result);
    print $result;
}