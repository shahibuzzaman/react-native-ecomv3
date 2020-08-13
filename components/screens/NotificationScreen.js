import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window');

import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from '../../firebase';
import _ from 'lodash';

const NotificationScreen = ({navigation}) => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user != null) {
        var orderhistoryRef = firebase
          .database()
          .ref('/orders/' + user.phoneNumber)
          .on('value', (snapshot) => {
            setOrderHistory(snapshot.val());
          });
      }
    });
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.divFood}>
        <Text>
          Created on: <Text style={{fontWeight: 'bold'}}>{item.date}</Text>
        </Text>
        <Text>
          Time: <Text style={{fontWeight: 'bold'}}>{item.time}</Text>
        </Text>
        <Text>
          Item(s): <Text style={{fontWeight: 'bold'}}>{item.total_items}</Text>
        </Text>
        <Text>
          Price: <Text style={{fontWeight: 'bold'}}>{item.total} ৳</Text>
        </Text>
      </View>
    );
  };

  const listofOrderHistory = _.map(orderHistory, (val, key) => {
    return {
      ...val,
      key: key,
    };
  });

  console.log(listofOrderHistory);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <FlatList
        data={listofOrderHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  divFood: {
    flex: 1,
    flexDirection: 'column',
    width: width,
    height: 100,
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    alignItems: 'flex-start',
    elevation: 4,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    backgroundColor: 'white',
  },
});

export default NotificationScreen;
