-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Oct 21, 2021 at 05:25 PM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `challenge_alkemi`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`) VALUES
(157, 'fer', '$2a$10$I9AgkdNCzX3JCGraHKs9jOsfSpR8Y3nLBZe9riMr1bGCvgw1UlQvS'),
(158, 'test', '$2a$10$d7AhgiJey/BkWiodvDnu..2hNG3bLb2jziYwQptRYTmSrgAaIKtim');

-- --------------------------------------------------------

--
-- Table structure for table `Usuario`
--

DROP TABLE IF EXISTS `Usuario`;
CREATE TABLE `Usuario` (
  `Id` int(11) NOT NULL,
  `Concepto` varchar(255) NOT NULL,
  `Monto` int(255) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `Tipo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Usuario`
--

INSERT INTO `Usuario` (`Id`, `Concepto`, `Monto`, `Fecha`, `Tipo`) VALUES
(55, 'Papa', 200, '2021-02-02', 'Salida'),
(56, 'Papa', 500, '2021-02-02', 'Salida'),
(57, 'Tomate', 300, '2020-02-02', 'Salida'),
(58, 'Sueldo', 30000, '2020-02-02', 'Entrada'),
(59, 'Lechuga', 400, '2020-02-02', 'Salida'),
(60, 'Tomate', 444, '2020-02-02', 'Salida'),
(61, 'Bolsa', 200, '2020-02-02', 'Salida'),
(62, 'Lechuga', 200, '2020-02-02', 'Salida');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;

--
-- AUTO_INCREMENT for table `Usuario`
--
ALTER TABLE `Usuario`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
