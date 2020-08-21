import React, {Component, useEffect, useState} from 'react';
import {postCart} from '../actions';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

class DetailsScreen extends Component {
  state = {
    data: [],
    isLoading: true,
    itemId: this.props.route.params.itemId,
  };

  componentDidMount() {
    const api =
      'https://malamalexpress.com/wc-api/v3/products/' +
      this.state.itemId +
      '/?consumer_key=ck_af6dae0d921e12528b92964fb526317370642ec1&consumer_secret=cs_d172a15e6fa946ccc01890ca6adec67e3724e667';
    fetch(api)
      .then((response) => response.json())
      .then((json) => {
        this.setState({data: json.product});
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  render() {
    const styles = {
      container: {},
      productImg: {
        width: 300,
        height: 300,
      },
      name: {
        fontSize: 28,
        color: '#696969',
        fontWeight: 'bold',
      },
      price: {
        marginTop: 10,
        fontSize: 18,
        color: 'green',
        fontWeight: 'bold',
      },
      description: {
        textAlign: 'center',
        marginTop: 10,
        color: '#696969',
      },
      star: {
        width: 40,
        height: 40,
      },
      btnColor: {
        height: 30,
        width: 30,
        borderRadius: 30,
        marginHorizontal: 3,
      },
      btnSize: {
        height: 40,
        width: 40,
        borderRadius: 40,
        borderColor: '#778899',
        borderWidth: 1,
        marginHorizontal: 3,
        backgroundColor: 'white',

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      starContainer: {
        justifyContent: 'center',
        marginHorizontal: 30,
        flexDirection: 'row',
        marginTop: 20,
      },
      contentColors: {
        justifyContent: 'center',
        marginHorizontal: 30,
        flexDirection: 'row',
        marginTop: 20,
      },
      contentSize: {
        justifyContent: 'center',
        marginHorizontal: 30,
        flexDirection: 'row',
        marginTop: 20,
      },
      separator: {
        height: 2,
        backgroundColor: '#eeeeee',
        marginTop: 20,
        marginHorizontal: 30,
      },
      shareButton: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#00BFFF',
      },
      shareButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
      },
      addToCarContainer: {
        marginHorizontal: 30,
      },
    };

    const {data, isLoading, itemId} = this.state;

    return (
      <View style={{flex: 1, padding: 20, backgroundColor: 'white'}}>
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{width: 300, height: 300, borderRadius: 10}}
              source={{
                uri: data.featured_src,
              }}
            />
          </View>
          <View>
            <Text>{data.title}</Text>
          </View>
          <Text>{data.price} ৳</Text>
          <Text>{data.short_description}</Text>

          <View style={styles.separator}></View>
          <View style={styles.addToCarContainer}>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => {
                this.props.postCart(itemId, data.title, data.price);
              }}>
              <Text style={styles.shareButtonText}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(null, {postCart})(DetailsScreen);
