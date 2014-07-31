-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Jeu 31 Juillet 2014 à 18:39
-- Version du serveur :  5.6.17-log
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `www_asketill`
--

-- --------------------------------------------------------

--
-- Structure de la table `partie`
--

CREATE TABLE IF NOT EXISTS `partie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `suspect` varchar(25) NOT NULL,
  `raison` text NOT NULL,
  `canPlayWebgl` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=46 ;

--
-- Contenu de la table `partie`
--

INSERT INTO `partie` (`id`, `date`, `suspect`, `raison`, `canPlayWebgl`) VALUES
(3, '2014-07-28 16:05:11', 'etranger', '', 1),
(7, '2014-07-29 15:21:19', 'etranger', '', 1),
(9, '2014-07-29 15:33:41', 'etranger', '', 1),
(10, '2014-07-30 07:58:50', 'etranger', '', 1),
(31, '2014-07-30 08:01:25', 'etranger', '', 1),
(37, '2014-07-30 10:05:32', 'etranger', 'je pense qu''il a tuÃ© le barde parce qu''il Ã©tait saoul!', 1),
(38, '2014-07-30 12:46:20', 'etranger', '', 1),
(39, '2014-07-30 12:46:40', 'etranger', '', 1),
(41, '2014-07-30 14:34:44', 'arnvidar', '', 1),
(42, '2014-07-30 14:39:21', 'kotel', '', 1),
(43, '2014-07-31 12:35:19', 'slyna', '', 1),
(44, '2014-07-31 13:01:18', 'hansa', '', 1),
(45, '2014-07-31 13:03:34', 'inga', '', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
