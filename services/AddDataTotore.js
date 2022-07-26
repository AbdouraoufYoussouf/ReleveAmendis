//import { useDispatch } from "react-redux"
import { setAnomalies, setDesignationAnomalies } from "./redux/anomalieSlice";
import { loding, setAncienCompteurs, setCompteurs } from "./redux/compteurSlice";
import { setRue, setSecteur, setTourne } from "./redux/rueSecteurSlice";
import db from "./SqliteDb";

export const AddDataToStore = (dispatch,userId) => {
    //const dispatch = useDispatch();
    ///Anomalies
    db.transaction(function (txn) {
        txn.executeSql(
            'SELECT * FROM anomalie',
            [],
            (tx, res) => {
                var temp = [];
                let len = res.rows.length;
                for (let i = 0; i < len; ++i)
                temp.push(res.rows.item(i));
                dispatch(setAnomalies(
                    { anomalies: temp }
                    ))
                    //console.log('Anomalie:', len);
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
               // console.log(temp[1])
                //dispatch(loding());
                dispatch(setAncienCompteurs(temp))
            }
        );
    });

    ///////*********** Add All Designations anomalies to store //////// */
    db.transaction(function (txn) {
        txn.executeSql(
            'SELECT * FROM anomalie',
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
    ///////*********** Add rue to store //////// */
    db.transaction(function (txn) {
        txn.executeSql(
            'SELECT * FROM rue',
            [],
            (tx, res) => {
                var temp = [];
                let len = res.rows.length;
                for (let i = 0; i < len; ++i)
                temp.push(res.rows.item(i));
                dispatch(setRue(temp))
                console.log('rues:', len);
            }
        );
    });
    ///////*********** Add Secteur to store //////// */
    db.transaction(function (txn) {
        txn.executeSql(
            'SELECT * FROM secteur',
            [],
            (tx, res) => {
                var temp = [];
                let len = res.rows.length;
                for (let i = 0; i < len; ++i)
                temp.push(res.rows.item(i));
                dispatch(setSecteur(temp))
                console.log('secteurs:', len);
            }
        );
    });
   

}