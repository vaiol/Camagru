<?php
$upload_dir = "photos/";
$img = $_POST['hidden_data'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$file = $upload_dir . mktime() . ".png";
$success = file_put_contents($file, $data);
print $success ? $file : 'Unable to save the file.';


//ob_flush();
//ob_start();
//print_r($_POST);
//file_put_contents("dump.txt", ob_get_flush());