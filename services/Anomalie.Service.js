import { useDispatch } from "react-redux";
import db from "./SqliteDb";
import {setAnomalies} from './redux/anomalieSlice'

export const AddAnomaliesStore = () => {
    const dispatch = useDispatch();

    db.transaction(function (txn) {
        txn.executeSql(
          'SELECT * FROM anomalie',
          [],
          (tx, res) => {
            var temp = [];
            let len = res.rows.length;
            console.log('Anomalie:', len);
            for (let i = 0; i < len; ++i)
              temp.push(res.rows.item(i));
            dispatch(setAnomalies(
                { anomalies:temp }
            ))
            }
        );
      });
} 