//import { useDispatch } from "react-redux"
import { setAnomalies, setDesignationAnomalies } from "./redux/anomalieSlice";
import { loding, setCompteurs } from "./redux/compteurSlice";
import db from "./SqliteDb";

export const AddDataToStore = (dispatch) => {
    //const dispatch = useDispatch();
    ///Anomalies
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
                    { anomalies: temp }
                ))
            }
        );
    });
    ///Compteurs
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

}