import React, { useState, useEffect } from 'react';
import {
  Button, TextInput, View, Text, StyleSheet,
  TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from '../../firebase';

export default function AuthAndInfo({ navigation }) {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');
  const [address, setAddress] = useState('');

  const [inputPhone, setInputPhone] = useState('');

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber('+88' + phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
      const { currentUser } = firebase.auth();
      console.log('current user', currentUser);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (user) {
    var ref = firebase.database().ref('/users/' + user.phoneNumber);
    ref.set({ phone: user.phoneNumber, address: address });
    navigation.navigate('Cart');
    return (
      <View>
        <Text>{user.phoneNumber}</Text>
      </View>
    );
  } else {
    if (!confirm) {
      return (

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.inner}>
              <TextInput
                keyboardType="numeric"
                onChangeText={(phoneN) => setInputPhone(phoneN)}
                placeholder="Phone Number e.g. 0171...."
                style={styles.textInput} />

              <TextInput
                onChangeText={(address) => setAddress(address)}
                placeholder="Shipping Address"
                style={styles.textInput} />

              <View style={styles.btnContainer}>
                <Button title="Submit" onPress={() => signInWithPhoneNumber(inputPhone)} />
              </View>
            </View>



          </TouchableWithoutFeedback>

        </KeyboardAvoidingView>


      );
    } else {
      return (
        <>
          <Text>Input OTP code</Text>
          {/* <TextInput value={code} onChangeText={(text) => setCode(text)} /> */}
          <View style={{ marginBottom: 20 }}>
            <TextInput
              autoFocus={true}
              keyboardType="numeric"
              onChangeText={(text) => setCode(text)}
              style={{
                backgroundColor: '#f5f4f2',
                fontWeight: '600',
                alignSelf: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontSize: 20,
                height: 55,
                width: '50%',
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: 'grey',
              }}
            />

          </View>
          <Button title="Confirm" onPress={() => confirmCode()} />
        </>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  textInput: {

    backgroundColor: '#f5f4f2',
    fontWeight: '600',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
    height: 55,
    width: '100%',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'grey',
  },

  btnContainer: {
    backgroundColor: "white",
    marginTop: 12
  }
});



// <View>
// <View
//   style={{
//     backgroundColor: 'white',
//     margin: 50,
//     padding: 40,
//     borderRadius: 10,
//   }}>
//   <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 15 }}>
//     You haven't sign in yet!
// </Text>

//   <Text style={{ marginBottom: 15 }}>Address </Text>
//   <TextInput
//     value={address}
//     onChangeText={(text) => setAddress(text)}
//     style={{
//       backgroundColor: '#f5f4f2',
//       fontWeight: '600',
//       alignSelf: 'center',
//       alignItems: 'center',
//       textAlign: 'center',
//       fontSize: 20,
//       height: 55,
//       width: '100%',
//       borderRadius: 10,
//       borderWidth: 0.5,
//       borderColor: 'grey',
//       marginBottom: 20,
//     }}
//   />

//   <Text style={{ marginBottom: 15 }}>Phone Number </Text>


//   <TextInput
//     // autoFocus={true}
//     keyboardType="numeric"
//     placeholder="Your Phone number"
//     onChangeText={(phoneN) => setInputPhone(phoneN)}
//     style={{
//       backgroundColor: '#f5f4f2',
//       fontWeight: '600',
//       alignSelf: 'center',
//       alignItems: 'center',
//       textAlign: 'center',
//       fontSize: 20,
//       height: 55,
//       width: '100%',
//       borderRadius: 10,
//       borderWidth: 0.5,
//       borderColor: 'grey',
//       marginBottom: 20,
//     }}
//   />
//   <Button
//     title="Send OTP"
//     onPress={() => signInWithPhoneNumber(inputPhone)}
//   />
//   <View style={{ marginTop: 10 }}>
//     <Button
//       title="Cancel"
//       onPress={() => navigation.goBack()}
//     />
//   </View>
// </View>
// </View>
