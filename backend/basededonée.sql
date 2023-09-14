SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";
-- Table structure for table `authentification`
--


CREATE TABLE Users(
   id_user VARCHAR(50),
   firstName VARCHAR(50) ,
   lastName VARCHAR(50) ,
   email VARCHAR(50) unique,
   password VARCHAR(255),
   createdAt DATETIME NOT NULL,
   updatedAt DATETIME NOT NULL,
   PRIMARY KEY(id_user)
);

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `Users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;




CREATE TABLE categories(
   id_cat VARCHAR(50),
  nom VARCHAR(50) unique,
   createdAt DATETIME NOT NULL,
   updatedAt DATETIME NOT NULL,
   PRIMARY KEY(id_cat)
);


--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id_cat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;



  CREATE TABLE depenses(
   id_dep varchar(50),
   id_user int(11) unique,
   id_cat int(11) unique,
   Montant DOUBLE NOT NULL,
   Date date NOT NULL,
   Description VARCHAR(500) NOT NULL,
   createdAt DATETIME NOT NULL,
   updatedAt DATETIME NOT NULL,
   FOREIGN KEY (id_user) REFERENCES Users(id_user),
    FOREIGN KEY (id_cat) REFERENCES categories(id_cat),
   PRIMARY KEY(id_dep)
);
-- AUTO_INCREMENT for table `des depenses`--
ALTER TABLE `depenses`
  MODIFY `id_dep` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;



CREATE TABLE revenues(
   id_rev VARCHAR(50),
   id_user  VARCHAR(50) unique,
   Montant DOUBLE NOT NULL,
   Date date NOT NULL,
   Description VARCHAR(500) NOT NULL,
   createdAt DATETIME NOT NULL,
   updatedAt DATETIME NOT NULL,
   FOREIGN KEY (id_user)REFERENCES Users(id_user) ,
   PRIMARY KEY(id_rev)
);

--
-- AUTO_INCREMENT for table `revenues`
--
ALTER TABLE `revenues`
  MODIFY `id_rev` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
  