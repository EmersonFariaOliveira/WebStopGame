##ALTER TABLE resposta MODIFY COLUMN resposta.idresposta INT(11) auto_increment;

#Store procedure for remove user and perfil
DELIMITER $$
CREATE PROCEDURE removeUser (IN id INT)
BEGIN
	DECLARE idStore INT DEFAULT NULL;
    SET idStore = (SELECT perfil_idperfil FROM user WHERE iduser = id);
    DELETE FROM user WHERE iduser=id;
    DELETE FROM perfil WHERE idperfil=idStore;
END $$
DELIMITER ;



DELIMITER $$
CREATE PROCEDURE perfilUserUpdate (IN id INT,IN v INT,IN d INT, IN p FLOAT)
BEGIN
	UPDATE perfil SET vitorias=vitorias+v WHERE idperfil=id;
	UPDATE perfil SET derrotas=derrotas+d WHERE idperfil=id;
	UPDATE perfil SET pontuacao=pontuacao+p WHERE idperfil=id;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE createUser (IN nomeUser VARCHAR(50), IN emailUser VARCHAR(50),IN senhaUser VARCHAR(50))
BEGIN
	DECLARE idP INT DEFAULT NULL; 
	INSERT INTO perfil (`idPerfil`,`vitorias`,`derrotas`, `pontuacao`) values(NULL, 0, 0, 0);
    SET idP = (SELECT LAST_INSERT_ID());
	INSERT INTO USER VALUES(NULL, nomeUser,emailUser,senhaUser, idP);
END $$
DELIMITER ;


insert into perfil (`idPerfil`,`vitorias`,`derrotas`, `pontuacao`) values(NULL, 0, 0, 0);
insert into user values(NULL, "jefferson","jefferson@gmail.com", "inatelsemfio", 1);

insert into perfil (`idPerfil`,`vitorias`,`derrotas`, `pontuacao`) values(NULL, 0, 0, 0);
insert into user values(NULL, "teste","teste@gmail.com", "inatelsemfio", 2);

insert into perfil (`idPerfil`,`vitorias`,`derrotas`, `pontuacao`) values(NULL, 0, 0, 0);
insert into user values(NULL,"eeeee","eeeee@gmail.com", "inatelsemfio", 5);

select *from user;
select *from perfil;
delete from webstop.user where idUser = 2;

CALL perfilUser(2,0,0,0);
CALL removeUser(2);
CALL createUser("a", "a@gmail.com", "a");

SELECT LAST_INSERT_ID();
