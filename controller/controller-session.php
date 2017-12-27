<?php
require_once __DIR__.'/../API/API.php';


$type = $_POST['type'];
$user = $_POST['user'];
$pass = $_POST['pass'];


$sessID = $_COOKIE["sessionID"];
$name = $_COOKIE["name"];
$authorID = selectSession($name, $sessID);

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

if ($type == 'PUT') {
    $res = auth($user, $pass);
    $response = [];
    if ($res === "active") {
        $response['status'] = "300";
    } else if ($res) {
        $sessionID = generateRandomString();
        if (insertSession($res, $sessionID)) {
            $response['status'] = "200";
            $response['sessionID'] = $sessionID;
            $response['user'] = getUserName($res);
        } else {
            $response['status'] = "403";
        }
    } else {
        $response['status'] = "403";
    }
    print json_encode($response);
} elseif ($type == 'GET') {
    print getUserName($authorID);
}
