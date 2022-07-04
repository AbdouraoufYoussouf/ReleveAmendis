import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Form, FormControle, InputFild, Label, FormInput, MyButton } from '../styles/homeStyle';
import SelectDropdown from 'react-native-select-dropdown';

import { Text, Modal, Pressable, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity, View } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export const AddAnomalie = () => {
    const navigation = useNavigation();
    const [modalvisible, setModalVisible] = useState(false);
    const [value, setValue] = useState('');

    const fluides = ['EA', 'BT', 'MT', "EB", 'EM', 'BM', 'TT'];
    const onSelect = (selectedItem) => {
        setValue(selectedItem)
    }
    return (
        <View >
            <TouchableOpacity onPress={() => setModalVisible(true)} >
                <AntDesign name="pluscircleo" color='white' size={27} style={{ marginRight: 6 }} />
            </TouchableOpacity>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalvisible}
                onRequestClose={() => setModalVisible(!modalvisible)}
            >

                <Pressable onPress={() => setModalVisible(false)} style={styles.madalContainer}>
                    <Pressable onPress={() => setModalVisible(true)} style={styles.modalContent}>
                        <View style={{ width: '100%', height: 35, borderBottomWidth: 2,borderBottomColor:'#fff', alignItems: 'center', }}>
                            <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 2,color:'#fff' }}>Ajout d'un Anomalie</Text>
                            <Entypo onPress={() => setModalVisible(false)} style={{ right: 10, position: 'absolute', top: -3 }} name="cross" size={40} color="white" />
                        </View>
                        <View>
                            <Form marginTop='20px'>
                                <FormControle>
                                    <FormInput >
                                        <Label color='#fff' minWidth='39%'>Code Anomalie</Label>
                                        <InputFild width='58%' />
                                    </FormInput>
                                </FormControle>
                                <FormControle>
                                    <FormInput >
                                        <Label color='#fff' minWidth='39%'>Designation</Label>
                                        <InputFild width='58%' />
                                    </FormInput>
                                </FormControle>

                                <FormControle>
                                    <FormInput >
                                        <Label color='#fff' minWidth='39%'>Code Fluide</Label>
                                        <SelectDropdown
                                            data={fluides}
                                            onSelect={onSelect}
                                            defaultButtonText={'Fluides'}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem;
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                return item;
                                            }}
                                            buttonStyle={styles.dropBtnStyle}
                                            buttonTextStyle={styles.dropBtnTxtStyle}
                                            renderDropdownIcon={isOpened => {
                                                return <Ionicons name={isOpened ? 'chevron-up' : 'chevron-down'} color={'white'} size={18} />;
                                            }}
                                            dropdownIconPosition={'rigth'}
                                            dropdownStyle={styles.dropDropStyle}
                                            rowStyle={styles.dropRowStyle}
                                            rowTextStyle={styles.dropRowTxtStyle}
                                        />
                                    </FormInput>
                                </FormControle>

                                <FormControle marginV='30px'>
                                    <FormInput>
                                        <TouchableOpacity style={[styles.btnPreSuv, { backgroundColor: 'tomato' }]}>
                                            <MyButton width='80px' color='white' >Fermer</MyButton>
                                            <Ionicons name="md-information-circle-outline" color="white" size={28} style={{ top: 2 }} />
                                        </TouchableOpacity>
                                    </FormInput>

                                    <FormInput>
                                        <TouchableOpacity onPress={()=>{navigation.navigate('anomalieFac'),setModalVisible(!modalvisible)}}
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
        </View>
    )
}
const styles = StyleSheet.create({
    madalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    modalContent: {
        width: '100%',
        height: '80%',
        position: 'absolute',
        borderTopEndRadius: 25,
        borderTopLeftRadius: 25,
        bottom: 0,
        backgroundColor: 'gray',
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    btnPreSuv: {
        backgroundColor: '#333333',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 5,
        paddingHorizontal: 5,
    },
    dropBtnStyle: {
        height: 35,
        width:'59%',
        marginVertical: 1,
        backgroundColor: '#465881',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#444',
      },
      dropBtnTxtStyle: { color: 'rgba(255,255,255,0.7)', textAlign: 'left' ,},
      dropDropStyle: { backgroundColor: '#EFEFEF' , },
      dropRowStyle: { backgroundColor: '#EFEFEF', },
      dropRowTxtStyle: { color: '#000', textAlign: 'left' },
})
