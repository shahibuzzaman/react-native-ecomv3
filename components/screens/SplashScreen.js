import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  Button,
  ImageBackground,
} from 'react-native';

class SplashScreen extends Component {
  state = {};

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = () => {
    setTimeout(() => {
      this.props.navigation.navigate('Home');
    }, 2000);
  };

  render() {
    return (
      <View>
        <Text>This Is Splash </Text>
      </View>
    );
  }
}

export default SplashScreen;
