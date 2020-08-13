import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './components/screens/HomeScreen';
import SplashScreen from './components/screens/SplashScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import NotificationScreen from './components/screens/NotificationScreen';
import CartScreen from './components/screens/CartScreen';
import AuthAndInfo from './components/screens/AuthAndInfo';
import ProductsScreen from './components/ProductsScreen';
import ProductDetails from './components/ProductDetails';
import CartIconBadge from './components/CartIconBadge';
import SubCategories from './components/screens/SubCategories';

import ShoppingCartIcon from './components/ShoppingCartIcon';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import SearchBar from './components/SearchBar';
import SearchBarProducts from './components/SearchBarProducts';
import SearchList from './components/Search/SearchList';
import SearchListHeader from './components/SearchListHeader';

const HomeStack = createStackNavigator();

const LogoTitle = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '115%',
      }}>
      <Image
        style={{
          width: 100,
          height: 50,
        }}
        resizeMode="contain"
        source={require('./components/assets/logo.png')}
      />
    </View>
  );
};

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3c8f2e',
        },

        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      {/* <HomeStack.Screen
        name="Splash"
        component={SplashScreen}
        options={({navigation}) => ({
          title: '',
          headerShown: false,
        })}
      /> */}

      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleStyle: {flex: 1, textAlign: 'center'},
          headerRight: () => <SearchBar navigation={navigation} />,
        })}
      />
      <HomeStack.Screen
        name="Products"
        component={ProductsScreen}
        options={({navigation}) => ({
          title: '',
          headerShown: false,
        })}
      />

      <HomeStack.Screen
        name="SubCategories"
        component={SubCategories}
        options={({navigation}) => ({
          title: 'Sub Categories',
          headerShown: true,
        })}
      />

      <HomeStack.Screen name="Product Details" component={ProductDetails} />
      <HomeStack.Screen
        name="Search"
        component={SearchList}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
    </HomeStack.Navigator>
  );
};

const OrderHistoryStack = createStackNavigator();

const NotificationStackScreen = () => {
  return (
    <OrderHistoryStack.Navigator>
      <OrderHistoryStack.Screen
        name="Order History"
        component={NotificationScreen}
      />
    </OrderHistoryStack.Navigator>
  );
};

const CartStack = createStackNavigator();

const CartStackScreen = () => {
  return (
    <CartStack.Navigator>
      <CartStack.Screen name="Cart" component={CartScreen} />
      <CartStack.Screen name="AuthAndInfo" component={AuthAndInfo} />
    </CartStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const App = () => {
  const state = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  return (
    <Provider store={state}>
      <StatusBar barStyle="light-content" backgroundColor="#3c8f2e" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              if (route.name === 'Home') {
                return (
                  <Icon
                    name={focused ? 'ios-home' : 'ios-home'}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Order History') {
                return (
                  <Icon
                    name={focused ? 'md-list' : 'md-list'}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Cart') {
                return (
                  <ShoppingCartIcon
                    name={focused ? 'md-cart' : 'md-cart'}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Profile') {
                return (
                  <Icon
                    name={focused ? 'md-contact' : 'md-contact'}
                    size={size}
                    color={color}
                  />
                );
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: '#3c8f2e',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen
            name="Order History"
            component={NotificationStackScreen}
          />
          <Tab.Screen name="Cart" component={CartStackScreen} />
          <Tab.Screen name="Profile" component={ProfileStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
