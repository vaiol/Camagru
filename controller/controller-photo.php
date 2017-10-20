<?php
require_once __DIR__.'/../API/API.php';
function savePhoto($authorID)
{
    $img = $_POST['file'];
    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    $upload_dir = "../photos/";
    $photoName = mktime().".png";
    $path = $upload_dir.$photoName;
    file_put_contents($path, $data);

    $result = putPhoto($photoName, $authorID);
    print $result;
}


function getMyPhotoList($authorID, $first, $last)
{
    $result = getUserPhotoList($authorID, $first, $last);
    var_dump($result);
}

$type = $_POST['type'];
$login = $_POST['login'];

echo 'login:'.$login.';';

$authorID = getUserId($login);

if (empty($authorID)) {
    http_response_code(403);
    return;
}

if ($type == 'PUT') {
    savePhoto($authorID);
}

if ($type == 'GET') {
    $list = $_POST['list'];
    if ($list === 'SINGLE') {
        $idPhoto = $_POST['id'];
    } else if ($list === 'MYLIST') {
        $first = intval($_POST['first']);
        $last = intval($_POST['last']);
        getMyPhotoList($authorID, $first, $last);
    } else if ($list === 'FEATURED') {
        $max = $_POST['max'];
    } else if ($list === 'ALL') {
        $first = $_POST['first'];
        $last = $_POST['last'];
    }
}




