import React from 'react';
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = ({navigation}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
      }}>
      <Icon
        name="md-search"
        size={30}
        color="white"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.push('Search', {});
        }}
      />

      <Icon
        name="md-notifications"
        size={30}
        color="white"
        style={{marginLeft: 15}}
      />
      {/* <Icon name="md-menu" size={30} color="black" /> */}
    </View>
  );
};

export default SearchBar;
