import db from "./SqliteDb";
import {setAnomalies} from './redux/anomalieSlice'
import { ToastEchec, ToastSuccess } from "../src/Components/Notifications";

export const AddAnomaliesStore = () => {

    db.transaction(function (txn) {
        txn.executeSql(
          'SELECT * FROM anomalie',
          [],
          (tx, res) => {
            var temp = [];
            let len = res.rows.length;
            for (let i = 0; i < len; ++i)
            temp.push(res.rows.item(i));
            
           // console.log('Anomalie:', temp);
          }
        );
      });
} 

export const UpdateAnomalie = ({codeAnomalie,codeFluide, designation, libele}) => {  
  const p = new Promise((resolve, reject) => {
      console.log("Debut update d'un Anomalie.");
      db.transaction(
        tx => {
          const onSuccess = () => {
            console.log(`Success`);
            ToastSuccess('Anomlie updated!!');
            
          };
          const onError = (tx, error) => {
            console.log('error', error);
            ToastEchec("Error:", error);
            // throw Error("Statement failed.");
          };
          //*********** Requettes *********//
          tx.executeSql(`UPDATE anomalie SET
          codeFluide = '${codeFluide}'
          WHERE codeAnomalie='${codeAnomalie}';`,
            [],
            onSuccess, onError);
        },
        () => {
          console.log(`TX fail`);
          reject();
        },
        () => {
          console.log(`TX OK.`);
          console.log("Fin update d'un Anomalie.");
          resolve();
        }
      );
    });
    
  }