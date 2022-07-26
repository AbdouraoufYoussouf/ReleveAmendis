import React, { useEffect, useState, useCallback, useRef, Fragment } from 'react'
import { KeyboardAvoidingView, ScrollView, Text, View, TouchableOpacity, StyleSheet, useWindowDimensions, RefreshControl, LogBox, ActivityIndicator } from 'react-native';
import { Form, FormControle, MyText, InputFild, Label, FormInput, MyButton } from '../styles/homeStyle';
import Dialog from "react-native-dialog";
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import Swiper from 'react-native-swiper';
import { ToastSuccess } from '../../Components/Notifications';
import { BarIndicator, UIActivityIndicator, } from 'react-native-indicators';
import { minLoding, notLoding, notMinLoding, setCompteurs, setIdCompteur } from '../../../services/redux/compteurSlice';
import MyLoader from '../../Components/MyLoader';

import * as yup from 'yup';
import { Formik } from 'formik';
import { Icone, Icone1 } from '../../Connexion/styles';
import MySelect from '../../Components/MySelect';
import MyDialog from '../../Components/MyDialog';
import MyDialogAndConfirm from '../../Components/MyDialogAndConfirm';
import { updateNewIndex, verifieConsomation } from '../../../services/Compteur.Service';
import { AddDataToStore } from '../../../services/AddDataTotore';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function HomeReleveScreen({ navigation, route }) {

  const idCompteur = useSelector((state) => state.compteurs.idCompteur);
  const [index, setIndex] = useState(0);

  const { height, width } = useWindowDimensions();
  const dispatch = useDispatch()

  ///////////////////////// les données /////////////////////
  const datas = useSelector((state) => state.compteurs.ancienCompteurs);
  const compteurs = useSelector((state) => state.compteurs.compteurs);

  const anomaliesData = useSelector((state) => state.anomalies.designationAnomalie);
  const [anomalies, setAnomalies] = useState([])
  const [designationData, setDesignationData] = useState([])
 // console.log('anomalie', compteurs)

  const isLoding = useSelector((state) => state.compteurs.isLoding);

  ///////////////////////// les inputes /////////////////////
  const [numCompt, setNumCompt] = useState(null);
  const [nouveauIndex, setNouveauIndex] = useState('');
  const [ancienIndex, setAncienIndex] = useState(null);
  const [anomalie1, setAnomalie1] = useState(null);
  const [anomalie2, setAnomalie2] = useState(null);
  const [index1, setindex1] = useState();
  const [index2, setindex2] = useState();
  const [index3, setindex3] = useState();
  const [index4, setindex4] = useState();
  const [index5, setindex5] = useState();
  const [index6, setindex6] = useState();
  const [index7, setindex7] = useState();

  const [lu, setLu] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  //     *************  search  **************
  const [termSearch, setTermSearch] = useState('');


  const [label1, setLabel1] = useState('');
  const [label2, setLabel2] = useState('');
  /// Dialog ***********
  const [modalVisible, setModalVisible] = useState(false);
  const [errore, setErrore] = useState(null);
  /// Dialog ***********

  /// DialogAndConfirm ***********
  const [dialogVisible, setDialogVisible] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [WarningMessg, setWarningMessg] = useState('');
  /// DialogAndConfirm ***********
  const search = (searchItem) => {
    return compteurs.find(c => c.numeroCompteur === searchItem) || compteurs.find(c => c.idGeographique === searchItem) || compteurs.find(c => c.nomAbonne === searchItem) || compteurs.find(c => c.police === searchItem);
  }
  const searchGeneral = (searchItem) => {
    return datas.find(c => c.numeroCompteur === searchItem) || datas.find(c => c.idGeographique === searchItem) || compteurs.find(c => c.nomAbonne === searchItem) || compteurs.find(c => c.police === searchItem);
  }

  const handleSearch = () => {
    let temp = search(termSearch)
    // console.log('serach', termSearch)

    if (temp != null && termSearch != '') {
      dispatch(setIdCompteur(temp.compteurId - 1))
      setLu(1)
      console.log('temp', temp)
    }

    if (temp == null && termSearch != '') {
      setModalVisible(true)
      let temp1 = searchGeneral(termSearch)

      if (temp1 != null) {
        setErrore("Le compteur recherché est déjà lu")
      }else{
        setErrore("Le terme recherché n'existe pas !!")
      }
    }

    if (temp == null && termSearch == '') {
      setModalVisible(true)
      setErrore("Veillez saisir un terme à rechercher svp !!")
      // wait(5000).then(() => setErrore(""));
    }
  }

  // const setLoding = () => {
  //   if (anomaliesData.length != 0) {
  //     wait(200).then(() => dispatch(notLoding()));
  //   }
  // };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  //**************** Code pour chercher que les designations des anomalies **********
  const designations = anomaliesData.map((a, index) => {
    return { label: a.designation, value: a.codeAnomalie }
  });


  const handleAnnuler = () => {
    setAnomalie1('');
    setAnomalie2('');
    setLabel1('');
    setLabel2('');
    setNouveauIndex('');
  }
  const handleSubmit = (ancienIndex, newIndex, consMoyenne, numeroCompteur) => {

    if (nouveauIndex === '' || nouveauIndex === 0) {
      setErrore("Veillez saisir l'index s'il vous plait!!")
      setModalVisible(true)
    } else {
      setNumCompt(numeroCompteur)
      setAncienIndex(ancienIndex)
      console.log(newIndex, ancienIndex, consMoyenne)
      verifieConsomation(ancienIndex, newIndex, consMoyenne, setDialogVisible, setWarningMessg);
    }
    console.log("index:", nouveauIndex)
    console.log("anomalie1:", anomalie1)
    console.log("anomalie2:", anomalie2)
  }

  const handlSave = (numCompt, newIndex, ancienIndex, anomalie1, anomalie2) => {
    setIndicator(true);
    updateNewIndex(numCompt, newIndex, ancienIndex, anomalie1, anomalie2)
    //AddDataToStore(dispatch);
    let ancienCompteurs = compteurs.filter((comt) => comt.numeroCompteur !== numCompt)
    let newCompteurs = ancienCompteurs.map((item, index) => {
      return {
        compteurId: index + 1, idCompteur: item.compteurId, numeroCompteur: item.numeroCompteur, ancienIndex: item.ancienIndex,
        anomalie1: item.anomalie1, codeEtat: item.codeEtat, codeFluide: item.codeFluide,
        codeSecteur: item.codeSecteur, consMoyenne: item.consMoyenne, dateReleve: item.dateReleve,
        heureReleve: item.heureReleve, etatLecture: item.etatLecture, idGeographique: item.idGeographique,
        nomAbonne: item.nomAbonne, nouveauIndex: item.nouveauIndex, nouveauIndex1: item.nouveauIndex1,
        nouveauIndex2: item.nouveauIndex2, nouveauIndex3: item.nouveauIndex3, nouveauIndex4: item.nouveauIndex4,
        nouveauIndex5: item.nouveauIndex5, nouveauIndex6: item.nouveauIndex6, nouveauIndex7: item.nouveauIndex7,
        numeroRue: item.numeroRue, police: item.police, adresse: item.adresse, consommation: item.consommation
      }
    })
    
    handleAnnuler();
    setLu(1)
    dispatch(setCompteurs(newCompteurs))
    setTimeout(() => {
      setDialogVisible(false);
      setIndicator(false);
    }, 200)
  }

  useEffect(() => {
    setIndex(idCompteur);
    setDesignationData(anomaliesData)
    setAnomalies(designations)
    //setLoding();

  }, [idCompteur, termSearch, indicator, lu, compteurs])

  const renderPagination = (index, total, context) => {
    return (
      <View style={styles.paginationStyle}>
        <Text style={{ color: 'black', fontSize: 20 }}>
          <Text style={styles.paginationText}>{index + 1}</Text >/{total}
        </Text>
      </View>
    )
  }

  return (
    <>
      {
        isLoding ?
          (
            <MyLoader />
          ) :
          (
            <>
              <Swiper style={styles.wrapper}
                index={idCompteur}
                onIndexChanged={(index) => console.log('index changed', index)}
                showsPagination={true}
                renderPagination={renderPagination}
                showsButtons loop={false}
                buttonWrapperStyle={{
                  backgroundColor: 'transparent',
                  display: 'flex',
                  flexDirection: 'row',
                  bottom: 10,
                  alignItems: 'center'
                }}
                prevButton={
                  <View style={{ position: 'absolute', bottom: height / 2 - 143, left: -4 }}>
                    <MaterialCommunityIcons name="chevron-left-circle" color={'#333333'} size={35} />
                  </View>
                }
                nextButton={
                  <View style={{ position: 'absolute', bottom: height / 2 - 143, right: -4 }}>
                    <MaterialCommunityIcons name="chevron-right-circle" color={'#333333'} size={35} />
                  </View>
                }>
                {
                  compteurs.map((item, index) => {
                    return (
                      <ScrollView
                        // refreshControl={
                        //   <RefreshControl
                        //     refreshing={refreshing}
                        //     onRefresh={onRefresh}
                        //   />
                        // }
                        keyboardShouldPersistTaps='never'
                        keyboardDismissMode='on-drag'
                        key={index}
                        style={{
                          flex: 1,
                          backgroundColor: (item.codeFluide === 'BT') ? '#FF69B4' : (item.codeFluide === 'MT') ? '#A0522D' : '#00BFFF',
                        }}
                        showsVerticalScrollIndicator={false}>

                        <KeyboardAvoidingView key={index} keyboardVerticalOffset={-270}
                          behavior='position'>

                          <MyDialog modalVisible={modalVisible}
                            content={errore}
                            setModalVisible={setModalVisible}
                            type='warning'
                          />
                          <MyDialogAndConfirm
                            dialogVisible={dialogVisible}
                            setDialogVisible={setDialogVisible}
                            indicator={indicator}
                            content={WarningMessg}
                            onPressSave={() => handlSave(numCompt, nouveauIndex, ancienIndex, anomalie1, anomalie2)}
                            type='warning'
                          />


                          <Form>
                            <FormControle width='99%' marginV='1px' >
                              <FormInput>
                                {
                                  termSearch != '' ? (
                                    <Icone1 width='50px' onPress={() => setTermSearch('')} >
                                      <Ionicons name='md-close-circle-outline' size={30} color={'rgba(255,255,255,0.7)'} />
                                    </Icone1>
                                  ) : (
                                    <Icone1 width='50px' >
                                      <MaterialCommunityIcons name="gesture-two-double-tap" size={30} style={{ transform: [{ rotate: '90deg' }] }} color="rgba(255,255,255,0.7)" />
                                    </Icone1>
                                  )
                                }

                                <InputFild width='100%' paddingH='37px'
                                  //returnKeyType='search'
                                  value={termSearch}
                                  onChangeText={(term) => setTermSearch(term)}
                                  placeholder='Soit numero|idGeo|police|abonne'
                                  placeholderTextColor='gray'
                                />
                                <Icone width='50px' onPress={() => handleSearch()} >
                                  <Ionicons name='search' size={30} color={'rgba(255,255,255,0.7)'} />
                                </Icone>
                              </FormInput>
                            </FormControle>

                          </Form>

                          {/* {
                            errore != null ? (
                              <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 5, color: 'yellow', }}>
                                {errore}
                              </Text>
                            ) : (<></>)
                          } */}

                          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 }}>
                            Releve d'un compteur {item.codeFluide}</Text>
                          <Form>
                            <FormControle>
                              <FormInput>
                                <Label>N° C</Label>
                                <InputFild value={item.numeroCompteur} keyboardType='numeric' width='57%' />




                              </FormInput>
                              <FormInput>
                                <MyText large>Etat: </MyText>
                                <InputFild keyboardType='numeric' value={item.codeEtat} width='10%' />
                              </FormInput>
                            </FormControle>
                            <FormControle>
                              <FormInput>
                                <Label >Id Geo</Label>
                                <InputFild value={item.idGeographique} keyboardType='numeric' width='57%' />
                              </FormInput>
                            </FormControle>

                            <FormControle>
                              <FormInput>
                                <Label>Index</Label>
                                <InputFild
                                  placeholder='Index'
                                  placeholderTextColor='gray'
                                  defaultValue={item.nouveauIndex}
                                  value={nouveauIndex}
                                  onChangeText={(index) => setNouveauIndex(index)}
                                  keyboardType='numeric' width='57%' />
                              </FormInput>
                              <FormInput>
                                <TouchableOpacity style={{}}
                                  onPress={() => handleSubmit(item.ancienIndex, nouveauIndex, item.consMoyenne, item.numeroCompteur)}>
                                  <MyButton bg='blue' height paddingTop='5px' width='70px' fontSize='22px' color='white' >OK</MyButton>
                                </TouchableOpacity>
                              </FormInput>
                            </FormControle>

                            <FormControle>
                              <FormInput width='80%'>
                                <Label >AN1</Label>
                                <MySelect
                                  placeholder='Select Anomalie 1'
                                  data={designations}
                                  label={label1}
                                  setLabel={setLabel1}
                                  setValue={setAnomalie1} />
                              </FormInput>
                            </FormControle>

                            <FormControle>
                              <FormInput width='80%' >
                                <Label >AN2</Label>
                                <MySelect
                                  placeholder='Select Anomalie 2'
                                  data={designations}
                                  label={label2}
                                  setLabel={setLabel2}
                                  setValue={setAnomalie2} />
                              </FormInput>
                            </FormControle>

                            {item.codeFluide == 'MT' ?
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

                            <FormControle marginV='25px'>
                              <FormInput>
                                <TouchableOpacity onPress={() => {
                                  navigation.navigate('details', {
                                    numero: item.numeroCompteur,
                                    idGeo: item.idGeographique,
                                    police: item.police,
                                    abonne: item.nomAbonne,
                                    adresse: item.adresse,
                                    codeEtat: item.codeEtat,
                                    lecture: item.etatLecture,
                                    ancienIndex: item.ancienIndex,
                                    newIndex: item.nouveauIndex,
                                    consMoyenne: item.consMoyenne,
                                    consommation: item.consommation
                                  });
                                }}
                                  style={styles.btnPreSuv}>
                                  <MyButton width='75px' color='white' >Details</MyButton>
                                  <Ionicons name="md-information-circle-outline" color="white" size={28} style={{ top: 2 }} />
                                </TouchableOpacity>
                              </FormInput>

                              <FormInput>
                                <TouchableOpacity
                                  onPress={() => handleAnnuler()}
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
                  })
                }

              </Swiper>
            </>
          )
      }
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',

  },
  dropBtnStyle: {
    height: 40,
    width: '75%',
    marginVertical: 1,
    backgroundColor: '#466081',
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

  dialog: {
    height: 120,
    borderRadius: 7,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  paginationText: {
    color: 'white',
    fontSize: 20
  }
});