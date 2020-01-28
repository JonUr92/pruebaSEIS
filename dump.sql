/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100139
 Source Host           : localhost:3306
 Source Schema         : pruebaseis

 Target Server Type    : MySQL
 Target Server Version : 100139
 File Encoding         : 65001

 Date: 28/01/2020 13:47:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bodegas
-- ----------------------------
DROP TABLE IF EXISTS `bodegas`;
CREATE TABLE `bodegas`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bodegas_nombre` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `bodegas_descripcion` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of bodegas
-- ----------------------------
INSERT INTO `bodegas` VALUES (1, 'Farmacia', 'Bodega que contiene productos para la venta');
INSERT INTO `bodegas` VALUES (2, 'Abastecimiento', '123123');

-- ----------------------------
-- Table structure for bodegas_productos
-- ----------------------------
DROP TABLE IF EXISTS `bodegas_productos`;
CREATE TABLE `bodegas_productos`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bodegas_id` int(11) NULL DEFAULT NULL,
  `productos_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of bodegas_productos
-- ----------------------------
INSERT INTO `bodegas_productos` VALUES (8, 1, 1);
INSERT INTO `bodegas_productos` VALUES (9, 2, 1);
INSERT INTO `bodegas_productos` VALUES (10, 1, 6);
INSERT INTO `bodegas_productos` VALUES (11, 1, 1);
INSERT INTO `bodegas_productos` VALUES (12, 1, 1);
INSERT INTO `bodegas_productos` VALUES (13, 1, 1);
INSERT INTO `bodegas_productos` VALUES (14, 1, 1);
INSERT INTO `bodegas_productos` VALUES (15, 1, 1);
INSERT INTO `bodegas_productos` VALUES (16, 1, 10);
INSERT INTO `bodegas_productos` VALUES (17, 2, 10);

-- ----------------------------
-- Table structure for productos
-- ----------------------------
DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productos_codigo` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `productos_nombre` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `productos_descripcion` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `productos_medicion` int(11) NOT NULL,
  `productos_precio` decimal(10, 0) NOT NULL,
  `productos_fecha_creacion` datetime(0) NOT NULL,
  `productos_fecha_actualizacion` datetime(0) NOT NULL,
  `bodegas_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `bodegas_id`(`bodegas_id`) USING BTREE,
  CONSTRAINT `bodegas_id` FOREIGN KEY (`bodegas_id`) REFERENCES `bodegas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of productos
-- ----------------------------
INSERT INTO `productos` VALUES (1, '000001', 'Paracetamol', 'Medicamento para aliviar el dolor de cabeza', 1, 150, '2020-01-26 11:32:06', '2020-01-26 11:32:06', 1);
INSERT INTO `productos` VALUES (6, '000002', 'Loratadina', 'Micamento para alergias', 2, 4, '2020-01-26 15:15:46', '2020-01-27 10:33:12', NULL);
INSERT INTO `productos` VALUES (7, '000003', 'Paracetamol', 'Medicamento para el dolor general', 1, 150, '2020-01-26 15:19:41', '2020-01-26 15:19:41', NULL);
INSERT INTO `productos` VALUES (8, '000004', 'Paracetamol', 'Medicamento para el dolor general', 3, 500, '2020-01-26 15:25:05', '2020-01-27 10:26:41', NULL);
INSERT INTO `productos` VALUES (10, '000005', 'Broxol', 'Jarabe para la tos', 3, 500, '2020-01-27 10:29:55', '2020-01-27 10:29:55', NULL);
INSERT INTO `productos` VALUES (11, '000006', 'medicina', '', 1, 10000, '2020-01-27 10:34:10', '2020-01-27 10:34:10', NULL);
INSERT INTO `productos` VALUES (12, '000007', '111sajdisa', '', 3, 4548, '2020-01-27 17:49:31', '2020-01-27 17:49:31', NULL);

-- ----------------------------
-- Table structure for productos_mediciones
-- ----------------------------
DROP TABLE IF EXISTS `productos_mediciones`;
CREATE TABLE `productos_mediciones`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productos_mediciones_nombre` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of productos_mediciones
-- ----------------------------
INSERT INTO `productos_mediciones` VALUES (1, 'Unidad');
INSERT INTO `productos_mediciones` VALUES (2, 'Gr');
INSERT INTO `productos_mediciones` VALUES (3, 'ml');

-- ----------------------------
-- Table structure for stock
-- ----------------------------
DROP TABLE IF EXISTS `stock`;
CREATE TABLE `stock`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_movimiento` int(11) NULL DEFAULT NULL,
  `bodegas_id` int(11) NULL DEFAULT NULL,
  `productos_id` int(11) NULL DEFAULT NULL,
  `cant` decimal(10, 0) NULL DEFAULT NULL,
  `fecha` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of stock
-- ----------------------------
INSERT INTO `stock` VALUES (1, 1, 1, 1, 50, NULL);
INSERT INTO `stock` VALUES (2, 1, 1, 1, 1, NULL);
INSERT INTO `stock` VALUES (5, 1, 1, 1, 10, '2020-01-28 00:19:25');
INSERT INTO `stock` VALUES (6, 2, 1, 1, -5, '2020-01-28 00:20:12');
INSERT INTO `stock` VALUES (8, 2, 1, 1, -40, '2020-01-28 00:23:06');
INSERT INTO `stock` VALUES (9, 1, 2, 1, NULL, '2020-01-28 00:23:41');
INSERT INTO `stock` VALUES (10, 1, 2, 1, NULL, '2020-01-28 00:28:51');
INSERT INTO `stock` VALUES (11, 1, 1, 1, NULL, '2020-01-28 13:14:32');
INSERT INTO `stock` VALUES (12, 1, 1, 1, 1500, '2020-01-28 13:17:49');
INSERT INTO `stock` VALUES (13, 2, 1, 1, -16, '2020-01-28 13:18:15');

SET FOREIGN_KEY_CHECKS = 1;
