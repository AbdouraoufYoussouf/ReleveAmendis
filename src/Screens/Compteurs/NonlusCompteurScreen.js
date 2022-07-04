import React, { useState } from 'react'
import { View, SectionList, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { loding, notLoding, setIdCompteur, setRouteCompteur } from '../../../services/redux/compteurSlice';

export default function NonlusCompteurScreen({navigation}) {

    const compteurs = useSelector((state) => state.compteurs.compteurs);
    const data = compteurs.filter((cmp)=>cmp.etatLecture==null || cmp.etatLecture==0)
    const dispatch = useDispatch();

    //console.log('nonlus',data)
 
    const goToHomeWithID = (id) => {
        dispatch(loding())
        dispatch(setIdCompteur(id-1));
        navigation.navigate('home');  
       
            dispatch(notLoding());
         
    }

    const FlatList_Header = () => {
        return (
            <View style={{
                height: 30,
                width: "100%",
                display: 'flex',
                flexDirection:'row',
                backgroundColor: '#17DBE4',
                alignItems: 'center',
            }}>

                <Text style={{ fontSize: 18,fontWeight:'bold', width:50, color: 'black',height:30,textAlign:'center'  }}> ID </Text>
                <Text style={{ fontSize: 18,fontWeight:'bold', width:80, color: 'black',height:30, borderLeftWidth:1, }}> Numero </Text>
                <Text style={{ fontSize: 18,fontWeight:'bold', width:80, color: 'black',borderLeftWidth:1,height:30, }}> IdGeo </Text>
                <Text style={{ fontSize: 18,fontWeight:'bold', width:80, color: 'black',borderLeftWidth:1,height:30, }}> Police </Text>
                <Text style={{ fontSize: 18,fontWeight:'bold', width:185, color: 'black',borderLeftWidth:1,height:30, }}> Abonné </Text>
                <Text style={{ fontSize: 18,fontWeight:'bold', width:80, color: 'black',borderLeftWidth:1,height:30, }}> adresse </Text>

            </View>
        );
    }

    const ItemRender = ({ idCompteur,numero,idGeo,police,abonne,adress,index }) => (
        <TouchableOpacity key={index}
            onPress={() => goToHomeWithID(idCompteur)} 
            style={[styles.item,index%2 && { backgroundColor: '#D0C9C0'}]}>
            <Text style={{fontSize: 16,marginLeft:3,width:50,color: 'black',textAlign:'center' }}>{idCompteur}</Text>
            <Text style={{fontSize: 16,marginLeft:3,width:80,color: 'black' }}>{numero}</Text>
            <Text style={{fontSize: 16,width:80,color: 'black' }}>{idGeo}</Text>
            <Text style={{fontSize: 16,width:80,color: 'black' }}>{police}</Text>
            <Text style={{fontSize: 16,width:185,marginHorizontal:3,color: 'black' }}>{abonne}</Text>
            <Text style={{fontSize: 16,width:'auto',marginHorizontal:3,color: 'black' }}>{adress}</Text>
        </TouchableOpacity>
    );
    const ItemDivider = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#607D8B",
                }}
            />
        );
    }
  

    return (

        <View style={styles.container} >
            <ScrollView horizontal={true} bounces={false}>
                <FlatList
                    data={data}
                    renderItem={({ item,index }) => <ItemRender idCompteur={item.compteurId} index={index} numero={item.numeroCompteur} idGeo={item.idGeographique} police={item.police} abonne={item.nomAbonne} adress={item.adresse} />}
                    keyExtractor={item => item.compteurId}
                    ItemSeparatorComponent={ItemDivider}
                    ListHeaderComponent={FlatList_Header}
                    ListHeaderComponentStyle={{ borderBottomWidth: 2 }}
                />

            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
    },

    item: {
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:2,
    }
})