<?php
require_once "DB.php";

function add_user($email, $login, $pass) {
	try {
		DB::run("INSERT INTO `user` VALUES (?, ?, ?, ?, ?)", [NULL, $email, $login, hash('sha256', $pass), 0]);
	} catch (PDOException $e) {
		return false;
	}
	return true;
}

function checkUserByEmail($email) {
    try {
        $id = DB::run("SELECT `id` FROM `user` WHERE `email` = ? AND", [$email])->fetch();
        if ($id) {
            return true;
        }
        return false;
    } catch (PDOException $e) {
        return false;
    }
}

function checkUserByLogin($login) {
    try {
        $id = DB::run("SELECT `id` FROM `user` WHERE `login` = ? AND", [$login])->fetch();
        if ($id) {
            return true;
        }
        return false;
    } catch (PDOException $e) {
        return false;
    }
}

function change_pass($email, $oldpw, $newpw) {
	$old_pass = hash('sha256', $oldpw);
	$new_pass = hash('sha256', $newpw);
	try {
		$id = DB::run("SELECT `id` FROM `user` WHERE `email` = ? AND `password` = ?", [$email, $old_pass])->fetch();
		$stmt = DB::run("UPDATE `user` SET `password` = ? WHERE `id` = ?", [$new_pass, $id]);
		if ($stmt->rowCount() > 0)
			return true;
	} catch (PDOException $e) {
		return false;
	}
	return false;
}

function auth($user, $password) {
	$password = hash('sha256', $password);
	try {
		$stmt = DB::run("SELECT `id`, `activated` FROM `user` WHERE `password` = ? AND (`email` = ? OR `login` = ?)", [$password, $user, $user]);
		$stmt->rowCount();
		if ($stmt->rowCount() <= 0)
			return false;
		$result = $stmt->fetch();
		if ($result['activated'] == 0)
			return 'active';
		return $result['id'];
	} catch (PDOException $e) {
		return false;
	}
}

function getUserId($login) {
    try {
        $id = DB::run("SELECT `id` FROM `user` WHERE `login` = ? AND `activated` = ?", [$login, 1])->fetch()['id'];
        return $id;
    } catch (PDOException $e) {
        return false;
    }
}


function getUserName($id) {
    try {
        $login = DB::run("SELECT `login` FROM `user` WHERE `id` = ? AND `activated` = ?", [$id, 1])->fetch()['login'];
        return $login;
    } catch (PDOException $e) {
        return false;
    }
}

function insertSession($userID, $sessionID) {
    try {
        DB::run("INSERT INTO `session` VALUES (?, ?, ?)", [null, $userID, $sessionID]);
        return true;
    } catch (PDOException $e) {
        return $e;
    }
}

function selectSession($user, $sessionID) {
    $userID = getUserId($user);
    try {
        $id = DB::run("SELECT `id` FROM `session` WHERE `userID` = ? AND `sessionID` = ?", [$userID, $sessionID])->fetch()['id'];
        if ($id) {
            return $userID;
        }
        return $id;
    } catch (PDOException $e) {
        return false;
    }
}