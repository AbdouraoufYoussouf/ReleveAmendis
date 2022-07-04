// import { AntDesign, Ionicons } from "@expo/vector-icons";
// import React, { useState, useRef, useEffect } from "react";
// import { StyleSheet, Text, View, Pressable, TouchableOpacity, Alert, Dimensions } from "react-native";
// import Popover, { PopoverMode, PopoverPlacement } from 'react-native-popover-view';
// import { useNavigation } from '@react-navigation/native';

// export default function CompteScreen() {
//   const navigation = useNavigation();
//   const [showPopover, setShowPopover] = useState(false);
//   const togglePopover = () => {
//     setShowPopover(!showPopover);
//   };

//   const optionsCompteurs = [
//     { 'title': 'Ajouter compteur', 'route': 'addCompteur' },
//     { 'title': 'Changer tourner', 'route': 'changetourne' },
//     { 'title': 'Compteur non lus', 'route': 'nonluCompteur' },
//     { 'title': 'Rechercher compteur', 'route': 'searchCompteur' },
//     { 'title': 'Lecture par secteur', 'route': 'lectureSecteur' },
//     { 'title': 'Lecture par rue', 'route': 'lectureRue' }];

//   return (
//     <>
//       <Popover
//         isVisible={showPopover}
//         debug={true}
//         offset={23}
//         onRequestClose={() => setShowPopover(false)}
//         from={(
//           <TouchableOpacity style={styles.popovercom} onPress={togglePopover}>
//              {showPopover ? (
//                 <Text style={{color: 'black' ,fontSize:50}}>X</Text>
//               ) : (
//                 <Ionicons name="speedometer" color='#36382F' size={25} />
//               )}
//             <Text style={{ fontSize: 15, marginHorizontal: 3, color: '#36382F' }}>Compteur</Text>
//           </TouchableOpacity>
//         )}>
//         <>
//           {/* {
//             optionsCompteurs.map((item, index) => {
//               console.log(item.route)
//               return(
//               <TouchableOpacity key={index} style={styles.contText}
//               onPress={() => navigation.navigate(item.route)}  >
//                 <AntDesign name="check" size={22} color="black" />
//                 <Text style={styles.modalText}>{item.title}</Text>
                
//               </TouchableOpacity>)
//             })
//           } */}
//           <TouchableOpacity  style={styles.contText}
//             onPress={() => navigation.navigate('searchCompteur')}  >
//             <AntDesign name="check" size={22} color="black" />
//             <Text style={styles.modalText}>Rechercher un compteur</Text>

//           </TouchableOpacity>
//         </>
//       </Popover>
//     </>
//   )

// }

// const styles = StyleSheet.create({

//   popovercom: {
//     backgroundColor: 'white',
//     display: 'flex', flexDirection: 'column',
//     justifyContent: 'center', alignItems: 'center',
//   },

//   contText: {
//     backgroundColor: 'gray',
//     marginVertical: 2,
//     display: "flex",
//     flexDirection: 'row',
//     height: 30
//   },
//   modalText: {
//     fontSize: 16,
//   }
// });
