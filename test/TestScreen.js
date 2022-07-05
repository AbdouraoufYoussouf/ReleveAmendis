import React, { useEffect, useState, useCallback, useRef, Fragment } from 'react'
import { Text, View, StyleSheet ,Button} from 'react-native'
import MySelect from '../src/Components/MySelect'
import { useDispatch, useSelector } from 'react-redux';
import MyDialog from '../src/Components/MyDialog';


export default function TestScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text>je suis test app</Text>
      <Button title='REset seelect' onPress={()=>setModalVisible(true)} />
     <MyDialog modalVisible={modalVisible}
        content='je suis celibataire'
        setModalVisible={setModalVisible}
        type='warning'
     />
    </View>
  )
}


// import React, { useState } from "react";
// import { Button, Text, StyleSheet, View } from "react-native";
// import Dialog from "react-native-dialog";

// function TestScreen() {
//   const [visible, setVisible] = useState(false);
//   const showDialog = () => {
//     setVisible(true);
//   };
//   const handleCancel = () => {
//     setVisible(false);
//   };

//   const handleDelete = () => {
//     // The user has pressed the "Delete" button, so here you can do your own logic.
//     // ...Your logic
//     setVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Show dialog" onPress={showDialog}
//       />
//       <Dialog.Container visible={visible}
//         contentStyle={styles.dialog} >
//         <Dialog.Description style={{ color: 'white' }}>
//           Do you want to delete this account? You cannot undo this action.
//         </Dialog.Description>
//         <Dialog.Button label="Férmer" style={{ backgroundColor: 'blue', marginBottom: 5, borderRadius: 7 }} color={'white'} onPress={handleCancel} />
//       </Dialog.Container>
//     </View>
//   );
// }

// export default TestScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  dialog: {
    height: 120,
    borderRadius: 7,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
});