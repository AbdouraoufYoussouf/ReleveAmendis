import React, { useState } from "react";
import { Button, Text, StyleSheet, View } from "react-native";
import Dialog from "react-native-dialog";

function TestScreen() {
  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Show dialog" onPress={showDialog}
      />
      <Dialog.Container visible={visible}
        contentStyle={styles.dialog} >
        <Dialog.Description style={{ color: 'white' }}>
          Do you want to delete this account? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Férmer" style={{ backgroundColor: 'blue', marginBottom: 5, borderRadius: 7 }} color={'white'} onPress={handleCancel} />
      </Dialog.Container>
    </View>
  );
}

export default TestScreen;

const styles = StyleSheet.create({
  container: {
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