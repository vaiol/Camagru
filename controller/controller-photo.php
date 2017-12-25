<?php
require_once __DIR__.'/../API/API.php';


function resize_image($image, $w, $h) {

    $width = imagesx($image);
    $height = imagesy($image);
    $r = $width / $height;
    if ($w / $h > $r) {
        $new_width = $h * $r;
        $new_height = $h;
    } else {
        $new_height = $w / $r;
        $new_width = $w;
    }
    $dst = imagecreatetruecolor($new_width, $new_height);
    imagecopyresampled($dst, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
    return $dst;
}

function crop_image($image) {
    $ratio = 1.7777777778;
    $shiftX = 0;
    $shiftY = 0;
    $width = imagesx($image);
    $height = imagesy($image);
    $expectedHeight = $width / $ratio;
    if ($expectedHeight < $height) {
        $shiftY = ($height - $expectedHeight) / 2;
        $height = $expectedHeight;
    } else {
        $expectedWidth = $height * $ratio;
        $shiftX = ($width - $expectedWidth) / 2;
        $width = $expectedWidth;
    }
    $image_cropped = imagecrop($image, ['x' => $shiftX, 'y' => $shiftY, 'width' => $width, 'height' => $height]);
    return $image_cropped;
}


function savePhoto($authorID) {
    $img = $_POST['file'];
    $img = str_replace('data:image/jpeg;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    $time = round(microtime(1) * 1000);
    $photoName = $authorID.$time.".jpg";
    $photoNameJPG = $authorID.$time.".jpg";

    //SAVE ORIGINAL PHOTO WITH SMALL COMPRESSION
    $image = imagecreatefromstring($data);
    imagejpeg($image, UPLOAD_DIR.$photoName, 90);
    //RESIZE CROP AND COMPRESS PHOTO
    $image = resize_image($image, 425, 425);
    $image = crop_image($image);
    imagejpeg($image, COMPRESSED_DIR.$photoNameJPG, 25);
    //SAVE PHOTO TO DB
    insertPhoto($photoName, $authorID);
}

function savePhotoDouble($authorID) {
    $img1 = $_POST['file1'];
    $img1 = str_replace('data:image/jpeg;base64,', '', $img);
    $img1 = str_replace(' ', '+', $img);

    $img2 = $_POST['file2'];
    $img2 = str_replace('data:image/jpeg;base64,', '', $img);
    $img2 = str_replace(' ', '+', $img);

    $data1 = base64_decode($img1);
    $data2 = base64_decode($img2);

    $image1 = imagecreatefromstring($data1);
    $image2 = imagecreatefromstring($data2);

    imagealphablending($image1, false);
    imagesavealpha($image1, true);
    list($width, $height) = getimagesize($image1);
    imagecopymerge($image1, $image2, $width / 2, $height / 2, 0, 0, $width / 2, $height / 2, 100); //have to play with these numbers for it to work for you, etc.




    //SAVE ORIGINAL PHOTO WITH SMALL COMPRESSION
    $time = round(microtime(1) * 1000);
    $photoName = $authorID.$time.".jpg";
    $photoNameJPG = $authorID.$time.".jpg";
    imagejpeg($image1, UPLOAD_DIR.$photoName, 90);
    //RESIZE CROP AND COMPRESS PHOTO
    $image = resize_image($image1, 425, 425);
    $image = crop_image($image);
    imagejpeg($image, COMPRESSED_DIR.$photoNameJPG, 25);
    //SAVE PHOTO TO DB
    insertPhoto($photoName, $authorID);
}

function removePhoto($authorID, $id) {
    $photo = selectPhotoOwner($id);
    if ($photo['id_user'] != $authorID) {
        http_response_code(403);
        return;
    }
    echo $photo['name'];
    $path = realpath(UPLOAD_DIR.$photo['name']);
    if (is_writable($path)) {
        unlink($path);
    }
    $path = realpath(COMPRESSED_DIR.$photo['name']);
    if (is_writable($path)) {
        unlink($path);
    }

    deletePhoto($id, $authorID);
}





function getBase64Src($array, $dir) {
    foreach ($array as $key => $elem) {
        $path = $dir.$elem['name'];
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
    $result = selectUserPhotoList($authorID, $first, $last);
    $result = getBase64Src($result, COMPRESSED_DIR);
    $result = json_encode($result);
    print $result;
}

function getPhotoList($first, $last)
{
    $result = selectPhotoList($first, $last);
    $result = getBase64Src($result, COMPRESSED_DIR);
    $result = json_encode($result);

    print $result;
}

function getFeaturedPhotoList($max)
{
    $result = selectFeaturedPhotoList($max);
    $result = getBase64Src($result, COMPRESSED_DIR);
    $result = json_encode($result);
    print $result;
}

function getPhotoByID($id) {
    $result = selectPhotoByID($id);
    $path = UPLOAD_DIR.$result['name'];
    unset($result['name']);
    $type = pathinfo($path, PATHINFO_EXTENSION);
    $data = file_get_contents($path);
    $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
    $result['src'] = $base64;
    $result = json_encode($result);
    print $result;
}

$type = $_POST['type'];
$authorID = selectSession($_COOKIE["name"], $_COOKIE["sessionID"]);


if ($type == 'PUT') {
    savePhoto($authorID);
} elseif ($type == 'GET') {
    $list = $_POST['list'];
    if ($list === 'SINGLE') {
        $idPhoto = $_POST['id'];
        getPhotoByID($idPhoto);
    } else if ($list === 'MYLIST') {
        if (empty($authorID)) {
            http_response_code(403);
            return;
        }
        $first = intval($_POST['first']);
        $last = intval($_POST['last']);
        getMyPhotoList($authorID, $first, $last);
    } else if ($list === 'FEATURED') {
        $max = $_POST['max'];
        getFeaturedPhotoList($max);
    } else if ($list === 'ALL') {
        $first = intval($_POST['first']);
        $last = intval($_POST['last']);
        getPhotoList($first, $last);
    }
} elseif ($type == 'DELETE') {
    $idPhoto = $_POST['id'];
    removePhoto($authorID, $idPhoto);
} elseif ($type == 'DOUBLE') {
    savePhotoDouble($authorID);
}




