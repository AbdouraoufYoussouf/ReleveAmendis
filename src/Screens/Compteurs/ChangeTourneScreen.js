import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { Form, FormControle, MyText, InputFild, Label, FormInput, MyButton } from '../styles/homeStyle';
import SelectDropdown from 'react-native-select-dropdown';
import { StyleSheet, KeyboardAvoidingView, Text, View, Pressable, TouchableOpacity, Modal, Dimensions } from "react-native";

export default function ChangeTourneScreen() {
  const [value, setValue] = useState('');
  const [modalVisibletourne, setModalVisibletourne] = useState(false);
  const tournes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 21, 45];

  const onSelect = (selectedItem) => {
    setValue(selectedItem)
  }
  // function toggleModal() {
  //   if (!modalVisibletourne) {
  //     setModalVisibletourne(true);
  //   } else {
  //     setModalVisibletourne(false);
  //   }
  // };

  return (
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
              <MyText large>Changement de tourné</MyText>
              <FormControle>
                <FormInput width='50%'>
                  <MyText large marginH='5px'>N° Tourné</MyText>
                  <SelectDropdown
                    data={tournes}
                    onSelect={onSelect}
                    defaultButtonText={'Choisis Tourné'}
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
                <FormInput>
                  <TouchableOpacity style={[styles.btnPreSuv,{backgroundColor:'#465881' }]}>
                    <MyButton width='100px' color='white' >Chargé</MyButton>
                    <Ionicons name="cloud-upload" color="white" size={28} style={{ top: 2 }} />
                  </TouchableOpacity>
                </FormInput>
                <FormInput>
                  <TouchableOpacity  style={[styles.btnPreSuv,{backgroundColor:'orange' }]}>
                    <MaterialCommunityIcons name="cancel" size={24} color="black" style={styles.chevron} />
                    <MyButton width='100px' color='white' >Annuler</MyButton>
                  </TouchableOpacity>
                </FormInput>
                <FormInput>
                  <TouchableOpacity onPress={()=>setModalVisibletourne(false)} style={[styles.btnPreSuv,{backgroundColor:'tomato' }]}>
                    <MyButton width='100px' color='white' >Fermer</MyButton>
                    <Ionicons name="md-information-circle-outline" color="white" size={28} style={{ top: 2 }} />
                  </TouchableOpacity>
                </FormInput>

                
              </FormControle>
            </Form>

          </Pressable>

        </Pressable>
      </Modal>
      
    </View>
  )
}
const styles = StyleSheet.create({
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
    backgroundColor: '#A0522D',
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
    
  },

  chevron: { color: '#fff', fontSize: 25, top: 3 },
  bg: { color: '#fff',backgroundColor:'#465881' },
})