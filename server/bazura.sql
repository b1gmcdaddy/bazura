-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2024 at 03:26 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bazura`
--

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `foodID` int(11) NOT NULL,
  `foodName` varchar(255) NOT NULL,
  `foodDesc` varchar(255) NOT NULL,
  `category` enum('snack','maincourse','coffee','alcohol') NOT NULL,
  `price` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`foodID`, `foodName`, `foodDesc`, `category`, `price`) VALUES
(2, 'kape edited', 'sdklfjsklfsdklfjsklk kape ni kape ni', 'coffee', '9897'),
(3, 'new alcohol new', 'this is the desc234234', 'alcohol', '12332434'),
(7, 'snacknew', 'snack new description', 'snack', '99999'),
(8, 'new main course', 'skwid description', 'maincourse', '342343'),
(9, 'kopiko', 'yami', 'coffee', '33'),
(10, 'gsm blue', 'tara', 'alcohol', '555');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(2, 'user1', 'newemail@gmail.com', '$2b$10$piblwTVM1SkXjXojc6hCdedTBHp8LiSQwjZuMH/s8mjsbszsahhvu'),
(5, 'user2', 'user2@gmail.com', '$2b$10$EkKhC38ohxxDDehlvuygwukuoNk6LEENXNOqP6rxVt3nDtRFk4DIe'),
(6, 'new', 'new@gmail.com', '$2b$10$a49ObmGDfs16aowkV99BAuEj1APaJkE.U8/B5.9Z/q9npdbLNlDY6'),
(7, 'hey1', 'hey@gmail.com', '$2b$10$PmCBP.MrjTNY80culEowNOe6LAnay3HKmOFnZeA1agacoVuYkBzE6');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`foodID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `foodID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
