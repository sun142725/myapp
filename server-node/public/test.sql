/*
Navicat MySQL Data Transfer

Source Server         : locaohost
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2019-08-14 13:22:36
*/
--   `type` varchar(10) NOT NULL COMMENT 'text : 二人聊天 image : 图片 file : 文件 custom : 自定义',

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for chat_room
-- ----------------------------
DROP TABLE IF EXISTS `friend`;
CREATE TABLE `friend` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `room_id` varchar(255) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `content` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `friend_mobile` varchar(255) NOT NULL,
  `status` int(10) unsigned zerofill NOT NULL COMMENT '0 : 正常 1 : 待接受 2 : 删除',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
