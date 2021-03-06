import { AntDesign, MaterialCommunityIcons, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, TouchableOpacity, Modal, Dimensions, useWindowDimensions, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Form, FormControle, MyText, InputFild, Label, FormInput, MyButton } from '../Screens/styles/homeStyle';
import MySelect from "./MySelect";
import { useDispatch, useSelector } from 'react-redux';
import { ToastAvertisement } from "./Notifications";
import { loding, notLoding, setCompteurs } from "../../services/redux/compteurSlice";
import { setTourneCourant } from "../../services/redux/userSlice";

export default function ModalCompteurOption() {
    const { height, width } = useWindowDimensions();

    const dispatch = useDispatch();
    const ruesData = useSelector((state) => state.rueSecteurs.rues);
    const secteursData = useSelector((state) => state.rueSecteurs.secteurs);
    const tournesData = useSelector((state) => state.user.tournes);
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibletourne, setModalVisibletourne] = useState(false);
    const [modalVisibleRue, setModalVisibleRue] = useState(false);
    const [modalVisibleSecteur, setModalVisibleSecteur] = useState(false);
    const [indicator, setIndicator] = useState(false);

    const [tourne, setTourne] = useState('');
    const [rue, setRue] = useState('');
    const [secteur, setSecteur] = useState('');
    const [labelTourne, setLabelTourne] = useState('');
    const [labelRue, setLabelRue] = useState('');
    const [labelSecteur, setLabelSecteur] = useState('');

    const compteursData = useSelector((state) => state.compteurs.compteurs);
    const ancienCompteursData = useSelector((state) => state.compteurs.ancienCompteurs);
    //console.log("ancien",nonluCompteurs)

    const handleTourne = (tourne) => {
        dispatch(setTourneCourant(tourne))
        setModalVisibletourne(false)
    }

    const handleRue = (rue) => {
        setIndicator(true)
        if (rue != '') {
            let parRue = ancienCompteursData.filter((cmp) => cmp.numeroRue == rue && (cmp.etatLecture == 0 || cmp.etatLecture == null))
            let newCompteurs = parRue.map((item, index) => {
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
            dispatch(setCompteurs(newCompteurs))
            setRue('')
            setLabelRue('')
            setTimeout(() => {
                setIndicator(false)
                setModalVisibleRue(false);
            }, 200);
        } else {
            ToastAvertisement('Veillez choisir un numero de rue!')
            setIndicator(false)
        }
    }
    const handleSecteur = (rue) => {
        setIndicator(true)
        if (rue != '') {
            let parRue = ancienCompteursData.filter((cmp) => cmp.codeSecteur == secteur && (cmp.etatLecture == 0 || cmp.etatLecture == null))
            let newCompteurs = parRue.map((item, index) => {
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
            dispatch(setCompteurs(newCompteurs))
            setSecteur('')
            setLabelSecteur('')
            setTimeout(() => {
                setIndicator(false)
                setModalVisibleSecteur(false);
            }, 200);
        } else {
            ToastAvertisement('Veillez choisir le numero du Secteur!')
            setIndicator(false)
        }

    }

    const handleResetFilter = () => {
        dispatch(loding())
        let nonluCompteurs = ancienCompteursData.filter((nl) => nl.etatLecture == 0 || nl.etatLecture == null)
        let newCompteurs = nonluCompteurs.map((item, index) => {
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
        dispatch(setCompteurs(newCompteurs))
        dispatch(notLoding())
    }

    const goto = (route) => {
        navigation.navigate(route);
        setModalVisible(false);
    }

    const tournes = tournesData.map((a) => {
        return { label: a.numeroTournee.toString(), value: a.numeroTournee }
    });

    const rues = ruesData.map((a) => {
        return { label: a.numeroRue, value: a.numeroRue }
    });

    const secteurs = secteursData.map((a) => {
        return { label: a.codeSecteur, value: a.codeSecteur }
    });

    //console.log('gfgf',secteurs)

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Feather name="menu" size={28} color="white"
                    style={{ marginRight: 6 }}
                />
            </TouchableOpacity>
            {/* modal de options */}
            <Modal
                animationType="fade"
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
                        style={[styles.modalContent, { top: 35 }]}>

                        <View style={styles.body}>
                            <TouchableOpacity style={styles.contText}
                                onPress={() => { goto('addCompteur'), setModalVisible(false) }}>
                                <AntDesign style={{ marginTop: 3 }} name="check" size={22} color="white" />
                                <Text style={styles.modalText}>Ajouter compteur</Text>
                            </TouchableOpacity>

                            <View style={{ width: '100%', height: 1, backgroundColor: 'gray', alignSelf: 'center',}}></View>
                            <TouchableOpacity style={styles.contText}
                                onPress={() => { goto('nonluCompteur'), setModalVisible(false) }}>
                                <AntDesign style={{ marginTop: 3 }} name="check" size={22} color="white" />
                                <Text style={styles.modalText}>Compteur non lus</Text>
                            </TouchableOpacity>
                            <View style={{ width: '100%', height: 2, backgroundColor: 'gray', alignSelf: 'center'}}></View>

                            <TouchableOpacity style={styles.contText}
                                onPress={() => { setModalVisibletourne(true), setModalVisible(false) }}>
                                <AntDesign style={{ marginTop: 3 }} name="check" size={22} color="white" />
                                <Text style={styles.modalText}>Changer tourner</Text>
                            </TouchableOpacity>

                            <View style={{ width: '100%', height: 3, backgroundColor: 'white', alignSelf: 'center', marginTop: 5, borderRadius: 5 }}></View>
                            <Text style={{textAlign:'center',color:'white',fontSize:18,top:1.5}}>Filtre</Text>
                            <View style={{ width: '100%', height: 3, backgroundColor: 'white', alignSelf: 'center', marginVertical: 5, borderRadius: 5 }}></View>

                            <TouchableOpacity style={styles.contText}
                                onPress={() => { setModalVisibleRue(true), setModalVisible(false) }}>
                                <AntDesign style={{ marginTop: 3 }} name="check" size={22} color="white" />
                                <Text style={styles.modalText}>Lecture par rue</Text>
                            </TouchableOpacity>
                            <View style={{ width: '100%', height: 2, backgroundColor: 'gray', alignSelf: 'center'}}></View>

                            <TouchableOpacity style={styles.contText}
                                onPress={() => { setModalVisibleSecteur(true), setModalVisible(false) }}>
                                <AntDesign style={{ marginTop: 3 }} name="check" size={22} color="white" />
                                <Text style={styles.modalText}>Lecture par secteur</Text>
                            </TouchableOpacity>

                            <View style={{ width: '100%', height: 2, backgroundColor: 'gray', alignSelf: 'center'}}></View>
                            <TouchableOpacity style={styles.contText}
                                onPress={() => { handleResetFilter(), setModalVisible(false) }}>
                                <AntDesign style={{ marginTop: 3 }} name="check" size={22} color="white" />
                                <Text style={styles.modalText}>Annuler le filtrage</Text>
                            </TouchableOpacity>

                        </View>

                    </Pressable>
                </Pressable>
            </Modal>

            {/* changer tourner */}

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
                            <View style={{ width: 50, height: 5, backgroundColor: 'white', alignSelf: 'center', marginTop: 5, borderRadius: 5 }}></View>

                            <Form >
                                <MyText color='white' marginTop='13px' large>Changement de tourn??</MyText>
                                <FormControle>
                                    <FormInput width='75%'>
                                        <MyText color='white' large marginH='5px'>N?? Tourn??</MyText>
                                        <MySelect
                                            placeholder='Select Tourn??'
                                            data={tournes}
                                            label={labelTourne}
                                            setLabel={setLabelTourne}
                                            setValue={setTourne} />
                                    </FormInput>

                                </FormControle>
                                <FormControle>
                                    <FormInput>
                                        <TouchableOpacity onPress={() => setModalVisibletourne(false)} style={[styles.btnPreSuv, { backgroundColor: 'tomato' }]}>
                                            <MyButton width='75px' color='white' >F??rmer</MyButton>
                                            <Ionicons name="md-information-circle-outline" color="white" size={28} style={{ top: 2 }} />
                                        </TouchableOpacity>
                                    </FormInput>


                                    <FormInput>
                                        <TouchableOpacity onPress={() => handleTourne(tourne)}
                                            style={[styles.btnPreSuv, { backgroundColor: '#465881', width: 120 }]}>
                                            {
                                                indicator ? (
                                                    <ActivityIndicator size="large" color="#fff" style={{}} />
                                                ) : (
                                                    <>
                                                        <MyButton width='110px' color='white' >Changer</MyButton>
                                                    </>
                                                )
                                            }
                                        </TouchableOpacity>
                                    </FormInput>

                                </FormControle>
                            </Form>

                        </Pressable>

                    </Pressable>
                </Modal>

                {/* modal rue */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleRue}
                    onRequestClose={() => {
                        setModalVisibleRue(!modalVisibleRue);
                    }}
                >
                    <Pressable
                        onPress={() => setModalVisibleRue(false)}
                        style={styles.modalContainerTourne}>

                        <Pressable onPress={() => setModalVisibleRue(true)}
                            style={styles.modalContentTourne}>
                            <View style={{ width: 50, height: 5, backgroundColor: 'white', alignSelf: 'center', marginTop: 5, borderRadius: 5 }}></View>

                            <Form >
                                <MyText color='white' marginTop='13px' large>Choix d'une rue ?? lire</MyText>
                                <FormControle>
                                    <FormInput width='80%'>
                                        <MyText color='white' large marginH='5px'>N?? Rue</MyText>
                                        <MySelect
                                            placeholder='Select num??ro Rue'
                                            data={rues}
                                            label={labelRue}
                                            setLabel={setLabelRue}
                                            setValue={setRue} />
                                    </FormInput>

                                </FormControle>
                                <FormControle>
                                    <FormInput>
                                        <TouchableOpacity onPress={() => setModalVisibleRue(false)} style={[styles.btnPreSuv, { backgroundColor: 'tomato' }]}>
                                            <MyButton width='75px' color='white' >Fermer</MyButton>
                                            <Ionicons name="md-information-circle-outline" color="white" size={28} style={{ top: 2 }} />
                                        </TouchableOpacity>
                                    </FormInput>


                                    <FormInput>
                                        <TouchableOpacity onPress={() => handleRue(rue)}
                                            style={[styles.btnPreSuv, { backgroundColor: '#465881', width: 120 }]}>
                                            {
                                                indicator ? (
                                                    <ActivityIndicator size="large" color="#fff" />
                                                ) : (
                                                    <MyButton width='110px' color='white' >Enr??gistrer</MyButton>
                                                )
                                            }
                                        </TouchableOpacity>
                                    </FormInput>

                                </FormControle>
                            </Form>

                        </Pressable>

                    </Pressable>
                </Modal>
                {/* modal secteur */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleSecteur}
                    onRequestClose={() => {
                        setModalVisibleSecteur(!modalVisibleSecteur);
                    }}
                >
                    <Pressable
                        onPress={() => setModalVisibleSecteur(false)}
                        style={styles.modalContainerTourne}>

                        <Pressable onPress={() => setModalVisibleSecteur(true)}
                            style={styles.modalContentTourne}>
                            <View style={{ width: 50, height: 5, backgroundColor: 'white', alignSelf: 'center', marginTop: 5, borderRadius: 5 }}></View>

                            <Form >
                                <MyText color='white' marginTop='13px' large>Choix du Secteur ?? lire</MyText>
                                <FormControle>
                                    <FormInput width='75%'>
                                        <MyText color='white' large marginH='5px'>N?? Secteur</MyText>
                                        <MySelect
                                            placeholder='Select num??ro Secteur'
                                            data={secteurs}
                                            label={labelSecteur}
                                            setLabel={setLabelSecteur}
                                            setValue={setSecteur} />
                                    </FormInput>

                                </FormControle>
                                <FormControle>
                                    <FormInput>
                                        <TouchableOpacity onPress={() => setModalVisibleSecteur(false)} style={[styles.btnPreSuv, { backgroundColor: 'tomato' }]}>
                                            <MyButton width='75px' color='white' >Fermer</MyButton>
                                            <Ionicons name="md-information-circle-outline" color="white" size={28} style={{ top: 2 }} />
                                        </TouchableOpacity>
                                    </FormInput>


                                    <FormInput>
                                        <TouchableOpacity onPress={() => handleSecteur()}
                                            style={[styles.btnPreSuv, { backgroundColor: '#465881', width: 120 }]}>
                                            {
                                                indicator ? (
                                                    <ActivityIndicator size="large" color="#fff" />
                                                ) : (
                                                    <MyButton width='110px' color='white' >Enr??gistrer</MyButton>
                                                )
                                            }
                                        </TouchableOpacity>
                                    </FormInput>

                                </FormControle>
                            </Form>

                        </Pressable>

                    </Pressable>
                </Modal>

            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    /////////////// Modal ////////

    modalContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        borderBottomLeftRadius: 20,
        width: 'auto',
        height: 'auto',
        backgroundColor: '#444',
        position: 'absolute',

        right: 0,
        padding: 5
    },
    body: {
        width: '100%',
    },
    contText: {
        //backgroundColor: 'gray',
        marginVertical: 2,
        display: "flex",
        flexDirection: 'row',
        height: 30
    },
    modalText: {
        fontSize: 18,
        color: 'white',
    },

    ////modal tourne

    modalContainerTourne: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContentTourne: {
        borderTopLeftRadius: 27,
        borderTopRightRadius: 27,
        width: '100%',
        minHeight: '20%',
        padding: 5,
        backgroundColor: '#444',
        justifyContent: 'center',
        alignItems: 'center',
    },


    ///
    btnPreSuv: {
        backgroundColor: '#333333',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 5,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center'
        //marginLeft:3
    },

    chevron: { color: '#fff', fontSize: 25, top: 3 },
    bg: { color: '#fff', backgroundColor: '#465881' },
});
