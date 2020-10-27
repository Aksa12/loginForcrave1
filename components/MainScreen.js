import React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';
import colors from '../colors.js';

const MainScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={require('../assets/images/main.jpg')}
        />
      </View>
      <View style={styles.titleView}>
        <Text style={styles.title}>ForCrave</Text>
      </View>
      <View style={styles.buttonView}>
        <View style={styles.button}>
          <Button
            color={colors.primary}
            title="SignUp"
            onPress={() => props.navigation.replace('Signup')}
          />
        </View>
        <View style={styles.button}>
          <Button
            color={colors.primary}
            title="Login"
            onPress={() => props.navigation.replace('Login')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
  },
  title: {
    fontSize: 30,
    color: colors.secondary,
  },
  button: {
    width: '50%',
    marginBottom: 20,
  },
  imageView: {},
  titleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    flex: 3,
    alignItems: 'center',
    marginTop: 50,
  },
});

export default MainScreen;
