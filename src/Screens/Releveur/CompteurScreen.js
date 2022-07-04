import { AntDesign, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, TouchableOpacity, Modal, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import ChangeTourneScreen from "../Compteurs/ChangeTourneScreen";
import { Form, FormControle, MyText, InputFild, Label, FormInput, MyButton } from '../styles/homeStyle';
import SelectDropdown from 'react-native-select-dropdown';


export default function CompteurScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibletourne, setModalVisibletourne] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [value, setValue] = useState();

  function toggleModal() {
    if (!modalVisible) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  };

  const goto = (route) => {
    navigation.navigate(route);
    setModalVisible(false);
  }
  const [tournes, setTournes] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 21, 45]);

  const onSelect = (selectedItem) => {
    setValue(selectedItem)
  }
  const optionsCompteurs = [
    { 'title': 'Ajouter compteur', 'route': 'addCompteur' },
    { 'title': 'Changer tourner', 'route': 'changetourne' },
    { 'title': 'Compteur non lus', 'route': 'nonluCompteur' },
    { 'title': 'Rechercher compteur', 'route': 'searchCompteur' },
    { 'title': 'Lecture par secteur', 'route': 'lectureSecteur' },
    { 'title': 'Lecture par rue', 'route': 'lectureRue' }];

  return (
    <>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          onPress={() => { setModalVisible(false); }}
          style={styles.modalContainer}>

          <Pressable onPress={() => setModalVisible(true)}
            style={styles.modalContent}>

            <View style={styles.body}>

              {
                optionsCompteurs.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} style={styles.contText}
                      onPress={() => {
                        item.route === 'changetourne' ? setModalVisibletourne(true) : goto(item.route)
                      }}>
                      <AntDesign style={{ marginTop: 3 }} name="check" size={22} color="white" />
                      <Text style={styles.modalText}>{item.title}</Text>

                    </TouchableOpacity>)
                })
              }
              {/* <View style={{
                height: 52,
                width: 75,
                backgroundColor:'gray',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: -50,
                left: 0,
              }} >

                <Ionicons name="speedometer" color='#36382F' size={25} style={{ marginTop: 5, }} />
                <Text style={{ fontSize: 15, color: '#36382F', marginBottom: 5, }}>Compteur</Text>

              </View> */}
            </View>


          </Pressable>
        </Pressable>
      </Modal>

      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibletourne}
          onRequestClose={() => {
            setModalVisibletourne(!modalVisibletourne);
          }}
        >
          <Pressable
            onPress={() => setModalVisibletourne(false)}
            style={styles.modalContainerTourne}>

            <Pressable onPress={() => setModalVisibletourne(true)}
              style={styles.modalContentTourne}>

              <Form >
                <MyText marginTop='13px' large>Changement de tourné</MyText>
                <FormControle>
                  <FormInput width='50%'>
                    <MyText large marginH='5px'>N° Tourné</MyText>
                    <SelectDropdown
                      data={tournes}
                      onSelect={onSelect}
                      defaultButtonText={'Choisis Tourné'}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return value;
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
                  <FormInput>
                    <TouchableOpacity onPress={() => setModalVisibletourne(false)} style={[styles.btnPreSuv, { backgroundColor: 'tomato' }]}>
                      <MyButton width='75px' color='white' >Fermer</MyButton>
                      <Ionicons name="md-information-circle-outline" color="white" size={28} style={{ top: 2 }} />
                    </TouchableOpacity>
                  </FormInput>
                  <FormInput>
                    <TouchableOpacity onPress={() => setValue()}
                      style={[styles.btnPreSuv, { backgroundColor: 'orange' }]}>
                      <MaterialCommunityIcons name="cancel" size={24} color="black" style={styles.chevron} />
                      <MyButton width='80px' color='white' >Annuler</MyButton>
                    </TouchableOpacity>
                  </FormInput>

                  <FormInput>
                    <TouchableOpacity onPress={() => { goto('tabBar'); setModalVisibletourne(false) }}
                      style={[styles.btnPreSuv, { backgroundColor: '#465881' }]}>
                      <MyButton width='75px' color='white' >Chargé</MyButton>
                      <Ionicons name="cloud-upload" color="white" size={28} style={{ top: 2 }} />
                    </TouchableOpacity>
                  </FormInput>

                </FormControle>
              </Form>

            </Pressable>

          </Pressable>
        </Modal>

      </View>

      <TouchableOpacity style={styles.popovercom} onPress={toggleModal}>
        <Ionicons name="speedometer" color='#36382F' size={25} />
        <Text style={{ fontSize: 15, marginHorizontal: 3, color: '#36382F' }}>Compteur</Text>
      </TouchableOpacity>


    </>
  )

}

const styles = StyleSheet.create({

  popovercom: {
    backgroundColor: 'white',
    display: 'flex', flexDirection: 'column',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 1
  },

  contText: {
    backgroundColor: 'gray',
    marginVertical: 2,
    display: "flex",
    flexDirection: 'row',
    height: 30
  },
  modalText: {
    fontSize: 18,
    color: 'white',
  },


  /////////////// Modal ////////

  modalContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
    width: 200,
    height: 'auto',
    backgroundColor: 'white',
    bottom: 50,
    left: 11
  },
  body: {
    backgroundColor: 'white',
    width: '100%',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    bottom: 0,
  },
  arrowDown: {
    borderTopWidth: 20,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderTopColor: "gray",
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  ////modal tourne

  modalContainerTourne: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContentTourne: {
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
    width: '100%',
    minHeight: '50%',
    paddingTop: 8,
    backgroundColor: 'gray',
    //justifyContent: 'center',
    //alignItems: 'center',
  },

  ///////////////
  dropBtnStyle: {
    maxWidth: 200,
    height: 35,
    marginVertical: 3,
    backgroundColor: '#465881',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropBtnTxtStyle: { color: 'rgba(255,255,255,0.7)', textAlign: 'left' },
  dropDropStyle: { backgroundColor: '#EFEFEF', },
  dropRowStyle: { backgroundColor: '#EFEFEF', },
  dropRowTxtStyle: { color: '#000', textAlign: 'left' },

  ///
  btnPreSuv: {
    backgroundColor: '#333333',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    paddingHorizontal: 5,
    //marginLeft:3
  },

  chevron: { color: '#fff', fontSize: 25, top: 3 },
  bg: { color: '#fff', backgroundColor: '#465881' },
});
