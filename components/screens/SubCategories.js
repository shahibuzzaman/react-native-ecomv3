import React, {Component} from 'react';
var {height, width} = Dimensions.get('window');
import {
  Image,
  Dimensions,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Card} from 'react-native-elements';
import {postCart} from '../../actions';
import {connect} from 'react-redux';
import FeaturedProducts from './FeaturedProducts';
import Icon from 'react-native-vector-icons/Ionicons';

class SubCategories extends Component {
  state = {
    loading: false,
    data: [],
    products: [],
    cat_id: this.props.route.params.id,
    navigation: this.props.navigation,
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const url =
      'https://malamalexpress.com/wp-json/wc/v3/products/categories?consumer_key=ck_af6dae0d921e12528b92964fb526317370642ec1&consumer_secret=cs_d172a15e6fa946ccc01890ca6adec67e3724e667&per_page=100';

    const featured_products_by_category =
      'https://malamalexpress.com/wp-json/wc/v3/products?category=' +
      this.state.cat_id +
      '&consumer_key=ck_af6dae0d921e12528b92964fb526317370642ec1&consumer_secret=cs_d172a15e6fa946ccc01890ca6adec67e3724e667';

    this.setState({loading: true});

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          data: res,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({error, loading: false});
      });

    fetch(featured_products_by_category)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          products: res,
          loading: false,
        });
      })
      .catch((error) => {});
  };

  render() {
    const _renderItemFood = ({item}) => {
      return (
        <View style={{marginTop: -35, marginLeft: 3.5}}>
          <TouchableOpacity
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              this.props.navigation.push('Product Details', {
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
                  // onPress={() => {
                  //   this.props.postCart(
                  //     this.state.cat_id,
                  //     this.state.data.title,
                  //     this.state.data.price,
                  //   );
                  // }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    };

    const renderItem = ({item}) => {
      // console.log('u ', item.parent);

      if (item.parent == this.state.cat_id) {
        return (
          <View style={{backgroundColor: 'white'}}>
            <TouchableOpacity
              style={[styles.divCategorie]}
              onPress={() => {
                // console.log(item.slug, myMap.has(item.id))

                this.state.navigation.navigate('Products', {
                  categorySlug: item.slug,
                  id: item.id,
                });
              }}>
              <View
                style={{
                  height: 84,
                  width: 84,
                  borderRadius: 42,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 10,
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
                  marginLeft: 10,
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          </View>
        );
      }
    };

    const keyExtractor = (item) => String(item.id);

    return (
      // <View style={{ flex: 1, backgroundColor: 'white' }}>
      //     <View style={{ padding: 10 }}>
      //         {this.state.loading && this.state.data.length == 0 ? (
      //             <ActivityIndicator />
      //         ) : (
      //                 <FlatList
      //                     data={this.state.data}
      //                     renderItem={renderItem}
      //                     keyExtractor={keyExtractor}
      //                     numColumns={3}
      //                 />
      //             )}
      //     </View>
      // </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            width: width,
            backgroundColor: 'white',
          }}>
          <FlatList
            horizontal={true}
            data={this.state.data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />

          <FlatList
            data={this.state.products}
            numColumns={2}
            renderItem={({item}) => (
              <View>
                {/* <ListItem title={`${item.title} `} subtitle={item.price} /> */}
                <FeaturedProducts
                  item={item}
                  navigation={this.props.navigation}
                  data={this.state.products}
                />
              </View>
            )}
            keyExtractor={keyExtractor}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  divCategorie: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 10,
    padding: 10,
  },
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

export default SubCategories;
