import React from 'react';
import colors from '../colors.js';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
const Loading = (props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      /*Add changes here
      */
      <View>
      <Text>Loading</Text>
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

export default Loading;
