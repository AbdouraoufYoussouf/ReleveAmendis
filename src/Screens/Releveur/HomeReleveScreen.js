import React, { useEffect, useState, useCallback, useRef, Fragment } from 'react'
import { KeyboardAvoidingView, ScrollView, Text, View, TouchableOpacity, StyleSheet, useWindowDimensions, RefreshControl, LogBox } from 'react-native';
import { Form, FormControle, MyText, InputFild, Label, FormInput, MyButton } from '../styles/homeStyle';
import Dialog from "react-native-dialog";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import Swiper from 'react-native-swiper';
import { ToastSuccess } from '../../Components/Notifications';
import { BarIndicator, UIActivityIndicator, } from 'react-native-indicators';
import { notLoding } from '../../../services/redux/compteurSlice';
import MyLoader from '../../Components/MyLoader';
import { Select, NativeBaseProvider, extendTheme, CheckIcon } from "native-base";

import * as yup from 'yup';
import { Formik } from 'formik';
import { Icone } from '../../Connexion/styles';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function HomeReleveScreen({ navigation, route }) {
  const theme = extendTheme({
    components: {
      Select: {
        baseStyle: {
          borderColor: '#444',
          width: '70%',
          height: '40px',
          backgroundColor: '#465881',
          borderRadius: 5,
        },
        defaultProps: {
          size: "md",
        },
        sizes: {
          md: {
            fontSize: "20px"
          }
        }
      }
    }
  });

  const idCompteur = useSelector((state) => state.compteurs.idCompteur);
  const [index, setIndex] = useState(0);
  console.log('idcompteur', idCompteur)

  const { height, width } = useWindowDimensions();
  const dispatch = useDispatch()

  ///////////////////////// les données /////////////////////
  const datas = useSelector((state) => state.compteurs.compteurs);
  const [compteurs, setCompteurs] = useState([])
  const [compteur, setCompteur] = useState([]);

  const anomaliesData = useSelector((state) => state.anomalies.designationAnomalie);
  const [anomalies, setAnomalies] = useState([])
  const [designationData, setDesignationData] = useState([])

  const isLoding = useSelector((state) => state.compteurs.isLoding);
  //console.log('data', compteurs)
  ///////////////////////// les inputes /////////////////////
  const [numCompt, setNumCompt] = useState();
  const [idGeo, setIdGeo] = useState();
  const [newIndex, setNewIndex] = useState('');
  const [anomalie1, setAnomalie1] = useState('');
  const [anomalie2, setAnomalie2] = useState('');
  const [index1, setindex1] = useState();
  const [index2, setindex2] = useState();
  const [index3, setindex3] = useState();
  const [index4, setindex4] = useState();
  const [index5, setindex5] = useState();
  const [index6, setindex6] = useState();
  const [index7, setindex7] = useState();

  const [refreshing, setRefreshing] = useState(false);

  //     *************  search  **************
  const [termSearch, setTermSearch] = useState('');
  const [error, setError] = useState('');
  const [nonTrouve, setNonTrouve] = useState(true);

  const search = (searchItem) => {
    return compteurs.find(c => c.numeroCompteur === searchItem) || compteurs.find(c => c.idGeographique === searchItem) || compteurs.find(c => c.nomAbonne === searchItem) || compteurs.find(c => c.police === searchItem);
  }
  /// Dialog ***********
  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  /// Dialog ***********

  const handleSearch = () => {
    let temp = search(termSearch)
    console.log('serach', termSearch)
    console.log('Data', temp)

    if (temp != null) {
      setIndex(temp.compteurId - 1)
      setCompteur(temp)
    }
    if (compteur.length==null) {
      showDialog()
    }
  }

  const setLoding = () => {
    if (anomaliesData.length != 0) {
      wait(400).then(() => dispatch(notLoding()));
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  //**************** Code pour chercher que les designations des anomalies **********
  const designations = designationData.map((a) => {
    return { label: a.designation, value: a.designation }
  });
  // console.log('designations', designations)
  // console.log('anomalies', anomalies)

  const handleAnnuler = () => {
    setAnomalie1('');
    setAnomalie2('');
    setNewIndex('');
  }

  const handleSubmit = () => {
    console.log("anomalie1:", anomalie1)
    console.log("anomalie2:", anomalie2)
    console.log("index:", newIndex)
  }

  useEffect(() => {
    setIndex(idCompteur);
    setCompteurs(datas);
    setDesignationData(anomaliesData)
    setAnomalies(designations)
    setLoding();
    //handleSearch()
  }, [idCompteur, termSearch])

  return (
    <NativeBaseProvider theme={theme}>
      {
        isLoding ?
          (
            <MyLoader />
          ) :
          (
            <>

              <Swiper style={styles.wrapper}
                index={index}
                onIndexChanged={(index) => console.log('index changed', index)}
                showsPagination={false}
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
                        key={index}
                        style={{
                          flex: 1,
                          backgroundColor: (item.codeFluide === 'BT') ? '#FF69B4' : (item.codeFluide === 'MT') ? '#A0522D' : '#00BFFF',
                        }}
                        keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

                        <KeyboardAvoidingView key={index} keyboardVerticalOffset={ -270} 
                        behavior='position'>
                          <Form>
                            <FormControle zindex width='99%' marginV='1px' >
                              <FormInput>
                                <InputFild 
                                  value={termSearch}
                                  onChangeText={(term) => setTermSearch(term)}
                                  width='100%' placeholder='Soit numero|idGeo|police|abonne'
                                  placeholderTextColor='gray'
                                />
                                <Icone onPress={() => handleSearch()} >
                                  <Ionicons name='search' size={30} color={'rgba(255,255,255,0.7)'} />
                                </Icone>
                              </FormInput>
                            </FormControle>
                           
                          </Form>
                          <Dialog.Container visible={visible}
                            contentStyle={styles.dialog} >
                            <Dialog.Description style={{ color: 'white' }}>
                              Le terme entré est introuvable!!                             
                              </Dialog.Description>
                            <Dialog.Button label="Férmer" style={{ backgroundColor: 'blue', marginBottom: 5, borderRadius: 7 }} color={'white'} onPress={handleCancel} />
                          </Dialog.Container>
                          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 }}>
                            Releve d'un compteur {item.codeFluide}</Text>
                          <Form>
                            <FormControle>
                              <FormInput>
                                <Label>N° C</Label>
                                <InputFild value={item.numeroCompteur} keyboardType='numeric' width='60%' />
                              </FormInput>

                              <FormInput>
                                <MyText large>Etat: </MyText>
                                <InputFild keyboardType='numeric' value={item.codeEtat} width='10%' />
                              </FormInput>
                            </FormControle>
                            <FormControle>
                              <FormInput>
                                <Label >Id Geo</Label>
                                <InputFild value={item.idGeographique} keyboardType='numeric' width='60%' />
                              </FormInput>
                            </FormControle>

                            <FormControle>
                              <FormInput>
                                <Label>Index</Label>
                                <InputFild
                                  value={newIndex}
                                  onChangeText={(index) => setNewIndex(index)}
                                  keyboardType='numeric' width='60%' />
                              </FormInput>
                              <FormInput>
                                <TouchableOpacity style={{}}
                                  onPress={handleSubmit}>
                                  <MyButton bg='blue' height paddingTop='5px' width='70px' fontSize='22px' color='white' >OK</MyButton>
                                </TouchableOpacity>
                              </FormInput>
                            </FormControle>

                            <FormControle>
                              <FormInput width='80%'>
                                <Label >AN1</Label>
                                <Select
                                  selectedValue={anomalie1}
                                  minWidth="300"
                                  accessibilityLabel="Select Anomalie 1"
                                  placeholder="Select Anomalie 1"
                                  style={{ flex: 1, backgroundColor: '#466081', color: 'rgba(255,255,255,0.7)' }}
                                  _selectedItem={{
                                    bg: "teal.700", color: 'white',
                                    endIcon: <CheckIcon size="15" />
                                  }} mt={1} onValueChange={itemValue => setAnomalie1(itemValue)}>
                                  {
                                    designations.map((item, index) => {
                                      return (
                                        <Select.Item key={index} label={item.label} value={item.value} />
                                      )
                                    })
                                  }
                                </Select>
                              </FormInput>
                            </FormControle>

                            <FormControle>
                              <FormInput width='80%' >
                                <Label >AN2</Label>

                                <Select
                                  selectedValue={anomalie2}
                                  minWidth="300"
                                  accessibilityLabel="Select Anomalie 2"
                                  placeholder="Select Anomalie 2"
                                  style={{ flex: 1, backgroundColor: '#466081', color: 'rgba(255,255,255,0.7)' }}
                                  _selectedItem={{ bg: "primary.400", }}
                                  onValueChange={itemValue => setAnomalie2(itemValue)}>
                                  {
                                    designations.map((item, index) => {
                                      return (
                                        <Select.Item key={index} label={item.label} value={item.value} />
                                      )
                                    })
                                  }
                                </Select>
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
                                    lecture: item.etatLecture
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
    </NativeBaseProvider>
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
});