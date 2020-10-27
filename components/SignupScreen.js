import React, {useState} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CalendarPicker from 'react-native-calendar-picker';
import colors from '../colors.js';
import Loading from './Loading.js';

const SignupScreen = (props) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [phone, setPhone] = useState();
  const [dob, setDob] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focus, setFocus] = useState(false);
  const [loading, setLoading] = useState(false);

  const signupHandler = async () => {
    if (!fname || !lname || !phone || !email || !password) {
      console.log('Please add data in all the fields');
    } else {
      console.log(fname, lname, phone, email, password, dob);
      setLoading(true);
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          setLoading(false);
          console.log('User account created & signed in!');
          firestore()
            .collection('Users')
            .add({
              fname: fname,
              lname: lname,
              phone: phone,
              email: fname,
              password: password,
            })
            .then(() => {
              console.log('User added!');
            });
          //user.sendEmailVerification();
          props.navigation.replace('Home');
        })
        .catch((error) => {
          setLoading(false);
          Alert.alert(error.message);
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    }
  };
  const loginHandler = () => {
    setFname('');
    setLname('');
    setPhone();
    setEmail('');
    setPassword('');
    props.navigation.replace('Login');
  };
  if (loading) {
    return <Loading />;
  }
  if (focus) {
    return (
      <View style={styles.container1}>
        <CalendarPicker
          onDateChange={(date) => {
            setDob(date.toDate());
          }}
        />
        <View style={styles.signupButton}>
          <Button
            color={colors.primary}
            title="Done"
            onPress={() => setFocus(false)}
          />
        </View>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView behavior="position" style={styles.container}>
      <ScrollView>
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={require('../assets/images/main.jpg')}
          />
        </View>
        <Text style={[styles.loginButton, styles.text]}>
          Enter your details
        </Text>
        <View style={styles.main}>
          <TextInput
            placeholder="First Name"
            value={fname}
            onChangeText={(text) => setFname(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Last Name"
            value={lname}
            onChangeText={(text) => setLname(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Phone Number"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            keyboardType="phone-pad"
            style={styles.input}
          />
          <TextInput
            placeholder="Date of Birth"
            value={dob ? dob.toDateString() : dob}
            onFocus={() => setFocus(true)}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={styles.input}
          />
          <View style={styles.signupButton}>
            <Button
              color={colors.primary}
              title="Signup"
              onPress={signupHandler}
            />
          </View>
        </View>
        <TouchableOpacity onPress={loginHandler}>
          <Text style={styles.loginButton}>Login instead!</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    margin: 10,
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
    width: '80%',
    fontSize: 18,
    marginBottom: 10,
  },
  signupButton: {
    marginVertical: 10,
    width: '50%',
  },
  loginButton: {
    fontSize: 20,
    color: colors.secondary,
    fontWeight: 'bold',
    marginLeft: 50,
  },
  text: {
    marginTop: 10,
  },
  image: {
    width: '100%',
  },
});

export default SignupScreen;
