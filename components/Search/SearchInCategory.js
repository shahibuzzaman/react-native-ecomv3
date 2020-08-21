import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator, Keyboard} from 'react-native';
import {ListItem, SearchBar, Header} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import FeaturedProducts from '../screens/FeaturedProducts';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

class FlatListDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,

      navigation: this.props.navigation,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const url = `https://malamalexpress.com/wp-json/wc/v3/products?filter[limit]=-1&consumer_key=ck_af6dae0d921e12528b92964fb526317370642ec1&consumer_secret=cs_d172a15e6fa946ccc01890ca6adec67e3724e667`;
    this.setState({loading: true});

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          data: res,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res;
      })
      .catch((error) => {
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

  renderHeader = () => {
    return (
      <Header
        statusBarProps={{
          barStyle: 'light-content',
          translucent: true,
          backgroundColor: 'black',
        }}
        backgroundColor="#f5f5f5">
        <Icon
          style={{marginLeft: 10}}
          name="ios-arrow-back"
          size={30}
          onPress={() => this.state.navigation.goBack()}
        />
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
          autoFocus={true}
          onChangeText={(text) => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.value}
        />
      </Header>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          style={{
            backgroundColor: this.state.searchBarFocused
              ? 'rgba(0,0,0,0.3)'
              : 'white',
          }}
          data={this.state.data}
          renderItem={({item}) => (
            <View>
              {/* <ListItem title={`${item.title} `} subtitle={item.price} /> */}
              <FeaturedProducts
                item={item}
                navigation={this.state.navigation}
                data={this.state.data}
              />
            </View>
          )}
          keyExtractor={(item) => String(item.id)}
          ListHeaderComponent={this.renderHeader}
          numColumns={2}
        />
      </View>
    );
  }
}

export default FlatListDemo;
