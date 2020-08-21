import React, {Component} from 'react';

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import {ListItem, SearchBar, Header} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import FeaturedProducts from '../screens/FeaturedProducts';
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

class Search extends Component {
  state = {
    loading: false,
    data: [],
    page: 1,
    error: null,
    loadingMore: false,
    productName: '',
    navigation: this.props.navigation,
  };

  makeRemoteRequest() {
    const url = `https://malamalexpress.com/wp-json/wc/v3/products?search=${this.state.productName}&page=${this.state.page}&consumer_key=ck_af6dae0d921e12528b92964fb526317370642ec1&consumer_secret=cs_d172a15e6fa946ccc01890ca6adec67e3724e667`;
    this.setState({loading: true});

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          data:
            this.state.page === 1
              ? Array.from(res)
              : [...this.state.data, ...res],
          error: res.error || null,
          loading: false,
          loadingMore: false,
        });
      })
      .catch((error) => {
        this.setState({error, loading: false});
      });
  }

  _handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
        loadingMore: true,
      }),
      () => {
        this.makeRemoteRequest();
      },
    );
  };

  _renderFooter = () => {
    if (!this.state.loadingMore) return null;

    return (
      <View
        style={{
          position: 'relative',
          width: width,
          height: height,
          paddingVertical: 20,
          // borderTopWidth: 1,
          marginTop: 10,
          marginBottom: 10,
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header
          statusBarProps={{
            barStyle: 'light-content',
            translucent: true,
            backgroundColor: 'green',
          }}
          backgroundColor="green"
          leftComponent={
            <TouchableOpacity>
              <Icon
                style={{marginLeft: 10}}
                name="ios-arrow-back"
                size={30}
                color="white"
                onPress={() => this.state.navigation.goBack()}
              />
            </TouchableOpacity>
          }
          centerComponent={
            <View
              style={{
                width: width * 0.7,
                height: 40,
                backgroundColor: 'white',
                borderRadius: 30,
              }}>
              <TextInput
                style={{
                  marginRight: 45,
                  marginLeft: 20,
                }}
                autoFocus={true}
                onChangeText={(productName) => this.setState({productName})}
              />

              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: 'orange',
                  position: 'absolute',
                  right: 0,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                  <Icon
                    style={{}}
                    name="md-search"
                    size={30}
                    onPress={() => this.makeRemoteRequest()}
                  />
                </TouchableOpacity>
              </View>
            </View>
          }
        />

        <FlatList
          data={this.state.data}
          renderItem={({item}) => (
            <View>
              {/* <ListItem title={`${item.title} `} subtitle={item.price} /> */}
              <FeaturedProducts
                data={this.state.data}
                navigation={this.state.navigation}
                item={item}
              />
            </View>
          )}
          keyExtractor={(item) => String(item.id)}
          ListFooterComponent={this._renderFooter}
          numColumns={2}
          onEndReached={this._handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
    );
  }
}

export default Search;
