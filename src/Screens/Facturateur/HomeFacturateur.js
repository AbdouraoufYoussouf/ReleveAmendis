import React from 'react';
import { Button, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeFacturateur() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4169E1', '#6495ED',]}
        style={styles.linearGradient}
      >
        <View style={{ justifyContent: 'space-around', alignItems: 'center', width: '100%',height:'35%' }}>
          <TouchableOpacity style={{ alignSelf: 'center', width: '50%', height: 35 }} >
            <Text style={{width:'100%', textAlign: 'center', backgroundColor: 'white', fontSize: 20, padding: 3 }}>Décharge complete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignSelf: 'center', width: '50%', height: 35 }} >
            <Text style={{width:'100%', textAlign: 'center', backgroundColor: 'white', fontSize: 20, padding: 3 }}>Décharge Partielle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignSelf: 'center', width: '50%', height: 35 }} >
            <Text style={{width:'100%', textAlign: 'center', backgroundColor: 'white', fontSize: 20, padding: 3 }}>Charge</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'

  },
})
