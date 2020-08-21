import React, {useState, useEffect} from 'react';
var {height, width} = Dimensions.get('window');

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import SearchBarr from '../SearchBar';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button, Card, SearchBar} from 'react-native-elements';
import FeaturedProductsHome from './FeaturedProductsHome';

import Carousel from './Carousel';

const categoryImage = [];

const HomeScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const [productsFirstPage, setProductsFirstPage] = useState([]);
  // const [myMap, setMyMap] = useState(new Map());

  const api =
    'https://malamalexpress.com/wp-json/wc/v3/products/categories?per_page=100&consumer_key=ck_af6dae0d921e12528b92964fb526317370642ec1&consumer_secret=cs_d172a15e6fa946ccc01890ca6adec67e3724e667';

  const api_banner = 'http://tutofox.com/foodapp/api.json';

  const api_products_first_page =
    'https://malamalexpress.com/wp-json/wc/v3/products?featured=true&consumer_key=ck_af6dae0d921e12528b92964fb526317370642ec1&consumer_secret=cs_d172a15e6fa946ccc01890ca6adec67e3724e667';

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((json) => setCategories(json))
      .catch((error) => console.error(error))
      .finally();

    fetch(api_banner)
      .then((response) => response.json())
      .then((json) => setBannerData(json.banner))
      .catch((error) => console.error(error))
      .finally();

    fetch(api_products_first_page)
      .then((response) => response.json())
      .then((json) => setProductsFirstPage(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    console.log(api);
  }, []);

  var myMap = new Map();

  categories.map((item) => {
    if (item.parent != 0) {
      myMap.set(item.parent, true);
    }
  });

  const renderItem = ({item, index}) => {
    if (item.parent == 0 && item.image != null) {
      return (
        <TouchableOpacity
          style={[styles.divCategorie]}
          onPress={() => {
            console.log(item.slug, myMap.has(item.id));
            if (myMap.has(item.id)) {
              navigation.navigate('SubCategories', {
                categorySlug: item.slug,
                id: item.id,
              });
            } else {
              navigation.navigate('Products', {
                categorySlug: item.slug,
                id: item.id,
              });
            }
          }}>
          <View
            style={{
              height: 84,
              width: 84,
              borderRadius: 42,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 20,
              backgroundColor: '#3c8f2e',
            }}>
            <Image
              style={{height: 80, width: 80, borderRadius: 40}}
              source={{
                uri: item.image.src,
              }}
            />
          </View>
          <Text
            style={{
              width: 80,
              textAlign: 'center',
              marginLeft: 20,
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const _renderItemFood = ({item}) => {
    return (
      <View style={{marginLeft: 2, marginRight: 2}}>
        <TouchableOpacity
          onPress={() => {
            navigation.push('Product Details', {
              itemId: item.id,
              otherParam: 'anything you want here',
            });
          }}
          style={styles.divFood}>
          <Image
            style={styles.imageFood}
            resizeMode="contain"
            source={{uri: item.images[0].src}}
          />

          <Text
            style={{
              fontSize: 15,
              padding: 10,
              textAlign: 'center',
              height: '30%',
            }}>
            {item.name}
          </Text>

          <View style={{height: '20%', flex: 1, flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 18,
                color: 'green',
                marginLeft: '30%',
              }}>
              {item.price} ৳
            </Text>

            <View style={{marginLeft: '10%'}}>
              <Button
                title=""
                icon={<Icon name="md-add" size={20} color="white" />}
                buttonStyle={{backgroundColor: 'green'}}
                color="green"
                onPress={() => Alert.alert('Simple Button pressed')}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const keyExtractor = (item) => String(item.id);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{height: 240, marginBottom: 15}}>
          <Carousel />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 10,
            marginBottom: 10,
          }}>
          Categories
        </Text>
      </View>
      <View style={{}}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={categories}
          horizontal={true}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 10,
            marginTop: 20,
          }}>
          Featured Products
        </Text>

        <FlatList
          data={productsFirstPage}
          numColumns={2}
          renderItem={({item}) => (
            <View>
              {/* <ListItem title={`${item.title} `} subtitle={item.price} /> */}

              <FeaturedProductsHome
                item={item}
                navigation={navigation}
                data={productsFirstPage}
              />
            </View>
          )}
          keyExtractor={keyExtractor}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  divCategorie: {},
  titleCatg: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
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
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    backgroundColor: 'white',
  },
});

export default HomeScreen;
