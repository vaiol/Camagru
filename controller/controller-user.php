<?php

require_once __DIR__.'/../API/API.php';


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
    }
    if (!add_user($email, $login, $pass)) {
        print "304";
        return;
    }
    print "200";
}
