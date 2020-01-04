/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : ASC_SYSTEM

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-07-30 15:58:41
*/

SET FOREIGN_KEY_CHECKS=0;


-- ----------------------------
-- Table structure for `file`
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
`user_id` varchar(42) NOT NULL,
`address`  varchar(42) NOT NULL,
`hash` varchar(100) NOT NULL,
`number` int,
`item` varchar(20),
`pass` int
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for `who`
-- ----------------------------
DROP TABLE IF EXISTS `who`;
CREATE TABLE `who` (
`number` int,
PRIMARY KEY (`number`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for `checker_result`
-- ----------------------------
-- DROP TABLE IF EXISTS `checker_result`;
-- CREATE TABLE `checker_result` (
-- `address` varchar(100) NOT NULL,
-- `hash` varchar(100) NOT NULL,
-- `item`  varchar(17) ,
-- PRIMARY KEY (`hash`)
-- )ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -- ----------------------------
-- -- Table structure for `contracts`
-- -- ----------------------------
-- DROP TABLE IF EXISTS `contracts`;
-- CREATE TABLE `contracts` (
-- `address` varchar(100) ,
-- `hash` varchar(100) NOT NULL,
-- `item`  varchar(17) ,
-- `pass` int

-- )ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `check`
-- ----------------------------
DROP TABLE IF EXISTS `audit`;
CREATE TABLE `audit` (
`address` varchar(100) ,
`hash` varchar(100) NOT NULL,
`item`  varchar(20) ,
`pass` int
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `result`
-- ----------------------------
DROP TABLE IF EXISTS `result`;
CREATE TABLE `result` (
`hash` varchar(100) NOT NULL,
`res`  varchar(17) ,
`address1` varchar(50),
`address2` varchar(50),
`address3` varchar(50),
`address4` varchar(50),
`address5` varchar(50)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
`address` varchar(42) NOT NULL,
`credit` float DEFAULT NULL,
`orderr` int,
PRIMARY KEY (`address`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- ----------------------------
-- Table structure for `checker`
-- ----------------------------
DROP TABLE IF EXISTS `checker`;
CREATE TABLE `checker` (
`address` varchar(42) NOT NULL,
`credit` float DEFAULT NULL,
`orderr` int,
PRIMARY KEY (`address`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `system_account`
-- ----------------------------
DROP TABLE IF EXISTS `system_account`;
CREATE TABLE `system_account` (
`address` varchar(42) NOT NULL,
`credit` float DEFAULT NULL,
PRIMARY KEY (`address`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `checker` VALUES ('0xa86b499cadcf5690cf9e06d022a2c2031539c9bb',0,1 );/*lcs170717*/
INSERT INTO `checker` VALUES ('0xd1ac597d45d600d44d9140a8015f2f3562cfdd9e',0,2 );/*lcs170718*/
INSERT INTO `checker` VALUES ('0x31a270240da21941461b24078932d32cc426e16b',0,3 );/*lcs170719*/
INSERT INTO `checker` VALUES ('0x5e0c48546e353624119fee51d214ee554bfaf279',0,4 );/*lcs170720*/
     INSERT INTO `checker` VALUES ('0xf645003b97a9d5b9a61e446eb7bdc63e56ba6a7d',0,5 );/*lcs170721*/
     INSERT INTO `checker` VALUES ('0xed323a4837b7e58164845aeba5301f88d6603827',0,6 );/*lcs170722*/
INSERT INTO `checker` VALUES ('0x350e6ec94443186e3f10b35db9ba2d48bbb21b44',0,7 );/*lcs170723*/
INSERT INTO `checker` VALUES ('0xce5fb257dc912d394d6981e697a315bbed7b92f3',0,8 );/*lcs170724*/
     INSERT INTO `checker` VALUES ('0xf3f780d266e561dbc861c1e5651b7906d8c29b56',0,9 );/*lcs170725*/
INSERT INTO `checker` VALUES ('0x9426718b6839de928464a4ba8faa4377b9b09c93',0,10 );/*lcs170726*/
INSERT INTO `checker` VALUES ('0x68ce1f26904feef36a98ecd3ed19d9a097b945d8',0,11 );/*lcs170727*/
INSERT INTO `checker` VALUES ('0x656a13c7372c182f120ced26a39f230cefb0e995',0 ,12);/*lcs170728*/
INSERT INTO `checker` VALUES ('0x66784b6af407c1ab27db6924a9fddc0dc0943eac',0 ,13);/*lcs170729*/
INSERT INTO `checker` VALUES ('0x09609c3debe56e1e55fb6ec019969c069dc00310',0 ,14);/*lcs170730*/
INSERT INTO `checker` VALUES ('0x00630694f371c54d916d6b399ac87436ac05b232',0 ,15);/*lcs170731*/
INSERT INTO `checker` VALUES ('0x1f21a8f891b278ed762af9ba07423d6cb0e39278',0 ,16);/*lcs170732*/
    INSERT INTO `checker` VALUES ('0xebbcfcac8a2ef2f7160162f4d3b707820f4c2bf8',0 ,17);/*lcs170733*/
INSERT INTO `checker` VALUES ('0x322f8a39270a0549f0f402f5c368daea606a479b',0 ,18);/*lcs170734*/
INSERT INTO `checker` VALUES ('0xd2b3096c479d83834e42a6dff9e1c2f9ab3d883c',0 ,19);/*lcs170735*/
     INSERT INTO `checker` VALUES ('0xe46ae0fe33b3534a64d688e5e71f94fe33cd974f',0,20 );/*lcs170736*/
INSERT INTO `system_account` VALUES ('0xf0f5acaab770a9443b6c239fc1b3a19061db4098',0 );/*lcs170736*/
INSERT INTO `who` VALUES(0);
/*
enough ensure step muscle drop safe uniform host citizen material object calm
father farm tourist myth debate mass legend coach panther rice brand huge
blue vault wonder old surge train fence cable ripple rib sponsor drum
fetch census broom kit uphold glad fire memory release there palace truly
festival present brush aware stadium saddle salt plug patch secret acid bulk
winner suspect total glimpse depart infant monster dream delay path normal rare
raise disease multiply bunker thing mimic during hollow increase vivid subject carbon
ticket echo injury glow panel then regular attract guide sniff sustain better
people swim expire there talk eight staff during imitate grass charge oven
edit unable cheese aunt sketch physical column attack duck enact yard agree
burger six melody under correct actress segment strong suffer enroll enjoy jaguar
fold apart flee weapon bulk globe garlic light someone victory display angry
wrist adjust drift grief absent inquiry spy blue wide spring crunch violin
flat rude donkey beach nothing indoor outer rally side like employ company
enroll method invest crack avocado exotic inspire tissue stick unlock wrist appear
end window special voyage wedding road arctic soup hope visit injury stone
carry spin treat planet snap autumn seven session chicken timber soldier ability
tribe select orbit note chase identify blanket solar flash team kidney resist
celery vacuum thunder ahead donor host giant faint boat castle rose buffalo
hollow youth mother often review minor meadow sand omit conduct gather witness
cradle model judge true peanut cancel ensure coil globe autumn weird smile
*/


