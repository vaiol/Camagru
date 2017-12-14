<?php

require_once __DIR__.'/../API/API.php';
require_once "mailSender.php";

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

$type = $_POST['type'];

if ($type == 'PUT') {
    $login = $_POST['login'];
    $email = $_POST['email'];
    $pass = $_POST['pass1'];

    if ($pass !== $_POST['pass2']) {
        print "303";
        return;
    } elseif (checkUserByEmail($email)) {
        print "301";
        return;
    } elseif (checkUserByLogin($login)) {
        print "302";
        return;
    } elseif (strlen($login) > 20 || strlen($login) < 4) {
        print "304";
        return;
    } elseif (strlen($pass) > 100) {
        print "304";
        return;
    }
    $code = generateRandomString();
    if (!add_user($email, $login, $pass, $code)) {
        print "304";
        return;
    }
    registerSend($email, $code);
    print "200";
}
