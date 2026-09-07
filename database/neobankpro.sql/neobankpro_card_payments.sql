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
-- Table structure for table `card_payments`
--

DROP TABLE IF EXISTS `card_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card_payments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` decimal(19,2) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `merchant_name` varchar(255) NOT NULL,
  `payment_type` enum('ONLINE','POS') NOT NULL,
  `status` enum('FAILED','SUCCESS') NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `bank_account_id` bigint NOT NULL,
  `card_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKo0g9w6fbn0b7n0er0kli99ol4` (`transaction_id`),
  KEY `FKcrodlr080wvakhwpm925hltrn` (`bank_account_id`),
  KEY `FKreboqrbja9gkkhp75p0idvylq` (`card_id`),
  CONSTRAINT `FKcrodlr080wvakhwpm925hltrn` FOREIGN KEY (`bank_account_id`) REFERENCES `bank_accounts` (`id`),
  CONSTRAINT `FKreboqrbja9gkkhp75p0idvylq` FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_payments`
--

LOCK TABLES `card_payments` WRITE;
/*!40000 ALTER TABLE `card_payments` DISABLE KEYS */;
INSERT INTO `card_payments` VALUES (1,500.00,'2026-09-03 17:11:45.773486','Amazon','ONLINE','SUCCESS','TXN-1788435705767-3806BF',2,3),(2,200.00,'2026-09-04 00:20:09.881462','Amazon','ONLINE','SUCCESS','TXN-HOCNYK3',2,5),(3,500.00,'2026-09-04 01:04:08.060489','Flipkart','ONLINE','SUCCESS','TXN-A5IJEIS',2,9),(4,400.00,'2026-09-04 01:48:41.654075','Hotel kms','ONLINE','SUCCESS','TXN-K1X2FU4',2,5),(5,700.00,'2026-09-04 02:13:55.951779','Hoteal room','ONLINE','SUCCESS','TXN-01F6BE7',2,5),(6,400.00,'2026-09-04 02:22:13.201330','Hotel saravana','ONLINE','SUCCESS','TXN-AV0M84R',2,5),(7,500.00,'2026-09-04 02:30:47.950538','Amazon','ONLINE','SUCCESS','TXN-DIWPJXR',2,3),(8,500.00,'2026-09-04 02:33:28.907419','Food KMS','ONLINE','SUCCESS','TXN-NR4PXK3',2,4),(9,500.00,'2026-09-04 02:37:19.658326','Ball shop','ONLINE','SUCCESS','TXN-VE4YGD0',2,5);
/*!40000 ALTER TABLE `card_payments` ENABLE KEYS */;
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
