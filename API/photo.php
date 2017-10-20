<?php
require_once "DB.php";
function putPhoto($photoName, $authorID) {
    try {
        DB::run("INSERT INTO `image` VALUES (?, ?, ?)", [NULL, $authorID, $photoName]);
    } catch (PDOException $e) {
        return false;
    }
    return true;
}

function getUserPhotoList($authorID, $first, $last) {
    try {
        $sql = "SELECT `image`.id, `user`.login, `image`.name
                              FROM `image`, `user`
                              WHERE `image`.id_user = :id
                              AND `user`.`id` = `image`.id_user
                              ORDER BY `image`.id DESC
                              LIMIT :first, :last";
        $stmt = DB::instance()->prepare($sql);
        $stmt->bindValue(':id', $authorID, PDO::PARAM_STR);
        $stmt->bindValue(':first', intval($first), PDO::PARAM_INT);
        $stmt->bindValue(':last', intval($last), PDO::PARAM_INT);
        $stmt->execute();
        $res = $stmt->fetch();
        return $res;
    } catch (PDOException $e) {
        return $e;
    }
    return $res;
}