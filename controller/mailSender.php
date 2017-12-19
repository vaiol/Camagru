<?php
require_once __DIR__.'/../API/API.php';
function registerSend($email, $code) {
    $arr = explode('/', $_SERVER['PHP_SELF']);
    if(!empty($arr[count($arr)-1])) {
        unset($arr[count($arr)-1]);
    }
    $file = implode('/',$arr);
    $file .= '/confirm.php';
    $actual_link = $_SERVER["REQUEST_SCHEME"].'://'.$_SERVER['HTTP_HOST'].$file;
    sendMail($email, "Confirm registration on Camagru", "Heloo Yopta!<br>
    Looks like you try to register on Camagru project!<br>
    It's great! But, you need to confirm your decision checking this link: ".$actual_link."?r=".$code
    ."<br>".$_SERVER['PHP_SELF']);
}

function sendMail($mail_to, $mail_subject, $mail_message) {
    $encoding = "utf-8";

    // Set preferences for Subject field
    $subject_preferences = array(
        "input-charset" => $encoding,
        "output-charset" => $encoding,
        "line-length" => 76,
        "line-break-chars" => "\r\n"
    );

    // Set mail header
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

    // Send mail
    mail($mail_to, $mail_subject, $mail_message, $header);
}
