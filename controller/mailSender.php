<?php
require_once __DIR__.'/../API/API.php';
function registerSend($email, $code) {
    $actual_link = 'http://'. " _ ".$_SERVER['HTTP_HOST']." _ ".$_SERVER['PHP_SELF'];
    sendMail($email, "Confirm registration on Camagru", "Heloo Yopta!\n
    Looks like you try to register on Camagru project!\n
     It's great! But, you need to confirm your decision checking this link: ".$actual_link."?r=".$code);
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



registerSend("vaiol.ans@gmail.com", "123");


$code = $_GET['r'];
$res = activateUser($code);
if ($res === true) {
    header('Location: ../#activated');
} else {
    echo "Error activate user!";
}
header('Location: ../#activated');
//header('Location: ../');
