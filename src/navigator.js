import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import HomeTab from './Components/AppTabNavigator/HomeTab';
import SearchTab from './Components/AppTabNavigator/SearchTab';
import AddMediaTab from './Components/AppTabNavigator/AddMediaTab';
import NotificationsTab from './Components/AppTabNavigator/NotificationsTab';
import ProfileTab from './Components/AppTabNavigator/ProfileTab';
import BidSelection from './Components/AuctionComponents/bidSelection';
import ProductOverview from './Components/AuctionComponents/productOverview';

import ProductInfo from './Components/HomeComponents/ProductInfo';

import LandingScreen from './Containers/Landing';
import BookmarkScreen from './Containers/Bookmarks';
import LoginScreen from './Containers/Login';
import SignUpScreen from './Containers/SignUp';
import SettingsScreen from './Containers/Settings';
import CartScreen from './Containers/Cart';
import CheckoutScreen from './Containers/Checkout';
import AddressScreen from './Containers/Address';

const AppTabNavigator = TabNavigator(
  {
    HomeTab: {
      screen: HomeTab
    },
    SearchTab: {
      screen: SearchTab
    },
    AddMediaTab: {
      screen: AddMediaTab
    },
    NotificationsTab: {
      screen: NotificationsTab
    },
    ProfileTab: {
      screen: ProfileTab
    }
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        ...Platform.select({
          android: {
            backgroundColor: 'white'
          }
        })
      },
      activeTintColor: '#000',
      inactiveTintColor: '#d1cece',
      showLabel: false,
      showIcon: true
    }
  }
);

const AppNavigator = StackNavigator({
  Landing: { screen: LandingScreen },
  Login: { screen: LoginScreen },
  SignUp: { screen: SignUpScreen },
  BidSelection: { screen: BidSelection },
  BookmarkScreen: { screen: BookmarkScreen },
  SettingsScreen: { screen: SettingsScreen },
  CartScreen: { screen: CartScreen },
  CheckoutScreen: { screen: CheckoutScreen },
  AddressScreen: { screen: AddressScreen },
  Home: {
    screen: AppTabNavigator
  },
  ProductOverview: {
    screen: ProductOverview
  },
  ProductInfo: {
    screen: ProductInfo
  }
});

export default AppNavigator;
