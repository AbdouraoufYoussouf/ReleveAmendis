import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Form, FormControle, MyText, InputFild, Label, FormInput, MyButton } from '../styles/homeStyle';
import SelectDropdown from 'react-native-select-dropdown';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { ToastSuccess } from '../../Components/Notifications';
import { BarIndicator, UIActivityIndicator, } from 'react-native-indicators';
import { notLoding } from '../../../services/redux/compteurSlice';
import MyLoader from '../../Components/MyLoader';
import { SearchCompteur } from '../Compteurs/SearchCompteur';

export default function HomeReleveScreen({ navigation, route }) {
  const dispatch = useDispatch();

  const DesignationAnomalie = useSelector((state) => state.anomalies.designationAnomalie);
  const datas = useSelector((state) => state.compteurs.compteurs);
  const [compteurs, setCompteurs] = useState([])
  const isLoding = useSelector((state) => state.compteurs.isLoding);
  //const isLoding = true;
  //console.log('idcompteur', compteurs[1].compteurId)

  const idCompteur = useSelector((state) => state.compteurs.idCompteur);

  const [count, setCount] = useState(1)


  const filterCompteur = compteurs.filter(cmp => cmp.compteurId == count)
  const compteur = filterCompteur[0]

  const [value, setValue] = useState('');

  const [disabledSuiv, setDisabledSuiv] = useState(false)
  const [disabledPre, setDisabledPre] = useState(false)

  const suivant = () => {
    setDisabledPre(false)
    let length = compteurs.length - 1;
    setCount(count + 1);
    console.log('lenCount',compteur.codeFluide);
    if (length == count) {
      setDisabledSuiv(!disabledSuiv);
      ToastSuccess('Fin de la lecture de cette tournée!');
    }
  }
  const precedent = () => {
    setDisabledSuiv(false)
    setCount(count - 1);
    if (count == 2) {
      setDisabledPre(!disabledPre)
      // console.log('debut',debut)
    }
  }

  const [newIndex, setNewIndex] = useState('');

  const setLoding = () => {
    let comptLent = compteurs.length
    //console.log('cilsfs', comptLent)
    setTimeout(() => {
      dispatch(notLoding());
    }, 500);

    if (comptLent !== 0) {
      dispatch(notLoding()); console.log('Loding a false!')
    }
  }

  useEffect(() => {
    setCompteurs(datas)
    
    let length = compteurs.length;
    let id = compteurs[0].compteurId;
  
      console.log('suiv',id)

      if (length == id) {
        setDisabledSuiv(true)
      } else { setDisabledSuiv(false) }

      if (count == id) {
        setDisabledPre(true)
      } else { setDisabledPre(false) }
      //console.log("Count ueffect")
    

    setLoding();

  }, [idCompteur])
   //console.log('compteurSlice',datas)


  //console.log('fluide',fluid)
  function table(arr, calback) {
    const temps = [];
    for (let index = 0; index < arr.length; index++) {
      temps.push(calback(arr[index].designation))
    }
    return temps
  }
  const ahnomalies = table(DesignationAnomalie, (val) => {
    return val
  })

  // const anomalies = [
  //   'Compteur Bloqué', 'Compteur tres haut', 'Compteur mal posé', "Compteur à l'interieur", 'Compteur à envers',
  //   'Compteur endomagé', 'Compteur disparu', 'Compteur fait du bruit'
  // ];

  const onSelect = (selectedItem) => {
    setValue(selectedItem)
  }

  return (
    <>
      {
        isLoding ?
          (
            <MyLoader />
          ) : compteurs.length == 0 ? 
          (
            <View>
              <Text style={{fontSize:25,textAlign:'center',color:'red'}}>Pas de data</Text>
              <MyLoader />
            </View>
          )
          :
          (
            <ScrollView style={{
              flex: 1,
              backgroundColor: (compteur.codeFluide === 'BT') ? '#FF69B4' : (compteur.codeFluide === 'MT') ? '#A0522D' : '#00BFFF',
            }}
              keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

              <KeyboardAvoidingView keyboardVerticalOffset={-60} behavior='position'>
                
                <MyText large bold marginTop='6px' >Releve d'un Compteur {compteur.codeFluide}</MyText>
                <Form>
                  <FormControle>
                    <FormInput>
                      <TouchableOpacity style={[styles.btnPreSuv, { backgroundColor: disabledPre ? '#CACFD2' : '#333333' }]}
                        onPress={() => precedent()}
                        disabled={disabledPre}
                      >
                        <MyButton width='105px' color='white' >Précedent</MyButton>
                        <Ionicons name="chevron-back-circle-outline" style={styles.chevron} />
                      </TouchableOpacity>

                    </FormInput>

                    <FormInput>
                      <TouchableOpacity style={[styles.btnPreSuv, { backgroundColor: disabledSuiv ? '#CACFD2' : '#333333' }]}
                        onPress={() => suivant()}
                        disabled={disabledSuiv}
                      >
                        <Ionicons name="chevron-forward-circle-outline" style={styles.chevron} />
                        <MyButton width='80px' color='white' >Suivant</MyButton>
                      </TouchableOpacity>
                    </FormInput>
                  </FormControle>

                  <FormControle>
                    <FormInput>
                      <Label>N° C</Label>
                      <InputFild value={compteur.numeroCompteur} keyboardType='numeric' width='58%' />
                    </FormInput>

                    <FormInput>
                      <MyText large>Etat: </MyText>
                      <InputFild keyboardType='numeric' value={compteur.codeEtat} width='10%' />
                    </FormInput>
                  </FormControle>

                  <FormControle>
                    <FormInput>
                      <Label >Id Geo</Label>
                      <InputFild value={compteur.idGeographique} keyboardType='numeric' width='58%' />
                    </FormInput>
                  </FormControle>

                  <FormControle>
                    <FormInput>
                      <Label>Index</Label>
                      <InputFild value={newIndex} keyboardType='numeric' width='58%' />
                    </FormInput>
                    <FormInput>
                      <TouchableOpacity style={{}}>
                        <MyButton bg='blue' height paddingTop='5px' width='70px' fontSize='22px' color='white' >OK</MyButton>
                      </TouchableOpacity>
                    </FormInput>
                  </FormControle>

                  <FormControle>
                    <FormInput width='80%'>
                      <Label >AN1</Label>
                      <SelectDropdown
                        data={ahnomalies}
                        onSelect={onSelect}
                        defaultButtonText={'Anomalie'}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                          return item;
                        }}
                        buttonStyle={styles.dropBtnStyle}
                        buttonTextStyle={styles.dropBtnTxtStyle}
                        renderDropdownIcon={isOpened => {
                          return <Ionicons name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                        }}
                        dropdownIconPosition={'rigth'}
                        dropdownStyle={styles.dropDropStyle}
                        rowStyle={styles.dropRowStyle}
                        rowTextStyle={styles.dropRowTxtStyle}
                      />
                    </FormInput>
                  </FormControle>

                  <FormControle>
                    <FormInput width='80%' >
                      <Label >AN2</Label>
                      <SelectDropdown
                        data={ahnomalies}
                        defaultButtonText={'Anomalie'}
                        onSelect={onSelect}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                          return item;
                        }}
                        buttonStyle={styles.dropBtnStyle}
                        buttonTextStyle={styles.dropBtnTxtStyle}
                        renderDropdownIcon={isOpened => {
                          return <Ionicons name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                        }}
                      />
                    </FormInput>
                  </FormControle>


                  {compteur.codeFluide == 'MT' ?
                    (<>
                      <FormControle>
                        <FormInput>
                          <Label minWidth='30px' >In1</Label>
                          <InputFild keyboardType='numeric' width='23%' />
                        </FormInput>
                        <FormInput>
                          <Label minWidth='30px' >In2</Label>
                          <InputFild keyboardType='numeric' width='23%' />
                        </FormInput>
                        <FormInput>
                          <Label minWidth='30px' >In3</Label>
                          <InputFild keyboardType='numeric' width='23%' />
                        </FormInput>
                      </FormControle>

                      <FormControle>
                        <FormInput>
                          <Label minWidth='30px' >In4</Label>
                          <InputFild keyboardType='numeric' width='23%' />
                        </FormInput>
                        <FormInput>
                          <Label minWidth='30px' >In5</Label>
                          <InputFild keyboardType='numeric' width='23%' />
                        </FormInput>
                        <FormInput>
                          <Label minWidth='30px' >In6</Label>
                          <InputFild keyboardType='numeric' width='23%' />
                        </FormInput>
                      </FormControle>

                      <FormControle>
                        <FormInput>
                          <Label minWidth='30px' >In7</Label>
                          <InputFild keyboardType='numeric' width='23%' />
                        </FormInput>
                      </FormControle>
                    </>)
                    :
                    (<></>)
                  }

                  <FormControle>
                    <FormInput>
                      <TouchableOpacity onPress={() => {
                        navigation.navigate('details', {
                          numero: compteur.numeroCompteur,
                          idGeo: compteur.idGeographique,
                          police: compteur.police,
                          abonne: compteur.nomAbonne,
                          adresse: compteur.adresse,
                          codeEtat: compteur.codeEtat,
                          lecture: compteur.etatLecture
                          
                        });
                      }}
                        style={styles.btnPreSuv}>
                        <MyButton width='75px' color='white' >Details</MyButton>
                        <Ionicons name="md-information-circle-outline" color="white" size={28} style={{ top: 2 }} />
                      </TouchableOpacity>

                    </FormInput>

                    <FormInput>
                      <TouchableOpacity onPress={() => setNewIndex('')}
                        style={[styles.btnPreSuv, { backgroundColor: 'tomato' }]}>
                        <MaterialCommunityIcons name="cancel" size={24} color="black" style={styles.chevron} />
                        <MyButton width='80px' color='white' >Annuler</MyButton>
                      </TouchableOpacity>
                    </FormInput>
                  </FormControle>

                </Form>
              </KeyboardAvoidingView>
            </ScrollView>
          ) 

      } 
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
      position:'relative',
      backgroundColor:'red'
  },
  slide1: {


  },
  container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'red',
  },
  dropBtnStyle: {
      height: 40,
      width: '72%',
      marginVertical: 1,
      backgroundColor: '#465881',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#444',
  },
  dropBtnTxtStyle: { color: 'rgba(255,255,255,0.7)', textAlign: 'left', marginLeft: -4 },
  dropDropStyle: { backgroundColor: '#EFEFEF', },
  dropRowStyle: { backgroundColor: '#EFEFEF', },
  dropRowTxtStyle: { color: '#000', textAlign: 'left' },

  btnPreSuv: {
      backgroundColor: '#333333',
      display: 'flex',
      flexDirection: 'row',
      borderRadius: 5,
      paddingHorizontal: 5,
  },

  chevron: { color: '#fff', fontSize: 25, top: 3 },
});