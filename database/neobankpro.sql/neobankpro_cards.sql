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
-- Table structure for table `cards`
--

DROP TABLE IF EXISTS `cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cards` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `bank_account_id` bigint NOT NULL,
  `card_number` varchar(255) NOT NULL,
  `card_holder` varchar(255) NOT NULL,
  `expiry_date` date NOT NULL,
  `cvv` varchar(255) NOT NULL,
  `card_type` enum('DEBIT','CREDIT') NOT NULL,
  `card_variant` enum('PHYSICAL','VIRTUAL') NOT NULL,
  `status` enum('PENDING','ACTIVE','FROZEN','BLOCKED','EXPIRED') NOT NULL,
  `daily_limit` decimal(15,2) NOT NULL DEFAULT '20000.00',
  `monthly_limit` decimal(15,2) NOT NULL DEFAULT '100000.00',
  `credit_limit` decimal(15,2) DEFAULT NULL,
  `used_credit` decimal(15,2) DEFAULT NULL,
  `available_credit` decimal(15,2) DEFAULT NULL,
  `online_enabled` bit(1) NOT NULL DEFAULT b'1',
  `contactless_enabled` bit(1) NOT NULL DEFAULT b'1',
  `international_enabled` bit(1) NOT NULL DEFAULT b'0',
  `atm_enabled` bit(1) NOT NULL DEFAULT b'1',
  `created_at` datetime(6) NOT NULL,
  `pin_failed_attempts` int NOT NULL,
  `pin_hash` varchar(255) DEFAULT NULL,
  `pin_locked_until` datetime(6) DEFAULT NULL,
  `pin_set` bit(1) NOT NULL,
  `pos_enabled` bit(1) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_cards_card_number` (`card_number`),
  KEY `idx_cards_bank_account` (`bank_account_id`),
  CONSTRAINT `fk_cards_bank_account` FOREIGN KEY (`bank_account_id`) REFERENCES `bank_accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cards`
--

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;
INSERT INTO `cards` VALUES (1,2,'0323473062917359','Stevanson A','2031-08-31','259','DEBIT','VIRTUAL','BLOCKED',20000.00,100000.00,NULL,NULL,NULL,_binary '',_binary '',_binary '\0',_binary '','2026-08-31 15:59:59.838286',0,'$2a$10$73cO2K07rdNO4kz.lO8TMOmRx1TO.bvL7PSVkHnkn2DkPZ4jeODny','2026-09-02 00:43:35.473130',_binary '',_binary '\0','2026-09-02 01:00:38'),(2,2,'9504455755525903','Stevanson A','2031-08-31','617','CREDIT','VIRTUAL','BLOCKED',20000.00,100000.00,50000.00,0.00,50000.00,_binary '',_binary '',_binary '\0',_binary '','2026-08-31 17:07:02.742968',0,'$2a$10$2YgnRURpiYhvqOhQ7wvGo.zxxTT0tRu89CqcIK82ZOHA3HFDGZRem',NULL,_binary '',_binary '','2026-09-03 16:07:33'),(3,2,'0606485051495047','Stevanson A','2031-09-01','229','DEBIT','PHYSICAL','ACTIVE',20000.00,100000.00,NULL,NULL,NULL,_binary '',_binary '',_binary '\0',_binary '','2026-09-01 23:23:53.336738',0,'$2a$10$83SeyaorxsG9ppla6V7UreNPBuxFrhaq4YAiJKUp6qeIIJD6zzN9.',NULL,_binary '',_binary '','2026-09-04 01:35:53'),(4,2,'4358996147775714','Stevanson A','2031-09-01','649','CREDIT','PHYSICAL','ACTIVE',20000.00,100000.00,50000.00,500.00,49500.00,_binary '',_binary '',_binary '\0',_binary '','2026-09-01 23:29:52.054237',0,'$2a$10$VWDN4I8cB.9vTaEkK5OSnu1CqWE3MYK/VJJSHvEOjVG5jBBYaUbu2',NULL,_binary '',_binary '','2026-09-04 02:33:29'),(5,2,'8888825845304725','Stevanson A','2031-09-02','445','DEBIT','VIRTUAL','ACTIVE',20000.00,100000.00,NULL,NULL,NULL,_binary '',_binary '',_binary '\0',_binary '','2026-09-02 23:40:46.194127',0,'$2a$10$gYmBTnm2aBkWwzk22AUJjuSimb5RxMg84PcbjdP2VitzUfDcwy6Jm',NULL,_binary '',_binary '','2026-09-04 00:57:46'),(6,3,'3519169892983007','Godwinson A','2031-09-03','979','DEBIT','VIRTUAL','ACTIVE',20000.00,100000.00,NULL,NULL,NULL,_binary '',_binary '',_binary '\0',_binary '','2026-09-03 00:14:37.690901',0,NULL,NULL,_binary '\0',_binary '','2026-09-03 00:14:38'),(7,3,'4614524217589499','Godwinson A','2031-09-03','555','CREDIT','VIRTUAL','ACTIVE',20000.00,100000.00,50000.00,0.00,50000.00,_binary '',_binary '',_binary '\0',_binary '','2026-09-03 00:15:09.697190',0,NULL,NULL,_binary '\0',_binary '','2026-09-03 00:15:10'),(8,3,'0106371568426789','Godwinson A','2031-09-03','187','DEBIT','PHYSICAL','FROZEN',20000.00,100000.00,NULL,NULL,NULL,_binary '',_binary '',_binary '\0',_binary '','2026-09-03 00:17:06.110579',0,NULL,NULL,_binary '\0',_binary '','2026-09-03 00:17:37'),(9,2,'8089138907936152','Stevanson A','2031-09-03','220','CREDIT','VIRTUAL','ACTIVE',20000.00,100000.00,50000.00,500.00,49500.00,_binary '',_binary '',_binary '\0',_binary '','2026-09-03 16:07:51.220669',0,'$2a$10$s/zspBmIQjzFhj.Xp5NPC.oqe0u1PKAWlgS6WEnCHbyHwEwgK74.e',NULL,_binary '',_binary '','2026-09-04 01:04:08');
/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
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
