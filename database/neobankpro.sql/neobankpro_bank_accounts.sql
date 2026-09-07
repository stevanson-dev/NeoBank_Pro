-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: neobankpro
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bank_accounts`
--

DROP TABLE IF EXISTS `bank_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank_accounts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_number` varchar(255) NOT NULL,
  `account_type` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `ifsc_code` varchar(255) NOT NULL,
  `is_primary` bit(1) NOT NULL,
  `status` varchar(255) NOT NULL,
  `user_id` bigint NOT NULL,
  `balance` decimal(15,2) NOT NULL DEFAULT '0.00',
  `upi_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKr9gi1et82prjsig51uqxj2qm6` (`account_number`),
  UNIQUE KEY `UK7xe1qvku6a355kjmdx3s8x69j` (`upi_id`),
  KEY `FKahrj5m84hfc167gpma9vcwe0j` (`user_id`),
  CONSTRAINT `FKahrj5m84hfc167gpma9vcwe0j` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank_accounts`
--

LOCK TABLES `bank_accounts` WRITE;
/*!40000 ALTER TABLE `bank_accounts` DISABLE KEYS */;
INSERT INTO `bank_accounts` VALUES (2,'4883843482','SAVINGS','2026-08-29 01:19:10.835262','NEOB0001001',_binary '','ACTIVE',2,10007.00,NULL),(3,'8540393210','SAVINGS','2026-08-29 02:29:12.879041','NEOB0001001',_binary '','ACTIVE',3,6000.00,NULL);
/*!40000 ALTER TABLE `bank_accounts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-04  4:29:40
