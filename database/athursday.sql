-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 05, 2026 at 10:43 AM
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
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
CREATE TABLE IF NOT EXISTS `banners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `title`, `image_url`, `start_time`, `end_time`, `is_active`, `created_at`) VALUES
(16, 'aaaa', '/assets/img/1769776361431-386274838625800.jpg.jpeg', '2026-01-30 18:02:00', '2026-02-14 18:02:00', 1, '2026-01-30 12:32:41'),
(17, 'bbbb', '/assets/img/1769776392572-386274798625797.jpg.jpeg', '2026-01-30 18:02:00', '2026-02-14 18:02:00', 1, '2026-01-30 12:33:12'),
(18, 'cccc', '/assets/img/1769776468180-val-8-design-template-3460db2d6ff6bd4275c844d2e98393fascreen.jpg', '2026-01-30 18:04:00', '2026-02-14 18:04:00', 1, '2026-01-30 12:34:28');

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
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
CREATE TABLE IF NOT EXISTS `blogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(150) NOT NULL,
  `image` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `is_approved` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `user_id`, `title`, `image`, `content`, `is_approved`, `created_at`) VALUES
(1, 3, 'hiuhihih', '1769777613697-blog.jpg', 'hjojh hohod sdohc 8vhsz jvoz icvohzoc jz uhziu', 1, '2026-01-30 12:53:34'),
(2, 3, 'iuhodsaonc', '1770016773463-blog.jpg', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\",', 1, '2026-02-02 07:19:33'),
(3, 3, 'fdsdfsdc', '1770020113242-blog.png', '1914 translation by H. Rackham\r\n\"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?\"', 1, '2026-02-02 08:15:13'),
(4, 3, 'hjfgh', '1770021622762-blog.png', 'Section 1.10.33 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC\r\n\"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\"', 1, '2026-02-02 08:40:22'),
(5, 3, 'xzzdsfszd', '1770021664488-blog.jpg', 'dfgdfgxfghdfg yuyt yutty sdgsf sd', 1, '2026-02-02 08:41:04'),
(6, 3, 'dsgfsfgngfd', '1770030662696-blog.jpg', 'nijobi uf78y98 yf87h 7y89jo', 0, '2026-02-02 11:11:02'),
(7, 3, 'iihiubihb', '1770030952318-blog.jpg', 'jyihibi ohuoijo g9o fhi es5rf7u es65f7 oh oinkvu uyhkjbhg', 0, '2026-02-02 11:15:52');

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
  `main_category_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_main_category` (`main_category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `main_category_id`, `created_at`) VALUES
(1, 'Cold Coffee', 1, '2026-01-29 05:33:12'),
(2, 'food', 2, '2026-01-29 05:41:39'),
(3, 'coffe', 3, '2026-01-29 05:45:28'),
(4, 'mocka', 2, '2026-01-29 06:02:22'),
(7, 'dgsrdgf', 3, '2026-01-29 06:26:50'),
(8, 'dsfsadf', 2, '2026-01-29 06:35:13'),
(9, 'dsfd', 3, '2026-01-29 06:41:02'),
(10, 'gfhdfg', 4, '2026-01-29 12:07:32');

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

--
-- Dumping data for table `feedbacks`
--

INSERT INTO `feedbacks` (`id`, `user_id`, `rating`, `message`, `created_at`) VALUES
(1, 3, 4, 'Best caffe', '2026-01-24 08:18:03'),
(2, 3, 4, 'Best caffe', '2026-01-24 08:18:15'),
(3, 3, 4, 'A Thursday Café truly feels like a mid-week escape. The coffee is rich, perfectly brewed, and consistently satisfying. The ambience is calm and aesthetic, making it ideal for both work and relaxed conversations. The staff is warm and attentive, which adds a personal touch to the experience. Every visit feels refreshing and worth repeating.', '2026-01-24 08:29:14'),
(4, 3, 3, 'This café has quickly become one of my favorite hangout spots. The peaceful ambience, reliable Wi-Fi, and delicious coffee make it ideal for meetings or casual visits. The staff is friendly and professional, and the overall vibe is very relaxing. A Thursday Café truly stands out for its consistency and charm.', '2026-01-24 08:29:39'),
(5, 3, 4, 'Lowkey obsessed with A Thursday Café. The coffee is always on point and the vibe is super chill. Perfect place to sit, relax, or just zone out with a good cup of coffee. The ambience feels cozy without trying too hard. Definitely my go-to spot now.', '2026-01-24 08:34:41');

-- --------------------------------------------------------

--
-- Table structure for table `main_categories`
--

DROP TABLE IF EXISTS `main_categories`;
CREATE TABLE IF NOT EXISTS `main_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `earn_beans` int DEFAULT '0',
  `redeem_beans` int DEFAULT '0',
  `status` tinyint DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `main_categories`
--

INSERT INTO `main_categories` (`id`, `name`, `slug`, `earn_beans`, `redeem_beans`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Regular', 'regular', 25, 30, 0, '2026-01-27 05:59:23', '2026-01-28 13:34:21'),
(2, 'Premium ', 'premium ', 15, 10, 1, '2026-01-28 13:29:57', '2026-01-28 13:34:32'),
(3, 'Ultra Premium ', 'ultra premium ', 8, 10, 1, '2026-01-28 13:34:12', '2026-01-28 13:34:12'),
(4, 'Regular ', 'regular ', 20, 50, 1, '2026-01-29 06:10:49', '2026-01-29 06:11:11');

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
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `mobile`, `password`, `otp`, `created_at`) VALUES
(1, 'sam', 'sam@phian.com', '8412915125', '$2b$10$lwD61pGaEKik6/wLyeYJwODn0yOebnsJZMcdHc47t962iBNELif2C', '256983', '2026-01-13 09:07:00'),
(2, 'sam1', 'sam1@phian.com', '1111111111', '$2b$10$CvHxNBm3SK/ovbFTd50F/em3t2BWrdXPDEs12chy5b46OT89LMYgC', NULL, '2026-01-13 12:21:05'),
(3, 'tom', 'tom@phian.com', '1236541111', '$2b$10$fZLq5vCQhKUxVRPru2PStOCkwhOUhKphHjfYoGgrtuPraM2bpIqNC', NULL, '2026-01-13 12:22:35'),
(4, 'Kumar', 'kumar@uhu.cic', '9876543210', '$2b$10$pvUYO/jdcSr9zBhS1Wr9c.odZG3IX5Wkw.5FUbyM1/TiwOCTzOGRW', NULL, '2026-01-21 10:35:16'),
(5, 'Kumar', 'kumar1@uhu.cic', '9876543211', '$2b$10$ajJHLr3O/UUfYnCYR6fdS.cwNnqbRtKC7s1jn3gkwdCybp66tmPom', NULL, '2026-01-21 10:55:45'),
(6, 'Phian', 'admin@phian.com', '1234567890', '$2b$10$8fD5h3x4Rnd20MOgHqSmUubduARbF5P6yH8x9inEfSBkTdt5p4242', NULL, '2026-02-02 11:42:37'),
(7, 'Phian', 'admin1@phian.com', '1234567899', '$2b$10$1UBjF5IphX48YZnV0ZMnYekesaPm5hps9wx30pmukicogmoLr4TgK', NULL, '2026-02-02 11:56:50');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
