import { AntDesign, FontAwesome5, Ionicons,Entypo, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Modal, Pressable ,BackHandler} from "react-native"
import { useDispatch } from "react-redux";
import { AddDataToStore } from "../../services/AddDataTotore";
import { logout } from "../../services/redux/userSlice";
import { dropAllTables, seedDatabase } from "../../services/SqliteDb";


export default function ModalUserOption() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    function toggleModal() {
        if (!modalVisible) {
            setModalVisible(true);
        } else {
            setModalVisible(false);
        }
    };
    const createDb =()=>{
        seedDatabase();
        toggleModal();
        AddDataToStore(dispatch);
    }
    const goto = (route) => {
        navigation.navigate(route);
        setModalVisible(false);
    }
    const exit = () => {
        BackHandler.exitApp()
    }
   
    const logoutHandler = () =>{
        dispatch(logout());
        goto('login'); 
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
            <FontAwesome5 name="user-cog" size={28} color="white"
                    style={{ marginRight: 6 }}
                />
            </TouchableOpacity>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <Pressable
                    onPress={() => setModalVisible(false)}
                    style={styles.madalContainer}>

                    <Pressable onPress={() => setModalVisible(true)}
                        style={styles.modalContent}>
                       
                        <TouchableOpacity style={styles.contText}
                            onPress={() => logoutHandler()}>
                            <AntDesign style={{ margin: 3 }} name="logout" size={22} color="black" />
                            <Text style={{ fontSize: 20,color: 'tomato'}}>Deconnexion</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.contText}
                            onPress={exit}>
                                <Ionicons style={{ margin: 3 }} name="exit-outline" size={24} color="black" />
                            <Text style={{ fontSize: 20,color: 'red'}}>Quitter</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.contText}
                            onPress={ createDb}>
                                <Entypo style={{ margin: 3 }} name="database" size={24} color="blue" />
                            <Text style={{ fontSize: 20,color: 'blue'}}>Creer DB</Text>
                        </TouchableOpacity>
                       
                        <TouchableOpacity style={styles.contText}
                            onPress={()=> {dropAllTables,setModalVisible(false)}}>
                                <Entypo style={{ margin: 3 }} name="database" size={24} color="blue" />
                            <Text style={{ fontSize: 20,color: 'red'}}>Delete DB</Text>
                        </TouchableOpacity>

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
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        width: '43%',
        position: 'absolute',
        top: 39,
        backgroundColor: 'white',
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    contText: {
        marginVertical: 2,
        display: "flex",
        flexDirection: 'row',
        height: 30
      },

});
