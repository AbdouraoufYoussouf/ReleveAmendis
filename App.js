import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import StackNavigation from './src/Navigation/StackNavigation';
import db, { createDatabase, dropAllTables } from './services/SqliteDb';
import { Root } from 'react-native-alert-notification';
import {  useDispatch, useSelector } from 'react-redux';
import { setAnomalies, setDesignationAnomalies } from './services/redux/anomalieSlice'
import { loding, setCompteurs } from './services/redux/compteurSlice';
import { NativeBaseProvider, Text, extendTheme } from 'native-base';

export default function App() {
  const dispatch = useDispatch();
  const compteurs = useSelector((state) => state.compteurs);
 // console.log('lescompteurs',compteurs)

  //dropAllTables()
  /////// Create DB if not exist ***********
  useEffect(() => {
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

    ///////*********** Add All anomalies to store //////// */
    db.transaction(function (txn) {
      txn.executeSql(
        'SELECT * FROM anomalie',
        [],
        (tx, res) => {
          var temp = [];
          let len = res.rows.length;
          // console.log('Anomalie:', len);
          for (let i = 0; i < len; ++i)
            temp.push(res.rows.item(i));
          dispatch(setAnomalies(temp))
        }
      );
    });
    ///////*********** Add All Designations anomalies to store //////// */
    db.transaction(function (txn) {
      txn.executeSql(
        'SELECT designation FROM anomalie',
        [],
        (tx, res) => {
          var temp = [];
          let len = res.rows.length;
          //console.log('Designations anomalie:', len);
          for (let i = 0; i < len; ++i)
            temp.push(res.rows.item(i));
          dispatch(setDesignationAnomalies(temp))
        }
      );
    });

    ///////*********** Add All fluides to store //////// */
    db.transaction(function (txn) {
      txn.executeSql(
        'SELECT * FROM compteur',
        [],
        (tx, res) => {
          var temp = [];
          let len = res.rows.length;
          console.log('Compteur:', len);
          for (let i = 0; i < len; ++i)
            temp.push(res.rows.item(i));
          //console.log(temp[0])
          dispatch(loding());
          dispatch(setCompteurs(temp))
        }
      );
    });
    ///////*********** Add All fluides to store //////// */
    //dropAllTables()

  }, []);


  return (
    
      <Root >
        <NavigationContainer>
          <StatusBar barStyle='light-content' backgroundColor='gray' />
          <StackNavigation />
        </NavigationContainer>
      </Root>
  );
}

