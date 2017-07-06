<?php
require_once "DB.php";

function add_user($email, $pass) {
	try {
		DB::run("INSERT INTO `user` VALUES (?, ?, ?, ?)", [NULL, $email, hash('sha256', $pass), 0]);
	} catch (PDOException $e) {
		return false;
	}
	return true;
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

function auth($email, $password) {
	$password = hash('sha256', $password);
	try {
		$stmt = DB::run("SELECT `activated` FROM `user` WHERE `email` = ? AND `password` = ?", [$email, $password]);
		$stmt->rowCount();
		if ($stmt->rowCount() <= 0)
			return false;
		if ($stmt->fetch()['activated'] == 0)
			return 'active';
		return true;
	} catch (PDOException $e) {
		return false;
	}
}