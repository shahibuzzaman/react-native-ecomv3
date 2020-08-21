import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
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
      <TouchableHighlight
        activeOpacity={1}
        underlayColor={'#ccd0d5'}
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.push('Search', {});
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 30,
          backgroundColor: 'orange',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="md-search" size={30} color="#000000" />
      </TouchableHighlight>

      <Icon
        name="notifications"
        size={30}
        color="white"
        style={{marginLeft: 15}}
      />
      {/* <Icon name="md-menu" size={30} color="black" /> */}
    </View>
  );
};

export default SearchBar;
