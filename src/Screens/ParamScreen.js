import React, { useState, useRef, useEffect } from "react";
import { AntDesign, MaterialCommunityIcons, Ionicons, Entypo } from "@expo/vector-icons";

import { StyleSheet, Text, View, Pressable, TouchableOpacity, Modal, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Form, FormControle, FormInput, InputFild, Label, MyButton, MyText } from "./styles/homeStyle";

export default function ParamScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleTerminal, setModalVisibleTerminal] = useState(false);

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
  return (
    <>
      <TouchableOpacity style={styles.popovercom} onPress={toggleModal}>
        <Ionicons name="settings" color='#36382F' size={25} />
        <Text style={{ fontSize: 15, marginHorizontal: 3, color: '#36382F' }}>Parametre</Text>
      </TouchableOpacity>

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

              <TouchableOpacity style={styles.contText}
                onPress={() => { setModalVisible(false) ,setModalVisibleTerminal(true) }}>
                <AntDesign style={{ marginTop: 3 }} name="check" size={22} color="white" />
                <Text style={styles.modalText}>Numeroter TPL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contText}
                onPress={() => { goto('fluide') }}>
                <AntDesign style={{ marginTop: 3 }} name="check" size={22} color="white" />
                <Text style={styles.modalText}>Parametrer Fluide</Text>
              </TouchableOpacity>

              <View style={{
                height: 52,
                width: 79,
                backgroundColor: 'gray',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: -50,
                right: 0,
              }} >

                <Ionicons name="settings" color='white' size={25} style={{ marginTop: 5, }} />
                <Text style={{ fontSize: 15, color: 'white', marginBottom: 5, }}>Parametre</Text>

              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisibleTerminal}
        onRequestClose={() => setModalVisibleTerminal(!modalVisibleTerminal)}
      >

        <Pressable onPress={() => setModalVisibleTerminal(false)} style={styles.madalContainerTer}>
          <Pressable onPress={() => setModalVisibleTerminal(true)} style={styles.modalContentTer}>
            <View style={{ width: '100%', height: 35, borderBottomWidth: 2, alignItems: 'center', }}>
              <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 2 ,color:'white'}}>Configurer le terminal</Text>
              <Entypo onPress={() => setModalVisibleTerminal(false)} style={{ right: 10, position: 'absolute', top: -3 }} name="cross" size={40} color="white" />
            </View>
            <View>
              <Form marginTop='20px'>
                <FormControle>
                  <FormInput >
                    <MyText color='white' large width='39%'>Numéro du TPL</MyText>
                    <InputFild width='58%' />
                  </FormInput>
                </FormControle>

                <FormControle marginV='30px'>
                  <FormInput>
                    <TouchableOpacity style={[styles.btnPreSuv, { backgroundColor: 'tomato' }]}>
                      <MyButton width='85px' color='white' >Annuler</MyButton>
                      <Ionicons name="md-information-circle-outline" color="white" size={28} style={{ top: 2 }} />
                    </TouchableOpacity>
                  </FormInput>

                  <FormInput>
                    <TouchableOpacity onPress={() => { navigation.navigate('anomalieFac'), setModalVisibleTerminal(!modalVisibleTerminal) }}
                      style={[styles.btnPreSuv, { backgroundColor: '#465881' }]}>
                      <MyButton width='90px' color='white' >Envoyé</MyButton>
                      <Ionicons name="send-outline" color="white" size={25} style={{ top: 3 }} />
                    </TouchableOpacity>
                  </FormInput>
                </FormControle>
              </Form>
            </View>
          </Pressable>
        </Pressable>

      </Modal>
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
  modalContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  modalContent: {
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
    width: 165,
    height: 'auto',
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 50,
    right: 0
  },
  body: {
    backgroundColor: 'white',
    width: '100%',
  },
  modalText: {
    fontSize: 17,
    color: 'white',
  },
  /////////////////
  btnPreSuv: {
    backgroundColor: '#333333',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  madalContainerTer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContentTer: {
    width: '100%',
    height: 175,
    position: 'absolute',
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: 'gray',
    //justifyContent: 'center',
    //alignItems: 'center',
  },
})