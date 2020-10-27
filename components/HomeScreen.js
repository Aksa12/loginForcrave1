import React, {useState, useEffect} from 'react';

import {StyleSheet, Button, View, Text, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
const HomeScreen = (props) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [verified, setVerified] = useState(false);

  // Handle user state changes
  function onAuthStateChanged(user) {
    if (user) {
      if (user.emailVerified) {
        setVerified(true);
      } else {
        setVerified(false);
      }
    } else {
      props.navigation.replace('Login');
    }
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  const verifyEmail = async () => {
    if (!user.emailVerified) {
      await user.sendEmailVerification();
      while (!auth().currentUser.emailVerified) {
        await auth().currentUser.reload();
        console.log('Not verified');
      }
      setUser(auth().currentUser);
      setVerified(true);
      console.log('verification complete');
    } else {
      console.log('verified user');
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log('state called');

    return subscriber; // unsubscribe on unmount
  }, []);

  const signoutHandler = () => {
    auth().signOut();
    // .then(() => {
    //   console.log('User signed out!');
    //   props.navigation.replace('Login');
    // });
  };

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (!verified) {
    return (
      <View style={styles.container}>
        <Button title="Click to verify account" onPress={verifyEmail} />
        <Button title="sign out" onPress={signoutHandler} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Welcome {user.email}</Text>
      <View>
        <Button title="sign out" onPress={signoutHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
