-- MySQL dump 10.13  Distrib 8.0.26, for macos11.3 (x86_64)
--
-- Host: academy2020.cpc8rvmbbd9k.eu-west-2.rds.amazonaws.com    Database: HRSystem_iplusplus
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `BankDetails`
--

DROP TABLE IF EXISTS `BankDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BankDetails` (
  `employee_id` smallint NOT NULL,
  `sortcode` varchar(8) DEFAULT NULL,
  `account` char(26) DEFAULT NULL,
  `bank_name` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  CONSTRAINT `BankDetails_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `Employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BankDetails`
--

LOCK TABLES `BankDetails` WRITE;
/*!40000 ALTER TABLE `BankDetails` DISABLE KEYS */;
INSERT INTO `BankDetails` VALUES (1,'12345678','11222233334444555566667777','Bank of England'),(2,'87654321','99222233334444555566667777','Bank of Poland');
/*!40000 ALTER TABLE `BankDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Customer`
--

DROP TABLE IF EXISTS `Customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Customer` (
  `customer_id` smallint NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(50) DEFAULT NULL,
  `contact` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer`
--

LOCK TABLES `Customer` WRITE;
/*!40000 ALTER TABLE `Customer` DISABLE KEYS */;
INSERT INTO `Customer` VALUES (1,'Ministry of Justice','Phone +443333444555'),(2,'Oxford University','Phone +441111222333');
/*!40000 ALTER TABLE `Customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employee`
--

DROP TABLE IF EXISTS `Employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Employee` (
  `employee_id` smallint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `nin` char(9) DEFAULT NULL,
  `department` enum('HR','Finance','Sales Team','Talent Manager','Technical') DEFAULT NULL,
  `salary` decimal(7,2) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `adress` varchar(300) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employee`
--

LOCK TABLES `Employee` WRITE;
/*!40000 ALTER TABLE `Employee` DISABLE KEYS */;
INSERT INTO `Employee` VALUES (1,'Aimee','Boyle','123456789','Technical',30000.00,'aimee@email.com','Some Adress 11, City, 12345','+441231231234'),(2,'Sylwia','Łuczak-Jagieła','987654321','HR',15000.00,'sylwia@email.com','My Adress 22, City, 54321','+48987987987'),(3,'Adam','Jones','999888777','Sales Team',20000.00,'adam@email.com','Adam Adress 33, Oxford, 33333','+441111444666'),(4,'John','Doe','666555666','Talent Manager',45000.00,'john@email.com','John Adress 4D, London, 23232','+441888666444'),(5,'Zoe','Jackson','777333111','Finance',0.00,'23000.00','Zoe Adress 433d/4, Leeds, 23232','+441236543335'),(6,'Felix','Moore','AB123456C','Sales Team',30000.00,'felix@email.com',NULL,'111111111');
/*!40000 ALTER TABLE `Employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Projects`
--

DROP TABLE IF EXISTS `Projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Projects` (
  `projects_id` smallint NOT NULL AUTO_INCREMENT,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `project_manager` varchar(70) DEFAULT NULL,
  `description` varchar(300) NOT NULL,
  `name` varchar(200) NOT NULL,
  `customer_id` smallint NOT NULL,
  `budget` smallint DEFAULT NULL,
  PRIMARY KEY (`projects_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `Projects_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Projects`
--

LOCK TABLES `Projects` WRITE;
/*!40000 ALTER TABLE `Projects` DISABLE KEYS */;
INSERT INTO `Projects` VALUES (1,'0000-00-00','0000-00-00','Felix Moore','Development of an application to handle inquiries regarding judgments','Judicial application',1,32767),(2,'0000-00-00','0000-00-00','Amir Makanvand','Creation of application for students registration','Recruitment application',2,32767),(7,'2021-08-06','2021-08-07','Felix Moore','Here is a project.','Sample Project',1,20);
/*!40000 ALTER TABLE `Projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sales`
--

DROP TABLE IF EXISTS `Sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sales` (
  `total_sales_monthly` smallint DEFAULT NULL,
  `employee_id` smallint NOT NULL,
  `commission` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  CONSTRAINT `Sales_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `Employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sales`
--

LOCK TABLES `Sales` WRITE;
/*!40000 ALTER TABLE `Sales` DISABLE KEYS */;
INSERT INTO `Sales` VALUES (32767,3,555.00),(0,6,2.20);
/*!40000 ALTER TABLE `Sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Technical`
--

DROP TABLE IF EXISTS `Technical`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Technical` (
  `employee_id` smallint NOT NULL,
  `projects_id` smallint DEFAULT NULL,
  `cv` varchar(300) DEFAULT NULL,
  `passport_photo` blob,
  PRIMARY KEY (`employee_id`),
  KEY `projects_id` (`projects_id`),
  CONSTRAINT `Technical_ibfk_1` FOREIGN KEY (`projects_id`) REFERENCES `Projects` (`projects_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Technical`
--

LOCK TABLES `Technical` WRITE;
/*!40000 ALTER TABLE `Technical` DISABLE KEYS */;
INSERT INTO `Technical` VALUES (1,1,'Aimee is a very good programmer specializing in JAVA, moreover proficient in using the following tools: GIT, MySQL, Trello',NULL);
/*!40000 ALTER TABLE `Technical` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-12  9:55:30
