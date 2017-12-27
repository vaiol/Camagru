<?php
require_once "DB.php";

function add_user($email, $login, $pass, $code) {
	try {
		DB::run("INSERT INTO `user` VALUES (?, ?, ?, ?, ?, ?, ?)", [NULL, $email, $login, hash('sha256', $pass), 0, $code, 1]);
	} catch (PDOException $e) {
		return false;
	}
	return true;
}

function activateUser($code) {
    try {
        $id = DB::run("SELECT `id` FROM `user` WHERE `activation_code` = ? AND `activated` = ?", [$code, 0])->fetch()['id'];
        if ($id) {
            $stmt = DB::run("UPDATE `user` SET `activation_code` = ?, `activated` = ? WHERE `id` = ?", ["empty", 1, $id]);
            if ($stmt->rowCount() > 0)
                return true;
            return $id;
        }
        return "ac";
    } catch (PDOException $e) {
        return "ad";
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

function checkUserByEmail($email) {
    try {
        $id = DB::run("SELECT `id` FROM `user` WHERE `email` = ?", [$email])->fetch();
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

function restorePassPhase1($user, $code) {
    try {
        $stmt = DB::run("SELECT `id`, `email` FROM `user` WHERE `activated` = ? AND (`email` = ? OR `login` = ?)", [1, $user, $user]);
        $stmt->rowCount();
        if ($stmt->rowCount() <= 0)
            return false;
        $result = $stmt->fetch();
        $stmt = DB::run("UPDATE `user` SET `activation_code` = ? WHERE `id` = ?", [$code, $result['id']]);
        if ($stmt->rowCount() <= 0)
            return false;
        return $result['email'];
    } catch (PDOException $e) {
        return false;
    }
}

function restorePassPhase2($user, $code, $pass) {
    try {
        $stmt = DB::run("SELECT `id` FROM `user` WHERE `activated` = ? AND `email` = ? AND `activation_code` = ?", [1, $user, $code]);
        $stmt->rowCount();
        if ($stmt->rowCount() <= 0)
            return "user not found";
        $result = $stmt->fetch();
        $stmt = DB::run("UPDATE `user` SET `activation_code` = ?, `password` = ? WHERE `id` = ?", ["1", hash('sha256', $pass), $result['id']]);
        if ($stmt->rowCount() <= 0)
            return "user not updated";
        return true;
    } catch (PDOException $e) {
        return $e;
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
