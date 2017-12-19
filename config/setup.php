<?php
require_once __DIR__.'/../API/API.php';
$opt  = array(
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => TRUE,
);
if (!is_dir(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0770);
    mkdir(COMPRESSED_DIR, 0770);
    mkdir(AVA_DIR, 0770);

    $uDir = '../img/photos-f/';
    $cDir = $uDir.'compressed/';
    $aDir = $uDir.'ava/';
    $i = 1;

    for (;$i <= 18; $i++) {
        $file = 'i'.$i.'.jpg';
        copy($uDir.$file, UPLOAD_DIR.$file);
        copy($cDir.$file, COMPRESSED_DIR.$file);
        $file = $i.'.jpg';
        if (file_exists($aDir.$file)) {
            copy($aDir.$file, AVA_DIR.$file);
        }
    }
    print "COPYING FILES COMPLETED SUCCESSFUL<br>";
}
try {



    $pdo = new PDO('mysql:host='.DB_HOST.';port='.DB_PORT.';dbname=;charset='.DB_CHARSET, DB_USER, DB_PASSWORD, $opt);
    $pdo->query('CREATE DATABASE IF NOT EXISTS '.DB_NAME);
    $pdo->query('USE '.DB_NAME);
    //CREATE USER TABLE
    $pdo->query('DROP TABLE IF EXISTS `user`');
    $pdo->query('CREATE TABLE `user` (
                              `id` int(11) NOT NULL,
                              `email` varchar(254) NOT NULL,
                              `login` varchar(22) NOT NULL,
                              `password` varchar(254) NOT NULL,
                              `activated` tinyint(1) NOT NULL,
                              `activation_code` varchar(10) NOT NULL
                            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;');
    $pdo->query('ALTER TABLE `user`
                                  ADD PRIMARY KEY (`id`),
                                  ADD UNIQUE KEY `email` (`email`);');
    $pdo->query('ALTER TABLE `user`
                                  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;');
    //CREATE LIKES TABLE
    $pdo->query('DROP TABLE IF EXISTS `likes`');
    $pdo->query('CREATE TABLE `likes` (
                                  `id_user` int(11) NOT NULL,
                                  `id_image` int(11) NOT NULL
                                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;');
    $pdo->query('ALTER TABLE `likes` ADD PRIMARY KEY( `id_user`, `id_image`);');
    //CREATE IMAGE TABLE
    $pdo->query('DROP TABLE IF EXISTS `image`');
    $pdo->query('CREATE TABLE `image` (
                                  `id` int(11) NOT NULL,
                                  `id_user` int(11) NOT NULL,
                                  `name` varchar(40) NOT NULL
                                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;');
    $pdo->query('ALTER TABLE `image`
                                  ADD PRIMARY KEY (`id`);');
    $pdo->query('ALTER TABLE `image`
                                  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;');
    //CREATE COMMENT TABLE
    $pdo->query('DROP TABLE IF EXISTS `comment`');
    $pdo->query('CREATE TABLE `comment` (
                                  `id` int(11) NOT NULL,
                                  `id_user` int(11) NOT NULL,
                                  `id_image` int(11) NOT NULL,
                                  `comment` varchar(2000) NOT NULL
                                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;');
    $pdo->query('ALTER TABLE `comment`
                                  ADD PRIMARY KEY (`id`);');
    $pdo->query('ALTER TABLE `comment`
                                  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;');

    $pdo->query('DROP TABLE IF EXISTS `session`');
    $pdo->query('CREATE TABLE `session` (
                              `id` int(11) NOT NULL,
                              `userID` int(11) NOT NULL,
                              `sessionID` varchar(20) NOT NULL
                            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;');
    $pdo->query('ALTER TABLE `session`
                               ADD PRIMARY KEY (`id`);');
    $pdo->query('ALTER TABLE `session`
                                  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;');



    $pdo->query("INSERT INTO `user` (`id`, `email`, `login`, `password`, `activated`, `activation_code`) VALUES ('1', 'vaiol.ans@gmail.com', 'admin', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '1', '0');");
    $pdo->query("INSERT INTO `user` (`id`, `email`, `login`, `password`, `activated`, `activation_code`) VALUES ('2', 'alexander.stepano@gmail.com', 'AUTHOR', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '1', '0');");
    $pdo->query("INSERT INTO `user` (`id`, `email`, `login`, `password`, `activated`, `activation_code`) VALUES ('3', 'astepano@student.unit.ua', 'Diana', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '1', '0');");

    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('1', '1');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('1', '2');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('1', '3');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('1', '4');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('1', '5');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('1', '6');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('1', '7');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('1', '8');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('1', '9');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('1', '10');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('1', '11');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('1', '12');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('1', '13');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('1', '14');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('1', '15');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('1', '16');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('1', '17');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('1', '18');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('2', '1');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('2', '2');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('2', '3');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('2', '4');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('2', '5');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('2', '6');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('2', '7');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('2', '8');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('2', '9');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('2', '10');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('2', '11');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('2', '12');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('2', '13');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('2', '14');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('2', '15');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('2', '16');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('2', '17');");
    $pdo->query("INSERT INTO `likes` (`id_user`, `id_image`) VALUES ('2', '18');");

    $pdo->query("INSERT INTO `image` (`id`, `id_user`, `name`) VALUES ('1', '1', 'i1.jpg')");
    $pdo->query("INSERT INTO `image` (`id`, `id_user`, `name`) VALUES ('2', '1', 'i2.jpg')");
    $pdo->query("INSERT INTO `image` (`id`, `id_user`, `name`) VALUES ('3', '1', 'i3.jpg')");
    $pdo->query("INSERT INTO `image` (`id`, `id_user`, `name`) VALUES ('4', '1', 'i4.jpg')");
    $pdo->query("INSERT INTO `image` (`id`, `id_user`, `name`) VALUES ('5', '1', 'i5.jpg')");
    $pdo->query("INSERT INTO `image` (`id`, `id_user`, `name`) VALUES ('6', '1', 'i6.jpg')");
    $pdo->query("INSERT INTO `image` (`id`, `id_user`, `name`) VALUES ('7', '1', 'i7.jpg')");
    $pdo->query("INSERT INTO `image` (`id`, `id_user`, `name`) VALUES ('8', '1', 'i8.jpg')");
    $pdo->query("INSERT INTO `image` (`id`, `id_user`, `name`) VALUES ('9', '1', 'i9.jpg')");
    $pdo->query("INSERT INTO `image` (`id`, `id_user`, `name`) VALUES ('10', '1', 'i10.jpg')");
    $pdo->query("INSERT INTO `image` (`id`, `id_user`, `name`) VALUES ('11', '1', 'i11.jpg')");
    $pdo->query("INSERT INTO `image` (`id`, `id_user`, `name`) VALUES ('12', '1', 'i12.jpg')");
    $pdo->query("INSERT INTO `image` (`id`, `id_user`, `name`) VALUES ('13', '1', 'i13.jpg')");
    $pdo->query("INSERT INTO `image` (`id`, `id_user`, `name`) VALUES ('14', '1', 'i14.jpg')");
    $pdo->query("INSERT INTO `image` (`id`, `id_user`, `name`) VALUES ('15', '1', 'i15.jpg')");
    $pdo->query("INSERT INTO `image` (`id`, `id_user`, `name`) VALUES ('16', '1', 'i16.jpg')");
    $pdo->query("INSERT INTO `image` (`id`, `id_user`, `name`) VALUES ('17', '1', 'i17.jpg')");
    $pdo->query("INSERT INTO `image` (`id`, `id_user`, `name`) VALUES ('18', '1', 'i18.jpg')");

    $pdo->query("INSERT INTO `comment` (`id`, `id_user`, `id_image`, `comment`) VALUES ('1', '1', '5', 'sfgdfghfghdghdfgh dg fgh f gdddh ');");
    $pdo = null;
} catch (PDOException $e) {
    echo 'ERROR!!!</p></div><br><div><p>'.$e->getMessage();
    exit();
}
echo "SETUP DB COMPLETED SUCCESSFUL";
header( "refresh:3;url=../" );
?>
