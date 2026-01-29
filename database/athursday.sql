-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 24, 2026 at 06:12 AM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `athursday`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_us`
--

DROP TABLE IF EXISTS `about_us`;
CREATE TABLE IF NOT EXISTS `about_us` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` tinyint DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `about_us`
--

INSERT INTO `about_us` (`id`, `title`, `description`, `image`, `status`, `created_at`) VALUES
(1, 'MOCHA COFFEE ', 'lorem ipsom', NULL, 0, '2026-01-14 09:41:34'),
(2, 'LEARN MORE\nABOUT US', 'Welcome to A Thursday, where coffee is pure passion. From bean to cup, we are dedicated to delivering excellence in every sip. Join us on a journey of flavor and quality, crafted with love to create the ultimate coffee experience.', 'assets/img/about-coffee.png', 1, '2026-01-14 09:42:42');

-- --------------------------------------------------------

--
-- Table structure for table `beans_wallet`
--

DROP TABLE IF EXISTS `beans_wallet`;
CREATE TABLE IF NOT EXISTS `beans_wallet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `collected` int DEFAULT '0',
  `redeemed` int DEFAULT '0',
  `available` int DEFAULT '0',
  `level` enum('silver','gold','platinum') DEFAULT 'silver',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `item_id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `item_id`, `name`, `price`, `image`, `quantity`, `created_at`) VALUES
(1, 3, 1, 'Paper Cups', 0.00, NULL, 1, '2026-01-21 07:22:07'),
(2, 1, 2, 'Napkins', 0.00, 'assets/img/NAPKIN.jpg', 4, '2026-01-21 07:35:26'),
(3, 1, 1, 'Paper Cups', 0.00, 'assets/img/paper cup.jpg', 1, '2026-01-21 07:44:28');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `earn_beans` int NOT NULL,
  `redeem_beans` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `earn_beans`, `redeem_beans`, `created_at`) VALUES
(1, 'Coffee', 0, 0, '2026-01-20 06:50:38'),
(2, ' Cold Brew & Iced Coffee', 0, 0, '2026-01-20 06:57:03'),
(3, 'Hot Chocolate', 0, 0, '2026-01-20 06:57:20'),
(4, 'Food – Starters', 0, 0, '2026-01-20 06:57:35'),
(5, 'Food – Wraps & Sandwiches', 0, 0, '2026-01-20 06:57:48'),
(6, 'Food – Platters', 0, 0, '2026-01-20 06:57:59'),
(7, 'Food – Pasta', 0, 0, '2026-01-20 06:58:12'),
(8, 'Food – Tacos', 0, 0, '2026-01-20 06:58:21'),
(9, ' Food – French Fries', 0, 0, '2026-01-20 06:58:30'),
(10, 'Food – Continental Snacks', 0, 0, '2026-01-20 06:58:39');

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

DROP TABLE IF EXISTS `contact_us`;
CREATE TABLE IF NOT EXISTS `contact_us` (
  `id` int NOT NULL AUTO_INCREMENT,
  `location` text NOT NULL,
  `address` text NOT NULL,
  `delivery_phone` varchar(50) DEFAULT NULL,
  `alternet_number` varchar(50) NOT NULL,
  `attention_day` varchar(255) NOT NULL,
  `attention_time` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` tinyint DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `contact_us`
--

INSERT INTO `contact_us` (`id`, `location`, `address`, `delivery_phone`, `alternet_number`, `attention_day`, `attention_time`, `image`, `status`, `created_at`) VALUES
(2, 'Lima - Sun City - Peru Av. Moon #4321', 'Lima - Sun City - Peru', '+00-987-7654-321', '+11-012345', 'Monday - Saturday', '9AM - 10PM', '/assets/uploads/contact/1768551163970-contact-delivery.webp', 1, '2026-01-16 08:12:44');

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
CREATE TABLE IF NOT EXISTS `feedbacks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `message` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `gross_amount` decimal(10,2) DEFAULT '0.00',
  `discount_amount` decimal(10,2) DEFAULT '0.00',
  `total_amount` decimal(10,2) DEFAULT NULL,
  `beans_earned` int DEFAULT '0',
  `beans_deducted` int DEFAULT '0',
  `total_beans` int DEFAULT NULL,
  `status` enum('PENDING','PAID') DEFAULT 'PENDING',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_orders_user` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `gross_amount`, `discount_amount`, `total_amount`, `beans_earned`, `beans_deducted`, `total_beans`, `status`, `created_at`) VALUES
(1, 3, 422.00, 21.10, 400.90, 20, 8, 12, 'PENDING', '2026-01-16 13:55:12'),
(2, 3, 422.00, 21.10, 400.90, 20, 8, 12, 'PENDING', '2026-01-16 13:56:12'),
(3, 3, 0.00, 0.00, 420.00, 0, 0, NULL, 'PENDING', '2026-01-19 05:40:20'),
(4, 3, 0.00, 0.00, 420.00, 0, 0, NULL, 'PENDING', '2026-01-19 05:43:44'),
(5, 1, 0.00, 0.00, 521.00, 15, 31, -16, 'PENDING', '2026-01-19 09:42:11'),
(6, 1, 0.00, 0.00, 521.00, 15, 31, -16, 'PENDING', '2026-01-19 09:43:09'),
(7, 1, 0.00, 0.00, 521.00, 15, 31, -16, 'PENDING', '2026-01-19 09:43:14'),
(8, 1, 0.00, 0.00, 521.00, 15, 31, -16, 'PENDING', '2026-01-19 09:43:23'),
(9, 1, 0.00, 0.00, 521.00, 15, 31, -16, 'PENDING', '2026-01-19 09:43:49'),
(10, 1, 0.00, 0.00, 521.00, 15, 31, -16, 'PENDING', '2026-01-19 09:44:21'),
(11, 1, 0.00, 0.00, 521.00, 15, 31, -16, 'PENDING', '2026-01-19 09:46:18'),
(12, 1, 0.00, 0.00, 521.00, 15, 31, -16, 'PENDING', '2026-01-19 09:46:30'),
(13, 1, 0.00, 0.00, 521.00, 15, 31, -16, 'PENDING', '2026-01-19 09:47:35'),
(24, 2, 0.00, 0.00, 2563.00, 96, 213, -117, 'PENDING', '2026-01-19 12:23:46'),
(16, 1, 0.00, 0.00, 521.00, 15, 31, -16, 'PENDING', '2026-01-19 09:49:27'),
(17, 1, 0.00, 0.00, 521.00, 15, 31, -16, 'PENDING', '2026-01-19 09:50:13'),
(18, 1, 0.00, 0.00, 521.00, 15, 31, -16, 'PENDING', '2026-01-19 10:10:33'),
(19, 2, 0.00, 0.00, 1042.00, 31, 62, -31, 'PENDING', '2026-01-19 10:26:31'),
(20, 2, 0.00, 0.00, 1500.00, 75, 180, -105, 'PENDING', '2026-01-19 10:28:26'),
(21, 2, 0.00, 0.00, 521.00, 15, 31, -16, 'PENDING', '2026-01-19 10:29:48'),
(22, 2, 0.00, 0.00, 1500.00, 75, 180, -105, 'PENDING', '2026-01-19 10:31:37'),
(23, 2, 0.00, 0.00, 1542.00, 55, 122, -67, 'PENDING', '2026-01-19 10:33:19');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `final_price` decimal(10,2) DEFAULT NULL,
  `beans_earned` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_order` (`order_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `final_price`, `beans_earned`, `created_at`) VALUES
(1, 1, 1, 2, 400.90, 20, '2026-01-16 13:55:12'),
(2, 2, 1, 2, 400.90, 20, '2026-01-16 13:56:12'),
(3, 4, 1, 2, 120.00, NULL, '2026-01-19 05:43:44'),
(4, 4, 3, 1, 180.00, NULL, '2026-01-19 05:43:44'),
(5, 17, 3, 1, 521.00, NULL, '2026-01-19 09:50:13'),
(6, 18, 3, NULL, NULL, NULL, '2026-01-19 10:10:33'),
(7, 19, 3, NULL, NULL, NULL, '2026-01-19 10:26:31'),
(8, 20, 1, 3, NULL, NULL, '2026-01-19 10:28:26'),
(9, 21, 3, 1, NULL, NULL, '2026-01-19 10:29:48'),
(10, 22, 1, 3, NULL, NULL, '2026-01-19 10:31:37'),
(11, 23, 3, 1, NULL, NULL, '2026-01-19 10:33:19'),
(12, 23, 1, 1, NULL, NULL, '2026-01-19 10:33:19'),
(13, 23, 3, 1, NULL, NULL, '2026-01-19 10:33:19'),
(14, 24, 3, 3, NULL, NULL, '2026-01-19 12:23:46'),
(15, 24, 1, 2, NULL, NULL, '2026-01-19 12:23:46');

-- --------------------------------------------------------

--
-- Table structure for table `otps`
--

DROP TABLE IF EXISTS `otps`;
CREATE TABLE IF NOT EXISTS `otps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mobile` varchar(10) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `popular_products`
--

DROP TABLE IF EXISTS `popular_products`;
CREATE TABLE IF NOT EXISTS `popular_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` tinyint DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `popular_products`
--

INSERT INTO `popular_products` (`id`, `name`, `description`, `price`, `image`, `status`, `created_at`) VALUES
(1, 'MOCHA COFFEE', 'Indulge in the simplicity of our delicious cold brew coffee.', 119.00, '/assets/img/1768381522225-popular-coffee-3.webp', 1, '2026-01-14 09:05:22'),
(2, 'MOCHA COFFEE 1', 'Indulge in the simplicity of our delicious cold brew coffee.', 215.00, '/assets/img/1768456856494-popular-coffee-3.webp', 1, '2026-01-15 06:00:57');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(50) NOT NULL,
  `discount_percent` int NOT NULL,
  `earn_beans` int DEFAULT '0',
  `redeem_beans` int DEFAULT '0',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `is_popular` tinyint(1) DEFAULT '0',
  `status` tinyint DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `category`, `discount_percent`, `earn_beans`, `redeem_beans`, `image`, `is_popular`, `status`, `created_at`) VALUES
(1, 'Classic Espresso', 'Double-shot, rich and intense, served black for true coffee lovers.', 0.00, '1', 0, 0, 0, '/assets/img/1768898346119-espresso.jpg', 1, 1, '2026-01-20 08:39:06'),
(2, 'Espresso', 'A single 30 ml shot of bold, aromatic espresso pulled to perfection.', 0.00, '1', 0, 0, 0, '/assets/img/1768898380122-30 ml container.jpg', 0, 1, '2026-01-20 08:39:40'),
(3, 'Caramel Latte', 'Steamed milk, espresso, and caramel drizzle, finished with caramel swirl.', 0.00, '1', 0, 0, 0, '/assets/img/1768898424810-carmal latte.jpg', 1, 1, '2026-01-20 08:40:24'),
(4, 'Pumpkin Spiced Latte', 'Espresso with pumpkin purée, cinnamon, nutmeg, steamed milk, whipped cream.', 0.00, '1', 0, 0, 0, '/assets/img/1768898455937-pumplin spiced latte.jpg', 0, 1, '2026-01-20 08:40:56'),
(5, 'Hazelnut Cappuccino', 'Espresso, steamed milk, frothy foam with hazelnut syrup and cocoa dust.', 0.00, '1', 0, 0, 0, '/assets/img/1768898497351-hazelnut capauccino.jpg', 1, 1, '2026-01-20 08:41:37'),
(6, 'Mocha', 'Dark chocolate, espresso, steamed milk topped with chocolate shavings.', 0.00, '1', 0, 0, 0, '/assets/img/1768899129186-mocha.jpg', 1, 1, '2026-01-20 08:52:09');

-- --------------------------------------------------------

--
-- Table structure for table `saucer_items`
--

DROP TABLE IF EXISTS `saucer_items`;
CREATE TABLE IF NOT EXISTS `saucer_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) DEFAULT '0.00',
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `saucer_items`
--

INSERT INTO `saucer_items` (`id`, `name`, `price`, `description`, `image`, `status`, `created_at`) VALUES
(1, 'Paper Cups', 0.00, 'Branded cups for hot/cold drinks and food.', 'assets/img/paper cup.jpg', 1, '2026-01-20 13:02:30'),
(2, 'Biscuits', 0.00, 'A hot cup of coffee with a small chocolate chip cookie on the saucer. ', 'assets/img/biscutes.jpg', 1, '2026-01-20 13:02:30'),
(3, 'Chocolates', 0.00, 'The heat from the cup can slightly soften the chocolate, creating a rich pairing. ', 'assets/img/chocolets.jpg', 1, '2026-01-20 13:02:30');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `otp` varchar(6) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `mobile` (`mobile`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `mobile`, `password`, `otp`, `created_at`) VALUES
(1, 'sam', 'sam@phian.com', '8412915125', '$2b$10$lwD61pGaEKik6/wLyeYJwODn0yOebnsJZMcdHc47t962iBNELif2C', '256983', '2026-01-13 09:07:00'),
(2, 'sam1', 'sam1@phian.com', '1111111111', '$2b$10$CvHxNBm3SK/ovbFTd50F/em3t2BWrdXPDEs12chy5b46OT89LMYgC', NULL, '2026-01-13 12:21:05'),
(3, 'tom', 'tom@phian.com', '1236541111', '$2b$10$fZLq5vCQhKUxVRPru2PStOCkwhOUhKphHjfYoGgrtuPraM2bpIqNC', NULL, '2026-01-13 12:22:35'),
(4, 'Kumar', 'kumar@uhu.cic', '9876543210', '$2b$10$pvUYO/jdcSr9zBhS1Wr9c.odZG3IX5Wkw.5FUbyM1/TiwOCTzOGRW', NULL, '2026-01-21 10:35:16'),
(5, 'Kumar', 'kumar1@uhu.cic', '9876543211', '$2b$10$ajJHLr3O/UUfYnCYR6fdS.cwNnqbRtKC7s1jn3gkwdCybp66tmPom', NULL, '2026-01-21 10:55:45');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
