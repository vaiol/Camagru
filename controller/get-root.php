<?php
$arr = explode('/', $_SERVER['PHP_SELF']);
if(!empty($arr[count($arr)-1])) {
    unset($arr[count($arr)-1]);
}
if(!empty($arr[count($arr)-1])) {
    unset($arr[count($arr)-1]);
}
$file = implode('/',$arr);
$file = $file.'/';

print $file;