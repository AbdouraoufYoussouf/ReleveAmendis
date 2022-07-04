import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Container, Icone, Form, FormControle, FormInput, InputFild, Label, Logo, Title } from './styles';
import { MyButton } from '../Screens/styles/homeStyle';

export default function Register({ navigation }) {

  // Show Password //
  const [show, setShow] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const showIconPass = () => {
    setShow(!show)
    setShowPass(!showPass)
  }
  // End Show Password //

  // Register User //
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  // End Register User //

  const goTologin = () => navigation.navigate("login");

  return (
    <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView keyboardVerticalOffset={5} behavior='position'>
        <Container>
          <Logo source={require('../Images/Amendis.png')} resizeMode="cover" />
          <Form>
            <FormControle>
              <Label>Login</Label>
              <FormInput>
                <InputFild onChangeText={(email) => setEmail(email)} value={email} />
              </FormInput>
            </FormControle>
            <FormControle>
              <Label>Password</Label>
              <FormInput>
                <InputFild onChangeText={(password) => setPassword(password)} value={password} secureTextEntry={showPass} />
                <Icone onPress={showIconPass} >
                  <Ionicons name={show === false ? 'eye' : 'eye-off'} size={30} color={'rgba(255,255,255,0.7)'} />
                </Icone>
              </FormInput>
            </FormControle>
            <FormControle>
              <Label>Confirm Password</Label>
              <FormInput>
                <InputFild onChangeText={(password) => setConfirmPass(password)} value={confirmPass} secureTextEntry={showPass} />
                <Icone onPress={showIconPass} >
                  <Ionicons name={show === false ? 'eye' : 'eye-off'} size={30} color={'rgba(255,255,255,0.7)'} />
                </Icone>
              </FormInput>
            </FormControle>
            <FormControle>
             
                <TouchableOpacity onPress={() => navigation.navigate('compte')} style={[styles.btnSave, { backgroundColor: '#155e75' }]}>
                  <MyButton fontSize='25px' width='100%' color='white' >Enregister</MyButton>
                </TouchableOpacity>
            </FormControle>
          </Form>

        </Container>
      </KeyboardAvoidingView >
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  btnSave: {
    backgroundColor: '#333333',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    marginVertical:20,
    paddingHorizontal: 5,
  },
})