-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 14-Nov-2018 às 03:33
-- Versão do servidor: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webstop`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `createUser` (IN `nomeUser` VARCHAR(50), IN `emailUser` VARCHAR(50), IN `senhaUser` VARCHAR(50))  BEGIN
	DECLARE idP INT DEFAULT NULL; 
	INSERT INTO perfil (`idPerfil`,`vitorias`,`derrotas`, `pontuacao`) values(NULL, 0, 0, 0);
    SET idP = (SELECT LAST_INSERT_ID());
	INSERT INTO USER VALUES(NULL, nomeUser,emailUser,senhaUser, idP);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `perfilUserUpdate` (IN `id` INT, IN `v` INT, IN `d` INT, IN `p` FLOAT)  BEGIN
	UPDATE perfil SET vitorias=vitorias+v WHERE idperfil=id;
	UPDATE perfil SET derrotas=derrotas+d WHERE idperfil=id;
	UPDATE perfil SET pontuacao=pontuacao+p WHERE idperfil=id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `removeUser` (IN `mail` TEXT CHARSET utf8)  BEGIN
	DECLARE idStore INT DEFAULT NULL;
    SET idStore = (SELECT perfil_idperfil FROM user WHERE email = mail);
    DELETE FROM user WHERE email=mail;
    DELETE FROM perfil WHERE idperfil=idStore;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `partida`
--

CREATE TABLE `partida` (
  `idpartida` int(11) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `em_progresso` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `partida`
--

INSERT INTO `partida` (`idpartida`, `nome`, `em_progresso`) VALUES
(16, 'admin', '1'),
(17, 'teste', '1'),
(18, 'emerson', '1');

-- --------------------------------------------------------

--
-- Estrutura da tabela `perfil`
--

CREATE TABLE `perfil` (
  `idperfil` int(11) NOT NULL,
  `vitorias` int(11) NOT NULL,
  `derrotas` int(11) NOT NULL,
  `pontuacao` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `perfil`
--

INSERT INTO `perfil` (`idperfil`, `vitorias`, `derrotas`, `pontuacao`) VALUES
(14, 0, 0, 0),
(15, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `resposta`
--

CREATE TABLE `resposta` (
  `idresposta` int(11) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `cidade` varchar(45) NOT NULL,
  `animal` varchar(45) NOT NULL,
  `fruta` varchar(45) NOT NULL,
  `cor` varchar(45) NOT NULL,
  `profissao` varchar(45) NOT NULL,
  `carro` varchar(45) NOT NULL,
  `filme` varchar(45) NOT NULL,
  `user_iduser` int(11) NOT NULL,
  `partida_idpartida` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

CREATE TABLE `user` (
  `iduser` int(11) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `senha` varchar(45) NOT NULL,
  `perfil_idperfil` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`iduser`, `nome`, `email`, `senha`, `perfil_idperfil`) VALUES
(12, 'Emerson', 'emerson.oliveira@gec.inatel.br', '123', 15);

-- --------------------------------------------------------

--
-- Estrutura da tabela `user_has_partida`
--

CREATE TABLE `user_has_partida` (
  `user_iduser` int(11) NOT NULL,
  `partida_idpartida` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `partida`
--
ALTER TABLE `partida`
  ADD PRIMARY KEY (`idpartida`);

--
-- Indexes for table `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`idperfil`);

--
-- Indexes for table `resposta`
--
ALTER TABLE `resposta`
  ADD PRIMARY KEY (`idresposta`),
  ADD KEY `fk_resposta_user1_idx` (`user_iduser`),
  ADD KEY `fk_resposta_partida1_idx` (`partida_idpartida`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`iduser`),
  ADD KEY `fk_user_perfil_idx` (`perfil_idperfil`);

--
-- Indexes for table `user_has_partida`
--
ALTER TABLE `user_has_partida`
  ADD PRIMARY KEY (`user_iduser`,`partida_idpartida`),
  ADD KEY `fk_user_has_partida_partida1_idx` (`partida_idpartida`),
  ADD KEY `fk_user_has_partida_user1_idx` (`user_iduser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `partida`
--
ALTER TABLE `partida`
  MODIFY `idpartida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `perfil`
--
ALTER TABLE `perfil`
  MODIFY `idperfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `resposta`
--
ALTER TABLE `resposta`
  MODIFY `idresposta` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `iduser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `resposta`
--
ALTER TABLE `resposta`
  ADD CONSTRAINT `fk_resposta_partida1` FOREIGN KEY (`partida_idpartida`) REFERENCES `partida` (`idpartida`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_resposta_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_perfil` FOREIGN KEY (`perfil_idperfil`) REFERENCES `perfil` (`idperfil`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `user_has_partida`
--
ALTER TABLE `user_has_partida`
  ADD CONSTRAINT `fk_user_has_partida_partida1` FOREIGN KEY (`partida_idpartida`) REFERENCES `partida` (`idpartida`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_has_partida_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
