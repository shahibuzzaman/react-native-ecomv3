import React, {Component} from 'react';

import {Button, Card} from 'react-native-elements';
import SnackBar from 'react-native-snackbar-component';
import {postCart} from '../../actions';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Image,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';

var {height, width} = Dimensions.get('window');

class FeaturedProducts extends Component {
  render() {
    return (
      <View style={{marginTop: -35, marginLeft: 3.5}}>
        <TouchableOpacity
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.push('Product Details', {
              itemId: this.props.item.id,
              otherParam: 'anything you want here',
            });
          }}
          style={styles.divFood}>
          <Image
            style={styles.imageFood}
            resizeMode="contain"
            source={{uri: this.props.item.images[0].src}}
          />

          <Text
            style={{
              fontSize: 15,
              padding: 10,
              textAlign: 'center',
              height: '30%',
            }}>
            {this.props.item.name}
          </Text>
          <View style={{height: '20%', flex: 1, flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 18,
                color: 'green',
                marginLeft: '30%',
              }}>
              {this.props.item.price} ৳
            </Text>

            <View style={{marginLeft: '10%'}}>
              <Button
                title=""
                icon={<Icon name="md-add" size={20} color="white" />}
                buttonStyle={{backgroundColor: 'green'}}
                color="green"
                onPress={() => {
                  this.props.postCart(
                    this.props.item.id,
                    this.props.item.name,
                    this.props.item.price,
                  );
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageFood: {
    width: width / 2 - 20 - 10,
    height: '50%',
    backgroundColor: 'white',
  },
  divFood: {
    flex: 1,
    flexDirection: 'column',
    width: width / 2 - 20,
    height: 250,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: 'center',
    shadowColor: '#3c8f2e',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 50,

    elevation: 8,
    backgroundColor: 'white',
  },
});

export default connect(null, {postCart})(FeaturedProducts);
