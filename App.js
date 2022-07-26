import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import StackNavigation from './src/Navigation/StackNavigation';
import db, { createDatabase, dropAllTables, seedDatabase } from './services/SqliteDb';
import { Root } from 'react-native-alert-notification';
import { useDispatch, useSelector } from 'react-redux';
import { setAnomalies, setDesignationAnomalies, updatedAnomalieStore } from './services/redux/anomalieSlice'
import { loding, setAncienCompteurs, setCompteurs } from './services/redux/compteurSlice';
import { NativeBaseProvider, Text, extendTheme } from 'native-base';
import { AddDataToStore } from './services/AddDataTotore';
import { AddAnomaliesStore, UpdateAnomalie } from './services/Anomalie.Service';

export default function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.value);
  const userId = user.userId;
//console.log('usser',userId)
  
const updateDataAnomalie = (codeAnomalie, designation, codeFluide, libele) => {
    UpdateAnomalie(codeAnomalie, codeFluide, designation, libele)
    dispatch(updatedAnomalieStore({ codeAnomalie: codeAnomalie, designation, codeFluide, libele }))
  }

  useEffect(() => {
    /////// Create DB if not exist ***********
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT 1 from sqlite_master WHERE type='table' AND name = 'user'",
        [],
        function (tx, res) {
          console.log('APP DB exist =', res.rows.length);
          if (res.rows.length == 0) {
            createDatabase();
          }
        }
      );
    });

   
    AddDataToStore(dispatch,userId);
    //dropAllTables()
  //seedDatabase()

  
  }, []);

  db.transaction(function (txn) {
    txn.executeSql(
        'SELECT * FROM compteur',
        [],
        (tx, res) => {
            var temp = [];
            let len = res.rows.length;
            for (let i = 0; i < len; ++i)
            temp.push(res.rows.item(i));
            //console.log('Compteur:', temp);
            const comptNonLus = temp.filter((nlu) => nlu.etatLecture == 0 || nlu.etatLecture == null)
            let newCompteurs = comptNonLus.map((item, index) => {
              return {
                compteurId: index + 1,idCompteur:item.compteurId, numeroCompteur: item.numeroCompteur, ancienIndex: item.ancienIndex,
                anomalie1: item.anomalie1, codeEtat: item.codeEtat, codeFluide: item.codeFluide,
                codeSecteur: item.codeSecteur, consMoyenne: item.consMoyenne, dateReleve: item.dateReleve,
                heureReleve: item.heureReleve, etatLecture: item.etatLecture, idGeographique: item.idGeographique,
                nomAbonne: item.nomAbonne, nouveauIndex: item.nouveauIndex, nouveauIndex1: item.nouveauIndex1,
                nouveauIndex2: item.nouveauIndex2, nouveauIndex3: item.nouveauIndex3, nouveauIndex4: item.nouveauIndex4,
                nouveauIndex5: item.nouveauIndex5, nouveauIndex6: item.nouveauIndex6, nouveauIndex7: item.nouveauIndex7,
                numeroRue: item.numeroRue, police: item.police, adresse: item.adresse, consommation: item.consommation
              }
            })
            dispatch(
              dispatch(setCompteurs(newCompteurs))
            )
          }
    );
});

  return (

    <Root >
      <NavigationContainer>
        <StatusBar barStyle='light-content' backgroundColor='gray' />
        <StackNavigation />
      </NavigationContainer>
    </Root>
  );
}

