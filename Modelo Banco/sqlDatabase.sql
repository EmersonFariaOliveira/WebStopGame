-- MySQL Script generated by MySQL Workbench
-- Tue Oct  2 11:40:44 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema webstop
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema webstop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `webstop` DEFAULT CHARACTER SET utf8 ;
USE `webstop` ;

-- -----------------------------------------------------
-- Table `webstop`.`partida`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webstop`.`partida` (
  `idpartida` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `em_progresso` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idpartida`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `webstop`.`perfil`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webstop`.`perfil` (
  `idperfil` INT(11) NOT NULL AUTO_INCREMENT,
  `vitorias` INT NOT NULL,
  `derrotas` INT NOT NULL,
  `pontuacao` FLOAT NOT NULL,
  PRIMARY KEY (`idperfil`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `webstop`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webstop`.`user` (
  `iduser` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `perfil_idperfil` INT(11) NOT NULL,
  PRIMARY KEY (`iduser`),
  INDEX `fk_user_perfil_idx` (`perfil_idperfil` ASC),
  CONSTRAINT `fk_user_perfil`
    FOREIGN KEY (`perfil_idperfil`)
    REFERENCES `webstop`.`perfil` (`idperfil`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `webstop`.`resposta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webstop`.`resposta` (
  `idresposta` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `animal` VARCHAR(45) NOT NULL,
  `fruta` VARCHAR(45) NOT NULL,
  `cor` VARCHAR(45) NOT NULL,
  `profissao` VARCHAR(45) NOT NULL,
  `carro` VARCHAR(45) NOT NULL,
  `filme` VARCHAR(45) NOT NULL,
  `user_iduser` INT(11) NOT NULL,
  `partida_idpartida` INT(11) NOT NULL,
  PRIMARY KEY (`idresposta`),
  INDEX `fk_resposta_user1_idx` (`user_iduser` ASC),
  INDEX `fk_resposta_partida1_idx` (`partida_idpartida` ASC),
  CONSTRAINT `fk_resposta_partida1`
    FOREIGN KEY (`partida_idpartida`)
    REFERENCES `webstop`.`partida` (`idpartida`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_resposta_user1`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `webstop`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `webstop`.`user_has_partida`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webstop`.`user_has_partida` (
  `user_iduser` INT(11) NOT NULL,
  `partida_idpartida` INT(11) NOT NULL,
  PRIMARY KEY (`user_iduser`, `partida_idpartida`),
  INDEX `fk_user_has_partida_partida1_idx` (`partida_idpartida` ASC),
  INDEX `fk_user_has_partida_user1_idx` (`user_iduser` ASC),
  CONSTRAINT `fk_user_has_partida_partida1`
    FOREIGN KEY (`partida_idpartida`)
    REFERENCES `webstop`.`partida` (`idpartida`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_partida_user1`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `webstop`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
