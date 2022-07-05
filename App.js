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
import { AddDataToStore } from './services/AddDataTotore';

export default function App() {
  const dispatch = useDispatch()
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

    AddDataToStore(dispatch);
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

