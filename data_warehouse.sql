-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2021 at 07:18 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `data_warehouse`
--

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  `city_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `country_id`, `city_name`) VALUES
(1, 1, 'Buenos Aires'),
(3, 2, 'Bogota'),
(4, 2, 'Medellin'),
(5, 3, 'Atacama'),
(6, 3, 'Santiago'),
(7, 3, 'Valparaiso'),
(8, 4, 'Canelones'),
(9, 4, 'Maldonado'),
(10, 4, 'Montevideo'),
(11, 5, 'Ciudad de Mexico'),
(12, 5, 'Tijuana'),
(13, 6, 'Florida'),
(14, 6, 'Texas'),
(17, 2, 'Pepito'),
(19, 1, 'Cordoba');

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id_company` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `id_city` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id_company`, `name`, `address`, `email`, `phone`, `id_city`) VALUES
(2, 'Tesla', 'Tesla Dr CA', 'sss@gmail.com', '8006004571', 10),
(23, 'PepsiCo', 'PepsiCo St', 'pepsico@hotmail.com', '789456123', 4),
(24, 'Coca-cola', 'Marble Street', 'coca-cola@cocacola.com', '456456456', 4),
(25, 'Optimum Nutrition', 'Florida St 1234', 'op@hotmail.com', '852456789', 14);

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id_contact` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `id_company` int(11) NOT NULL,
  `id_city` int(11) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `interest` int(11) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `phone_preference` int(11) NOT NULL,
  `whatsapp` varchar(100) DEFAULT NULL,
  `whatsapp_preference` int(11) NOT NULL,
  `instagram` varchar(100) DEFAULT NULL,
  `instagram_preference` int(11) NOT NULL,
  `facebook` varchar(100) DEFAULT NULL,
  `facebook_preference` int(11) NOT NULL,
  `linkedin` varchar(100) DEFAULT NULL,
  `linkedin_preference` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id_contact`, `first_name`, `last_name`, `position`, `email`, `id_company`, `id_city`, `address`, `interest`, `phone`, `phone_preference`, `whatsapp`, `whatsapp_preference`, `instagram`, `instagram_preference`, `facebook`, `facebook_preference`, `linkedin`, `linkedin_preference`) VALUES
(22, 'Pepito', 'Romero', 'Supervisor', 'pepitax@hotmail.com', 24, 14, 'Pepito St', 100, '123123', 1, '123123', 3, '@pepitp', 3, 'pepito.romero', 1, 'pepito.romero1234', 1),
(26, 'Juan', 'Pernalette', 'Vicepresidente', 'juana@io.com', 2, 4, 'Medellin 12345', 75, '789789', 2, '789789', 1, '@juana', 3, 'juana.pernalette', 2, 'juana.pernalette1234', 1);

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `region_id` int(11) NOT NULL,
  `name_countries` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `region_id`, `name_countries`) VALUES
(1, 1, 'Argentina'),
(2, 1, 'Colombia'),
(3, 1, 'Chile'),
(4, 1, 'Uruguay'),
(5, 2, 'Mexico'),
(6, 2, 'Estados Unidos');

-- --------------------------------------------------------

--
-- Table structure for table `preferences`
--

CREATE TABLE `preferences` (
  `id_preference` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `preferences`
--

INSERT INTO `preferences` (`id_preference`, `name`) VALUES
(1, 'Sin preferencia'),
(2, 'Canal favorito'),
(3, 'No molestar');

-- --------------------------------------------------------

--
-- Table structure for table `regions`
--

CREATE TABLE `regions` (
  `id` int(11) NOT NULL,
  `name_region` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `regions`
--

INSERT INTO `regions` (`id`, `name_region`) VALUES
(1, 'Sudamerica'),
(2, 'Norteamerica');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `users_id` int(10) NOT NULL,
  `first_name` varchar(15) NOT NULL,
  `last_name` varchar(15) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pass` varchar(30) NOT NULL,
  `isAdmin` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`users_id`, `first_name`, `last_name`, `email`, `pass`, `isAdmin`) VALUES
(1, 'Julia', 'Del Carmen Pere', 'julia.delcarmen@gmail.com', 'Julia12345', 1),
(2, 'Pepito', 'Romero', 'pepito@gmail.com', '123456789', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `country_id` (`country_id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id_company`),
  ADD KEY `id_city` (`id_city`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id_contact`),
  ADD KEY `id_city` (`id_city`),
  ADD KEY `id_company` (`id_company`),
  ADD KEY `facebook_preference` (`facebook_preference`),
  ADD KEY `instagram_preference` (`instagram_preference`),
  ADD KEY `linkedin_preference` (`linkedin_preference`),
  ADD KEY `phone_preference` (`phone_preference`),
  ADD KEY `whatsapp_preference` (`whatsapp_preference`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `region_id` (`region_id`);

--
-- Indexes for table `preferences`
--
ALTER TABLE `preferences`
  ADD PRIMARY KEY (`id_preference`);

--
-- Indexes for table `regions`
--
ALTER TABLE `regions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`users_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id_company` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id_contact` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `preferences`
--
ALTER TABLE `preferences`
  MODIFY `id_preference` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `regions`
--
ALTER TABLE `regions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `users_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`);

--
-- Constraints for table `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`id_city`) REFERENCES `cities` (`id`);

--
-- Constraints for table `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_ibfk_10` FOREIGN KEY (`linkedin_preference`) REFERENCES `preferences` (`id_preference`),
  ADD CONSTRAINT `contacts_ibfk_11` FOREIGN KEY (`phone_preference`) REFERENCES `preferences` (`id_preference`),
  ADD CONSTRAINT `contacts_ibfk_12` FOREIGN KEY (`whatsapp_preference`) REFERENCES `preferences` (`id_preference`),
  ADD CONSTRAINT `contacts_ibfk_6` FOREIGN KEY (`id_city`) REFERENCES `cities` (`id`),
  ADD CONSTRAINT `contacts_ibfk_7` FOREIGN KEY (`id_company`) REFERENCES `companies` (`id_company`),
  ADD CONSTRAINT `contacts_ibfk_8` FOREIGN KEY (`facebook_preference`) REFERENCES `preferences` (`id_preference`),
  ADD CONSTRAINT `contacts_ibfk_9` FOREIGN KEY (`instagram_preference`) REFERENCES `preferences` (`id_preference`);

--
-- Constraints for table `countries`
--
ALTER TABLE `countries`
  ADD CONSTRAINT `countries_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
