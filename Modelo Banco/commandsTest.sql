##ALTER TABLE resposta MODIFY COLUMN resposta.idresposta INT(11) auto_increment;

#Store procedure for remove user and perfil
DELIMITER $$
CREATE PROCEDURE removeUser (IN id INT)
BEGIN
	DECLARE idStore INT DEFAULT NULL;
    SET idStore = (SELECT perfil_idperfil FROM user WHERE iduser = id);
    DELETE FROM user WHERE iduser=id;
    DELETE FROM perfil WHERE idperfil=id;
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

#Store procedure for counter score
DELIMITER $$
CREATE PROCEDURE countScore (IN id INT)
BEGIN
		(SELECT
			(
			ISNULL(NULLIF(r.nome,'')) +
			ISNULL(NULLIF(r.cidade,'')) +
			ISNULL(NULLIF(r.animal,'')) +
			ISNULL(NULLIF(r.fruta,'')) +
			ISNULL(NULLIF(r.cor,'')) +
			ISNULL(NULLIF(r.profissao,'')) +
			ISNULL(NULLIF(r.carro,'')) +
			ISNULL(NULLIF(r.filme,''))
			) 'nColVazias',
			p.nome as 'nomePartida'
			FROM resposta as r, user_has_partida as uhp, partida p
			WHERE r.partida_idpartida = uhp.partida_idpartida
			AND r.user_iduser= uhp.user_iduser
			AND p.idpartida = uhp.partida_idpartida
			AND uhp.user_iduser=id
		);
END $$
DELIMITER ;

CALL countScore(15);


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








