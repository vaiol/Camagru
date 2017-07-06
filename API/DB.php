<?php

require_once __DIR__.'/../config/database.php';

class DB
{
	protected static $instance = null;

	public function __construct() {}
	public function __clone() {}

	public static function instance()
	{
		if (self::$instance === null)
		{
			$opt  = array(
				PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
				PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
				PDO::ATTR_EMULATE_PREPARES   => TRUE,
			);
			self::$instance = new PDO(DB_DSN, DB_USER, DB_PASSWORD, $opt);
		}
		return self::$instance;
	}

	public static function __callStatic($method, $args)
	{
		return call_user_func_array(array(self::instance(), $method), $args);
	}

	public static function run($sql, $args = [])
	{
		$stmt = self::instance()->prepare($sql);
		$stmt->execute($args);
		return $stmt;
	}
}