import * as SQLite from 'expo-sqlite';
 
import { ToastSuccess } from '../src/Components/Notifications';

const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase("AmendisDatabase.db"),
};
const db = DatabaseConnection.getConnection();

export const createDatabase = () => {
  
  console.log('Debut de la creation de la base des données.');
  const p = new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        const onSuccess = () => {
          console.log(`Success`);
        };

        const onError = (tx, error) => {
          console.log(`Error`, { error });
          // throw Error("Statement failed.");
        };

        tx.executeSql(`PRAGMA foreign_keys = ON;`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS terminal;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS terminal (numeroTPL VARCHAR(10) PRIMARY KEY NOT NULL UNIQUE,rueEnLecture VARCHAR(100));`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS secteur;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS secteur (codeSecteur VARCHAR(10) PRIMARY KEY NOT NULL UNIQUE,designation VARCHAR(250));`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS rue;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS rue ( numeroRue VARCHAR(4) PRIMARY KEY NOT NULL UNIQUE,titreRue VARCHAR(15), nomRue TEXT, numeroTournee INTEGER, codeSecteur VARCHAR(10) NOT NULL,FOREIGN KEY(numeroTournee) REFERENCES tournee(numeroTournee) ON DELETE SET NULL ON UPDATE CASCADE, FOREIGN KEY(codeSecteur) REFERENCES secteur(codeSecteur) ON DELETE CASCADE ON UPDATE CASCADE);`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS etat;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS etat (codeEtat VARCHAR(2) PRIMARY KEY NOT NULL UNIQUE,designation VARCHAR(50));`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS tournee;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS tournee (numeroTournee INTEGER PRIMARY KEY NOT NULL UNIQUE, moisTourne VARCHAR(20), numeroTPL VARCHAR(10), userId INTEGER, FOREIGN KEY(numeroTPL) REFERENCES terminal(numeroTPL) ON DELETE CASCADE ON UPDATE CASCADE,FOREIGN KEY(userId) REFERENCES user(userId) ON DELETE SET NULL ON UPDATE CASCADE);`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS fluide;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS fluide (codeFluide VARCHAR(2) PRIMARY KEY NOT NULL UNIQUE,designation VARCHAR(50), filtreSup INTEGER, filtreInf INTEGER,filtreMax INTEGER,filtreMin INTEGER);`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS user;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS user ( userId INTEGER PRIMARY KEY AUTOINCREMENT, matricule VARCHAR(50) NOT NULL UNIQUE, nom VARCHAR(50),role VARCHAR(20));`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS compte;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS compte (compteId INTEGER PRIMARY KEY AUTOINCREMENT,email VARCHAR(50) NOT NULL UNIQUE,password TEXT,userId INTEGER NOT NULL UNIQUE,FOREIGN KEY(userId) REFERENCES user(userId) ON DELETE CASCADE ON UPDATE CASCADE);`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS anomalie;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS anomalie (codeAnomalie INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,designation VARCHAR(50),libele VARCHAR(5),codeFluide INTEGER,FOREIGN KEY(codeFluide) REFERENCES fluide(codeFluide) ON DELETE SET NULL ON UPDATE CASCADE);`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS compteur;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS compteur (compteurId INTEGER PRIMARY KEY AUTOINCREMENT,numeroCompteur VARCHAR(50) UNIQUE,idGeographique VARCHAR(10),nomAbonne VARCHAR(50),police VARCHAR(15),adresse TEXT,ancienIndex INTEGER,nouveauIndex INTEGER,etatLecture INTEGER DEFAULT 0,consommation INTEGER,consMoyenne INTEGER, dateReleve TEXT,heureReleve TEXT,nouveauIndex1 INTEGER, nouveauIndex2 INTEGER, nouveauIndex3 INTEGER,nouveauIndex4 INTEGER, nouveauIndex5 INTEGER, nouveauIndex6 INTEGER, nouveauIndex7 INTEGER, codeFluide INTEGER,numeroRue VARCHAR(4), codeSecteur VARCHAR(10), anomalie1 INTEGER , anomalie2 INTEGER ,FOREIGN KEY (anomalie1) REFERENCES anomalie(codeAnomalie) ON DELETE SET NULL ON UPDATE CASCADE,FOREIGN KEY (anomalie2) REFERENCES anomalie(codeAnomalie) ON DELETE SET NULL ON UPDATE CASCADE, FOREIGN KEY(codeFluide) REFERENCES fluide(codeFluide) ON DELETE SET NULL ON UPDATE CASCADE,FOREIGN KEY(numeroRue) REFERENCES rue(numeroRue) ON DELETE SET NULL ON UPDATE CASCADE,FOREIGN KEY(codeSecteur) REFERENCES secteur(codeSecteur) ON DELETE SET NULL ON UPDATE CASCADE);`, [], onSuccess, onError);

        // *********** INSERT SEED DATA ***************//

        tx.executeSql(`INSERT INTO user(matricule,nom,role) VALUES
          ('ABYO95','Abdouraouf Youssouf','Admin'),
          ('ABYO04','Abdolhalim Youssouf','Releveur'),
          ('ENYO02','Anfifedine Youssouf','Facturateur');`, [], onSuccess, onError);
        tx.executeSql(`INSERT INTO compte(email,password,userId) VALUES
          ('abdou@gmail.com','Abdou@2002',1),
          ('abdoulhalim@gmail.com','Alhalim@2020',2),
          ('anfifedine@gmail.com','Anfife@2002',3);`, [], onSuccess, onError);
      },
      () => {
        console.log(`TX fail`);
        reject();
      },
      () => {
        console.log(`TX OK.`);
        console.log('Fin creation base des données.');
        resolve();
      }
    );

    
  });
  return p;
}

export const seedDatabase = () => {
  console.log("Debut de l'insersion des données.");
  const p = new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        const onSuccess = () => {
          console.log(`Success`);
        };

        const onError = (tx, error) => {
          console.log(`Error`, { error });
          // throw Error("Statement failed.");
        };

        tx.executeSql(`PRAGMA foreign_keys = ON;`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS terminal;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS terminal (numeroTPL VARCHAR(10) PRIMARY KEY NOT NULL UNIQUE,rueEnLecture VARCHAR(100));`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS secteur;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS secteur (codeSecteur VARCHAR(10) PRIMARY KEY NOT NULL UNIQUE,designation VARCHAR(250));`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS rue;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS rue ( numeroRue VARCHAR(4) PRIMARY KEY NOT NULL UNIQUE,titreRue VARCHAR(15), nomRue TEXT, numeroTournee INTEGER, codeSecteur VARCHAR(10) NOT NULL,FOREIGN KEY(numeroTournee) REFERENCES tournee(numeroTournee) ON DELETE SET NULL ON UPDATE CASCADE, FOREIGN KEY(codeSecteur) REFERENCES secteur(codeSecteur) ON DELETE CASCADE ON UPDATE CASCADE);`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS tournee;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS tournee (numeroTournee INTEGER PRIMARY KEY NOT NULL UNIQUE, moisTourne VARCHAR(20), numeroTPL VARCHAR(10), userId INTEGER, FOREIGN KEY(numeroTPL) REFERENCES terminal(numeroTPL) ON DELETE CASCADE ON UPDATE CASCADE,FOREIGN KEY(userId) REFERENCES user(userId) ON DELETE SET NULL ON UPDATE CASCADE);`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS fluide;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS fluide (codeFluide VARCHAR(2) PRIMARY KEY NOT NULL UNIQUE,designation VARCHAR(50), filtreSup INTEGER, filtreInf INTEGER,filtreMax INTEGER,filtreMin INTEGER);`, [], onSuccess, onError);
       
        tx.executeSql(`DROP TABLE IF EXISTS etat;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS etat (codeEtat VARCHAR(2) PRIMARY KEY NOT NULL UNIQUE,designation VARCHAR(50));`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS user;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS user ( userId INTEGER PRIMARY KEY AUTOINCREMENT, matricule VARCHAR(50) NOT NULL UNIQUE, nom VARCHAR(50),role VARCHAR(20));`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS compte;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS compte (compteId INTEGER PRIMARY KEY AUTOINCREMENT,email VARCHAR(50) NOT NULL UNIQUE,password TEXT,userId INTEGER NOT NULL UNIQUE,FOREIGN KEY(userId) REFERENCES user(userId) ON DELETE CASCADE ON UPDATE CASCADE);`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS anomalie;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS anomalie (codeAnomalie INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,designation VARCHAR(50),libele VARCHAR(5),codeFluide INTEGER,FOREIGN KEY(codeFluide) REFERENCES fluide(codeFluide) ON DELETE SET NULL ON UPDATE CASCADE);`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS compteur;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS compteur (compteurId INTEGER PRIMARY KEY AUTOINCREMENT,
          numeroCompteur VARCHAR(50) UNIQUE,idGeographique VARCHAR(10),nomAbonne VARCHAR(50),police VARCHAR(15),
          adresse TEXT,ancienIndex INTEGER,nouveauIndex INTEGER,etatLecture INTEGER DEFAULT 0,consommation INTEGER,
          consMoyenne INTEGER, dateReleve TEXT,heureReleve TEXT,nouveauIndex1 INTEGER, nouveauIndex2 INTEGER, 
          nouveauIndex3 INTEGER,nouveauIndex4 INTEGER, nouveauIndex5 INTEGER, nouveauIndex6 INTEGER,
           nouveauIndex7 INTEGER, codeFluide INTEGER,numeroRue VARCHAR(4), codeSecteur VARCHAR(10), 
           anomalie1 INTEGER ,anomalie2 INTEGER ,codeEtat VARCHAR(2),
           FOREIGN KEY (anomalie1) REFERENCES anomalie(codeAnomalie) ON DELETE SET NULL ON UPDATE CASCADE,
           FOREIGN KEY(codeEtat) REFERENCES etat(codeEtat) ON DELETE SET NULL ON UPDATE CASCADE,
           FOREIGN KEY (anomalie2) REFERENCES anomalie(codeAnomalie) ON DELETE SET NULL ON UPDATE CASCADE, 
           FOREIGN KEY(codeFluide) REFERENCES fluide(codeFluide) ON DELETE SET NULL ON UPDATE CASCADE,
           FOREIGN KEY(numeroRue) REFERENCES rue(numeroRue) ON DELETE SET NULL ON UPDATE CASCADE,
           FOREIGN KEY(codeSecteur) REFERENCES secteur(codeSecteur) ON DELETE SET NULL ON UPDATE CASCADE);`, [], onSuccess, onError);

        // *********** INSERT SEED DATA ***************//

        tx.executeSql(`INSERT INTO terminal(numeroTPL) VALUES('TPL1');`, [], onSuccess, onError);
        tx.executeSql(`INSERT INTO secteur(codeSecteur,designation) VALUES
          ('SECT1','Mixta'),
          ('SECT2','Miramar'),
          ('SECT3','Ahrik');`, [], onSuccess, onError);
        tx.executeSql(`INSERT INTO rue(numeroRue,titreRue,codeSecteur) VALUES
          ('RUE1','Avenu Mohamed VI','SECT1'),
          ('RUE2','Avenu Meknes VI','SECT2'),
          ('RUE3','Avenu Fes VI','SECT1');`, [], onSuccess, onError);
        tx.executeSql(`INSERT INTO fluide(codeFluide,designation) VALUES
          ('EA','Eau'),
          ('BT','Basse tension'),
          ('MT','Moyenne tension'),
          ('EB','Eau et basse tension'),
          ('BM','Basse et moyenne tension'),
          ('EM','Eau et moyenne tension'),
          ('TT','Eau , basse et moyenne tension');`, [], onSuccess, onError);
        tx.executeSql(`INSERT INTO etat(codeEtat,designation) VALUES
          ('SE','En service'),
          ('CS','Coupé'),
          ('RA','Résilié abonné'),
          ('RS','Résilié société'),
          ('RM','Résilié Amendis');`, [], onSuccess, onError);
        tx.executeSql(`INSERT INTO anomalie(designation,codeFluide,libele) VALUES
          ('Compteur Bloqué','EA','CBQ'),
          ('Compteur tres haut','EA','CTH'),
          ('Compteur mal posé','EA','CMP'),
          ('Compteur à interieur','EA','CAI'),
          ('Compteur à envers','EA','CAE'),
          ('Compteur Endomagé','EA','CE'),
          ('Compteur Ilisible','EA','CI'),
          ('Compteur fait du bruit','EA','CFB'),
          ('Compteur Disparu','EA','CD');`, [], onSuccess, onError);
        tx.executeSql(`INSERT INTO user(matricule,nom,role) VALUES
          ('ABYO95','Abdouraouf Youssouf','Admin'),
          ('ABYO04','Abdolhalim Youssouf','Releveur'),
          ('ENYO02','Anfifedine Youssouf','Facturateur'),
          ('ANYO96','Ansumati Youssouf','Releveur'),
          ('AnMO98','Anlim Mohamed','Facturateur'),
          ('DJMA97','Djalaloudine Mansour','Releveur');`, [], onSuccess, onError);
        tx.executeSql(`INSERT INTO compte(email,password,userId) VALUES
          ('abdou@gmail.com','Abdou@2002',1),
          ('alhalim@gmail.com','Alhalim@2004',2),
          ('anfife@gmail.com','Anfife@2002',3),
          ('ansumati@gmail.com','Ansumati.Youssouf@1996',4),
          ('anlim@gmail.com','Anlim.Mahmoud@1998',5),
          ('doveya@gmail.com','Doveya@2020',6);`, [], onSuccess, onError);
        tx.executeSql(`INSERT INTO tournee(numeroTournee,moisTourne,numeroTPL,userId) VALUES
          (20,'Avril','TPL1',2),
          (21,'Mais','TPL1',1),
          (22,'Juin','TPL1',2);`, [], onSuccess, onError);
        tx.executeSql(`INSERT INTO compteur(numeroCompteur,nomAbonne ,adresse,numeroRue,codeSecteur,codeFluide,idGeographique,police,codeEtat,etatLecture,ancienIndex,consMoyenne) VALUES
        ('117571','Belmaati imane IDRISSU BOUZIDI YOUSSEF','5 COMPLEX MIXTA SAFIA Et.2 App.44 BLOC 5 Martil','RUE1','SECT1','EA','IDGeo1','POLICE1','SE',0,50,100),
        ('124572','Hamidou IDRISSU Said YOUSSEF','6 COMPLEX MIXTA SAFIA Et.2 App.44 BLOC 6 Martil','RUE2','SECT2','MT','IDGeo2','POLICE2','CS',null,40,50),
        ('132573','IDAROUSSI IDRISSU BOUZIDI','7 COMPLEX MIXTA SAFIA Et.2 App.44 BLOC 7 Martil','RUE3','SECT3','BT','IDGeo3','POLICE3','RA',0,0,150),
        ('147574','Abdouraouf Youssouf','5 COMPLEX MIXTA SAFIA Et.2 App.44 BLOC 5 Martil','RUE1','SECT1','EA','IDGeo4','POLICE4','SE',0,30,200),
        ('154575','Djalaloudine mohamed','6 COMPLEX MIXTA SAFIA Et.2 App.44 BLOC 6 Martil','RUE2','SECT2','MT','IDGeo5','POLICE5','CS',0,10,250),
        ('162576','Abdoulhalim Youssouf','7 COMPLEX MIXTA SAFIA Et.2 App.44 BLOC 7 Martil','RUE3','SECT3','BT','IDGeo6','POLICE6','RA',0,20,40),
        ('124577','Hamidou IDRISSU Said YOUSSEF','6 COMPLEX MIXTA SAFIA Et.2 App.44 BLOC 6 Martil','RUE2','SECT2','MT','IDGeo7','POLICE7','CS',null,40,60),
        ('132078','IDAROUSSI IDRISSU BOUZIDI','7 COMPLEX MIXTA SAFIA Et.2 App.44 BLOC 7 Martil','RUE3','SECT3','BT','IDGeo8','POLICE8','RA',0,0,70),
        ('147179','Abdouraouf Youssouf','5 COMPLEX MIXTA SAFIA Et.2 App.44 BLOC 5 Martil','RUE1','SECT1','EA','IDGeo9','POLICE9','SE',0,30,80),
        ('154210','Djalaloudine mohamed','6 COMPLEX MIXTA SAFIA Et.2 App.44 BLOC 6 Martil','RUE2','SECT2','MT','IDGeo10','POLICE10','CS',0,10,90),
        ('162311','Abdoulhalim Youssouf','7 COMPLEX MIXTA SAFIA Et.2 App.44 BLOC 7 Martil','RUE3','SECT3','BT','IDGeo11','POLICE11','RA',0,20,110),
        ('176412','Andhimdine Youssouf','8 COMPLEX MIXTA SAFIA Et.2 App.45 BLOC 8 Martil','RUE1','SECT1','EA','IDGeo12','POLICE12','RS',0,60,120);`, [], onSuccess, onError);

      },
      () => {
        console.log(`TX fail`);
        reject();
      },
      () => {
        ToastSuccess('Inserssion des donnés reussi!')
        console.log(`TX OK.`);
        console.log("Fin de l'insersion des données.");
        resolve();
      }
    );
  });
  return p;
}
export const dropAllTables = () => {
  console.log("Debut de la suppression des tables.");
  const p = new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        const onSuccess = () => {
          console.log(`Success`);
        };

        const onError = (tx, error) => {
          console.log(`Error`, { error });
        };
        tx.executeSql(`DROP TABLE IF EXISTS terminal;`, [], onSuccess, onError);
        tx.executeSql(`DROP TABLE IF EXISTS secteur;`, [], onSuccess, onError);
        tx.executeSql(`DROP TABLE IF EXISTS rue;`, [], onSuccess, onError);
        tx.executeSql(`DROP TABLE IF EXISTS tournee;`, [], onSuccess, onError);
        tx.executeSql(`DROP TABLE IF EXISTS fluide;`, [], onSuccess, onError);
        tx.executeSql(`DROP TABLE IF EXISTS user;`, [], onSuccess, onError);
        tx.executeSql(`DROP TABLE IF EXISTS compte;`, [], onSuccess, onError);
        tx.executeSql(`DROP TABLE IF EXISTS anomalie;`, [], onSuccess, onError);
        tx.executeSql(`DROP TABLE IF EXISTS compteur;`, [], onSuccess, onError);
      },
      () => {
        console.log(`TX fail`);
        reject();
      },
      () => {
        ToastSuccess('Suppression des tables reussi!')
        console.log(`TX OK.`);
        console.log("Fin de la suppression des tables.");
        resolve();
      }
    );
  });
  return p;
}

export const creteTerminal = (numerTerminal, rueEnLecture) => {
  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO terminal (numeroTPL, rueEnLecture) VALUES (?,?)',
      [numerTerminal, rueEnLecture],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          console.log('Data saved!!')
        } else console.log('Erreur enregistrement du terminal !!!');
      }
    );
  });

}

export default db;