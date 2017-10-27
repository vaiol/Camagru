<?php
require_once __DIR__.'/../API/API.php';


$type = $_POST['type'];
$login = $_POST['login'];

$authorID = getUserId($login);

if (empty($authorID)) {
    http_response_code(403);
    return;
}

if ($type == 'PUT') {

}

if ($type == 'GET') {
    $user = $_POST['user'];
    getUserAvatar($user);
}

function getUserAvatar($user) {
    $userID = getUserId($user);

    $path = realpath(AVA_DIR.$userID.'.jpg');
    if (!file_exists($path)) {
        $path = AVA_DIR.'1.jpg';
    }
    $type = pathinfo($path, PATHINFO_EXTENSION);
    $data = file_get_contents($path);
    $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
    print $base64;
}
