<?php
require_once __DIR__.'/../API/API.php';

$type = $_POST['type'];

$sessID = $_COOKIE["sessionID"];
$name = $_COOKIE["name"];
$authorID = selectSession($name, $sessID);


if ($type == 'GET') {
    print getNotification($authorID);
} elseif ($type == 'PUT') {
    print insertNotification($authorID);
} elseif ($type == 'DELETE') {
    print deleteNotification($authorID);
}