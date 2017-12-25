<?php
require_once "DB.php";

function insertComment($photoID, $userID, $comment) {
    try {
        DB::run("INSERT INTO `comment` VALUES (?, ?, ?, ?)", [NULL, $userID, $photoID, $comment]);
    } catch (PDOException $e) {
        return false;
    }
    return true;
}

function getPhotoEmail($photoID) {
    try {
        $email = DB::run("SELECT `user`.email FROM `user`, `image` WHERE `user`.id = `image`.id_user AND `image`.id = ?", [$photoID])->fetch()['email'];
        return $email;
    } catch (PDOException $e) {
        return false;
    }
}

function selectCommentList($photoID, $first, $last) {
    try {
        $sql = "SELECT `comment`.id, `user`.login as user, `comment`.comment as text, `comment`.id_image as img
                FROM `comment`, `user`
                WHERE id_image = :imageid
                AND `comment`.id_user = `user`.id
                ORDER BY `comment`.id DESC
                LIMIT  :first, :max";
        $stmt = DB::instance()->prepare($sql);
        $stmt->bindValue(':imageid', $photoID, PDO::PARAM_STR);
        $stmt->bindValue(':first', intval($first), PDO::PARAM_INT);
        $stmt->bindValue(':max', intval($last) - intval($first), PDO::PARAM_INT);
        $stmt->execute();
        $res = $stmt->fetchAll();
        return $res;
    } catch (PDOException $e) {
        return false;
    }
}