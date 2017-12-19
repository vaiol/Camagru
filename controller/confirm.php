<?php
require_once __DIR__.'/../API/API.php';
$code = $_GET['r'];
$res = activateUser($code);
if ($res === true) {
    header('Location: ../#activated');
} else {
    echo "error:".$code."/".print_r($res);
}