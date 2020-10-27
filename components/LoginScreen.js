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
} from 'react-native';
import auth from '@react-native-firebase/auth';
import colors from '../colors.js';
import Loading from './Loading.js';

const LoginScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const loginHandler = () => {
    console.log(email, password);
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(false);
        console.log('signed in!');
        props.navigation.replace('Home');
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert(error.message);
        console.error(error);
      });
  };
  const signupHandler = () => {
    setEmail('');
    setPassword('');
    props.navigation.replace('Signup');
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <KeyboardAvoidingView behavior="position" style={styles.container}>
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={require('../assets/images/main.jpg')}
        />
      </View>
      <Text style={[styles.signupButton, styles.text]}>Enter your details</Text>
      <View style={styles.main}>
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
        <View style={styles.loginButton}>
          <Button color={colors.primary} title="Login" onPress={loginHandler} />
        </View>
      </View>
      <TouchableOpacity onPress={signupHandler}>
        <Text style={styles.signupButton}>Signup instead!</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  loginButton: {
    marginVertical: 10,
    width: '50%',
  },
  signupButton: {
    fontSize: 20,
    color: colors.secondary,
    fontWeight: 'bold',
    marginLeft: 50,
  },
  text: {
    marginTop: '20%',
  },
  image: {
    width: '100%',
  },
});

export default LoginScreen;
