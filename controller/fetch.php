<?php
header("Content-type: image/gif");
$url = $_GET['url'];



$path = 'img/clear.gif';
$ch = curl_init($url);
$fp = fopen($path, 'wb');
curl_setopt($ch, CURLOPT_FILE, $fp);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_exec($ch);
curl_close($ch);
fclose($fp);


$type = pathinfo($path, PATHINFO_EXTENSION);
$data = file_get_contents($path);
$base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);


print $base64;
