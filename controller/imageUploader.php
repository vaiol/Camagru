<?php
$file = $_FILES['image']['tmp_name'];

//$uploadfile =. basename($_FILES['image']['name']);

//echo '<pre>';

//$type = pathinfo($path, PATHINFO_EXTENSION);
//$data = file_get_contents($path);
//$base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
//
//
//print $base64;

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


$image = resize_image($file, 1000, 1000);

print $image;



echo 'Некоторая отладочная информация:';
print_r($_FILES);

