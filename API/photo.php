<?php
require_once "DB.php";
function insertPhoto($photoName, $authorID) {
    try {
        DB::run("INSERT INTO `image` VALUES (?, ?, ?)", [NULL, $authorID, $photoName]);
    } catch (PDOException $e) {
        return false;
    }
    return true;
}

function selectUserPhotoList($authorID, $first, $last) {
    try {
        $sql = "SELECT image.id, `user`.login as `user`, image.name, COUNT(likes.id_image) AS `likeCount`, COUNT(`comment`.id_image) AS `chatCount`
                FROM `user`, image LEFT JOIN likes
                  ON image.id = likes.id_image
                LEFT JOIN `comment`
                  ON image.id = `comment`.`id_image`
                WHERE image.id_user = :id 
                AND `user`.`id` = `image`.id_user
                GROUP BY `image`.id
                ORDER BY `image`.id DESC
                LIMIT :first, :last";
        $stmt = DB::instance()->prepare($sql);
        $stmt->bindValue(':id', $authorID, PDO::PARAM_STR);
        $stmt->bindValue(':first', intval($first), PDO::PARAM_INT);
        $stmt->bindValue(':last', intval($last), PDO::PARAM_INT);
        $stmt->execute();
        $res = $stmt->fetchAll();
        return $res;
    } catch (PDOException $e) {
        return $e;
    }
}

function selectPhotoList($first, $last) {
    try {
        $sql = "SELECT image.id, `user`.login as `user`, image.name, COUNT(likes.id_image) AS `likeCount`, COUNT(`comment`.id_image) AS `chatCount`
                FROM `user`, image LEFT JOIN likes
                  ON image.id = likes.id_image
                LEFT JOIN `comment`
                  ON image.id = `comment`.`id_image`
                WHERE `user`.`id` = `image`.id_user
                GROUP BY `image`.id
                ORDER BY `image`.id DESC
                LIMIT :first, :last";
        $stmt = DB::instance()->prepare($sql);
        $stmt->bindValue(':first', intval($first), PDO::PARAM_INT);
        $stmt->bindValue(':last', intval($last), PDO::PARAM_INT);
        $stmt->execute();
        $res = $stmt->fetchAll();
        return $res;
    } catch (PDOException $e) {
        return $e;
    }
}