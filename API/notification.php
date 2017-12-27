<?php
require_once "DB.php";

function getNotification($id) {
    try {
        $notif = DB::run("SELECT `notification` FROM `user` WHERE `id` = ? AND `activated` = ?", [$id, 1])->fetch()['notification'];
        return $notif;
    } catch (PDOException $e) {
        return $e;
    }
}

function insertNotification($id) {
    try {
        $stmt = DB::run("UPDATE `user` SET `notification` = ? WHERE `id` = ?", [1, $id]);
        return $stmt->rowCount();
    } catch (PDOException $e) {
        return $e;
    }
}

function deleteNotification($id) {
    try {
        $stmt = DB::run("UPDATE `user` SET `notification` = ? WHERE `id` = ?", [0, $id]);
        return $stmt->rowCount();
    } catch (PDOException $e) {
        return $e;
    }
}