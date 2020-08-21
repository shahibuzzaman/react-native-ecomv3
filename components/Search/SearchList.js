import React, {useState} from 'react';
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

const {width} = Dimensions.get('window');

const SearchScreen = ({navigation}) => {
  const [value, setValue] = useState('');
  const [productData, setProductData] = useState('');

  const fetchData = () => {
    fetch(
      `https://malamalexpress.com/wp-json/wc/v3/products?search=${value}&consumer_key=ck_af6dae0d921e12528b92964fb526317370642ec1&consumer_secret=cs_d172a15e6fa946ccc01890ca6adec67e3724e667`,
    )
      .then((response) => response.json())
      .then((json) => setProductData(json))
      .catch((error) => console.error(error))
      .finally();
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        statusBarProps={{
          barStyle: 'light-content',
          translucent: true,
          backgroundColor: 'green',
        }}
        backgroundColor="green">
        <View></View>
        <Icon
          style={{marginLeft: 10}}
          name="ios-arrow-back"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <View
          style={{
            width: width * 0.7,
            height: 40,
            backgroundColor: 'white',
            marginRight: 40,
            borderRadius: 30,
          }}>
          <TextInput
            style={{
              marginRight: 45,
              marginLeft: 20,
            }}
            value={value}
            autoFocus={true}
            onChangeText={(text) => setValue(text)}
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
                onPress={() => fetchData()}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Header>
      <FlatList
        data={productData}
        renderItem={({item}) => (
          <View>
            {/* <ListItem title={`${item.title} `} subtitle={item.price} /> */}
            <FeaturedProducts
              data={productData}
              navigation={navigation}
              item={item}
            />
          </View>
        )}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
      />
    </View>
  );
};

export default SearchScreen;
