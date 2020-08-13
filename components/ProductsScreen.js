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
      page: 1,
      error: null,
      loadingMore: false,
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

    const url =
      'https://malamalexpress.com/wp-json/wc/v3/products?category=' +
      this.state.id +
      '&consumer_key=ck_af6dae0d921e12528b92964fb526317370642ec1&consumer_secret=cs_d172a15e6fa946ccc01890ca6adec67e3724e667&page=' +
      this.state.page;
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
        this.arrayholder = this.state.data;
      })
      .catch((error) => {
        console.log('getting error');
        this.setState({error, loading: false});
      });
  };

  searchFilterFunction = (text) => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter((item) => {
      const itemData = `${item.name.toUpperCase()} `;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
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

  renderHeader = () => {
    return (
      <Header
        statusBarProps={{
          barStyle: 'light-content',
          translucent: true,
          backgroundColor: 'black',
        }}
        backgroundColor="#f5f5f5">
        <TouchableHighlight>
          <Icon
            style={{marginLeft: 10}}
            name="ios-arrow-back"
            size={30}
            onPress={() => this.state.navigation.goBack()}
          />
        </TouchableHighlight>
        <SearchBar
          containerStyle={
            Platform.OS === 'android'
              ? {flex: 1, justifyContent: 'center', height: 58, width: 300}
              : {flex: 1, justifyContent: 'center', height: 49}
          }
          placeholder="Type Here..."
          lightTheme
          clearIcon
          round
          onChangeText={(text) => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.value}
        />
      </Header>
    );
  };
  render() {
    console.log('id ' + this.state.data[0]);
    console.log('heyt this is url', this.state.data);
    return (
      <View>
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
          ListHeaderComponent={this.renderHeader}
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
