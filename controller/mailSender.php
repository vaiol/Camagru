<?php
require_once __DIR__.'/../API/API.php';
function getLink($link) {
    $arr = explode('/', $_SERVER['PHP_SELF']);
    if(!empty($arr[count($arr)-1])) {
        unset($arr[count($arr)-1]);
    }
    if(!empty($arr[count($arr)-1])) {
        unset($arr[count($arr)-1]);
    }
    $file = implode('/',$arr);
    $file .= '/'.$link;
    return $file;
}

function sendMail($mail_to, $mail_subject, $mail_message) {
    $encoding = "utf-8";
    $subject_preferences = array(
        "input-charset" => $encoding,
        "output-charset" => $encoding,
        "line-length" => 76,
        "line-break-chars" => "\r\n"
    );
    $from_mail = "noreply@".$_SERVER['HTTP_HOST'];
    $from_name = "noreply";
    $header  = "Content-type: text/html; charset=".$encoding." \r\n";
    $header .= "From: ".$from_name." <".$from_mail."> \r\n";
    $header .= "Reply-To: ".$from_mail."\r\n";
    $header .= "X-Mailer: PHP/".phpversion()."\r\n";
    $header .= "MIME-Version: 1.0 \r\n";
    $header .= "Content-Transfer-Encoding: 8bit \r\n";
    $header .= "Date: ".date("r (T)")." \r\n";
    $header .= iconv_mime_encode("Subject", $mail_subject, $subject_preferences);
    mail($mail_to, $mail_subject, $mail_message, $header);
}

function registerSend($email, $code) {
    $actual_link = $_SERVER["REQUEST_SCHEME"].'://'.$_SERVER['HTTP_HOST'].getLink("confirm");
    sendMail($email, "Confirm registration on Camagru!", "Heloo Yopta!<br>
    Looks like you try to register on Camagru project!<br>
    It's great! But, you need to confirm your decision checking this link: ".$actual_link."?c=".$code."<br>");
}

function restoreSend($email, $code) {
    $actual_link = $_SERVER["REQUEST_SCHEME"].'://'.$_SERVER['HTTP_HOST'].getLink('restore');
    sendMail($email, "Restore pass on Camagru!", "Heloo Yopta!<br>
    Looks like you try to change pass on Camagru project!<br>
    It's great! But, you need to confirm your decision checking this link: ".$actual_link."?c=".$code."&u=".$email."<br>");
}

function commentSend($email, $photoID, $author, $comment) {
    $actual_link = $_SERVER["REQUEST_SCHEME"].'://'.$_SERVER['HTTP_HOST'].getLink("photo/".$photoID);
    sendMail($email, "New comment on Camagru!", "Heloo Yopta!<br>
    Looks like you have new comment on your photo!<br>
    You can check it by this link: ".$actual_link."<br>"
    ."Author: ".$author."<br>"
    ."Comment: ".$comment."<br>");
}

