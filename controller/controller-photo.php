<?php
require_once __DIR__.'/../API/API.php';


function savePhoto($authorID)
{
    $img = $_POST['file'];
    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);

    $time = round(microtime(1) * 1000);
    $photoName = $authorID.$time.".jpg";
    $photoNameJPG = $authorID.$time.".jpg";

    $image = imagecreatefromstring($data);
    imagejpeg($image, UPLOAD_DIR.$photoName, 90);
    imagejpeg($image, COMPRESSED_DIR.$photoNameJPG, 20);

    putPhoto($photoName, $authorID);
}






function getBase64Src($array) {
    foreach ($array as $key => $elem) {
        $path = COMPRESSED_DIR.$elem['name'];
        $type = pathinfo($path, PATHINFO_EXTENSION);
        $data = file_get_contents($path);
        $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
        unset($array[$key]['name']);
        $array[$key]['src'] = $base64;
    }
    return $array;
}


function getMyPhotoList($authorID, $first, $last)
{
    $result = getUserPhotoList($authorID, $first, $last);
    $result = getBase64Src($result);
    $result = json_encode($result);
    print $result;
}

$type = $_POST['type'];
$login = $_POST['login'];


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




