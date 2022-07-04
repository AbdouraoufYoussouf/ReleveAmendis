import React, { useState } from 'react';
import db from '../services/SqliteDb';
import { ToastEchec, ToastSuccess } from '../src/Components/Notifications';

export const createNewCompteur = (numeroCompteur, idGeographique, nomAbonne, adresse) => {

  console.log("Debut de l'ajout d'un compteur.");
  let result = '';
  const p = new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        const onSuccess = () => {
          console.log(`Success`);
          ToastSuccess('Compteur ajouté avec success!!');
        };
        const onError = (tx, error) => {
          console.log('error', error);
          ToastEchec("Error,le numero du compteur éxiste déjà!");
          // throw Error("Statement failed.");
        };
        //*********** Requettes *********//
        tx.executeSql(`INSERT INTO compteur(numeroCompteur,idGeographique,nomAbonne,adresse) VALUES (?,?,?,?);`,
          [numeroCompteur, idGeographique, nomAbonne, adresse],
          onSuccess, onError);
        if (onSuccess) {

        }
      },
      () => {
        console.log(`TX fail`);
        reject();
      },
      () => {
        console.log(`TX OK.`);
        console.log("Fin de l'ajout d'un compteur.");
        resolve();
      }
    );
  });

}
export const updateNewIndex = (numCompt,newIndex, anomalie1, anomalie2,consommation) => {

  console.log("Debut de l'ajout d'un compteur.");
  let result = '';
  const p = new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        const onSuccess = () => {
          console.log(`Success`);
          ToastSuccess('Compteur lu avec success!!');
        };
        const onError = (tx, error) => {
          console.log('error', error);
          ToastEchec("Error:", error);
          // throw Error("Statement failed.");
        };
        //*********** Requettes *********//
        tx.executeSql(`UPDATE compteur SET
          nouveauIndex = ${newIndex},
          anomalie1 = ${anomalie1},
          anomalie2 = ${anomalie2},
          consommation = ${consommation},
          etatLecture = 1,
          dateReleve=CURRENT_DATE,
          heureReleve = CURRENT_TIME
          WHERE numeroCompteur=${numCompt};`,
          [],
          onSuccess, onError);
        if (onSuccess) {

        }
      },
      () => {
        console.log(`TX fail`);
        reject();
      },
      () => {
        console.log(`TX OK.`);
        console.log("Fin de l'ajout d'un compteur.");
        resolve();
      }
    );
  });

}
