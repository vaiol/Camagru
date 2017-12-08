<?php
require_once __DIR__.'/../API/API.php';

$type = $_POST['type'];
$id = $_POST['id'];

$authorID = selectSession($_COOKIE["name"], $_COOKIE["sessionID"]);

if (empty($authorID)) {
    http_response_code(403);
    return;
}

if ($type == 'PUT') {
    like($id, $authorID);
}

if ($type == 'GET') {
    isLiked($id, $authorID);
}

if ($type == 'DELETE') {
    dislike($id, $authorID);
}


function like($id, $authorID) {
    insertLike($id, $authorID);
}

function isLiked($id, $authorID) {
    print selectIsLiked($id, $authorID);
}

function dislike($id, $authorID) {
    deleteLike($id, $authorID);
}
