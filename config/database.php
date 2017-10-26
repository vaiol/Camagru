<?php
DEFINE('DB_CHARSET', 'utf8');
DEFINE('DB_NAME', 'camagru');
DEFINE('DB_HOST', 'localhost');
DEFINE('DB_PORT', '3306');
DEFINE('DB_DSN', 'mysql:host='.DB_HOST.';port='.DB_PORT.';dbname='.DB_NAME.';charset='.DB_CHARSET);
DEFINE('DB_USER', 'root');
DEFINE('DB_PASSWORD', '123456');

DEFINE('UPLOAD_DIR', '../photos/');
DEFINE('COMPRESSED_DIR', UPLOAD_DIR.'compressed/');
