SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- Table structure for table `authentification`

CREATE TABLE Users (
   id INT(11) NOT NULL AUTO_INCREMENT,
   firstName VARCHAR(50),
   lastName VARCHAR(50),
   email VARCHAR(50) UNIQUE,
   password VARCHAR(255),
   createdAt DATETIME NOT NULL,
   updatedAt DATETIME NOT NULL,
   PRIMARY KEY (id, email)
);

-- AUTO_INCREMENT for table `users`
ALTER TABLE `Users`
  MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

CREATE TABLE categories (
   id_cat INT(11) NOT NULL AUTO_INCREMENT,
   nom_cat VARCHAR(50) UNIQUE,
   createdAt DATETIME NOT NULL,
   updatedAt DATETIME NOT NULL,
   id INT(11),
   PRIMARY KEY (id_cat),
   FOREIGN KEY (id) REFERENCES Users (id)
);

-- AUTO_INCREMENT for table `categories`
ALTER TABLE `categories`
  MODIFY `id_cat` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

CREATE TABLE depenses (
   id_dep INT(11) NOT NULL AUTO_INCREMENT,
   id INT(11),
   id_cat INT(11),
   Montant DOUBLE NOT NULL,
   Categorie VARCHAR(50),
   Date DATE NOT NULL,
   Description VARCHAR(500) NOT NULL,
   createdAt DATETIME NOT NULL,
   updatedAt DATETIME NOT NULL,
   PRIMARY KEY (id_dep),
   FOREIGN KEY (id) REFERENCES Users (id),
   FOREIGN KEY (id_cat) REFERENCES categories (id_cat)
);

-- AUTO_INCREMENT for table `depenses`
ALTER TABLE `depenses`
  MODIFY `id_dep` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;



CREATE TABLE revenues(
   id_rev VARCHAR(50),
   id int(11),
   Montant DOUBLE NOT NULL,
   Date DATE NOT NULL,
   Description VARCHAR(500) NOT NULL,
   createdAt DATETIME NOT NULL,
   updatedAt DATETIME NOT NULL,
   FOREIGN KEY (id)REFERENCES Users(id) ,
   PRIMARY KEY(id_rev)
);

-- AUTO_INCREMENT for table `revenues`
ALTER TABLE `revenues`
  MODIFY `id_rev` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
