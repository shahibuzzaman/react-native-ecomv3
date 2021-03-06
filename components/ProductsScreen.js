import React, {Component} from 'react';

import {Button, Card, SearchBar, Header} from 'react-native-elements';
import SnackBar from 'react-native-snackbar-component';
import FeaturedProducts from '../components/screens/FeaturedProducts';
import {postCart} from '../actions';
import {connect} from 'react-redux';
import {
  Image,
  Dimensions,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import Products from './Products';
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';

class ProductsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      searchProduct: [],
      page: 1,
      error: null,
      loadingMore: false,
      productName: '',
      categorySlug: this.props.route.params.categorySlug,
      id: this.props.route.params.id,
      navigation: this.props.navigation,
    };

    // this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    // const url =
    //   'https://malamalexpress.com/wc-api/v3/products/?&filter[category]=' +
    //   this.state.id +
    //   '&consumer_key=ck_af6dae0d921e12528b92964fb526317370642ec1&consumer_secret=cs_d172a15e6fa946ccc01890ca6adec67e3724e667&per_page=100';

    const url = `https://malamalexpress.com/wp-json/wc/v3/products?category=${this.state.id}&page=${this.state.page}&consumer_key=ck_af6dae0d921e12528b92964fb526317370642ec1&consumer_secret=cs_d172a15e6fa946ccc01890ca6adec67e3724e667`;
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
        console.log('getting error');
        this.setState({error, loading: false});
      });
  };

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

  //search

  makeSearchRequest() {
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

  _handleSearchLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
        loadingMore: true,
      }),
      () => {
        this.makeSearchRequest();
      },
    );
  };

  _renderSearchFooter = () => {
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
    console.log('id ' + this.state.data[0]);
    console.log('heyt this is url', this.state.data);
    return (
      <View>
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
                    onPress={() => this.makeSearchRequest()}
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
                item={item}
                navigation={this.props.navigation}
                data={this.state.data}
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
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

export default connect(null, {postCart})(ProductsScreen);
