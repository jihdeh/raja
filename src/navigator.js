import { Platform } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";

import HomeTab from "./Components/AppTabNavigator/HomeTab";
import SearchTab from "./Components/AppTabNavigator/SearchTab";
import AddMediaTab from "./Components/AppTabNavigator/AddMediaTab";
import NotificationsTab from "./Components/AppTabNavigator/NotificationsTab";
import ProfileTab from "./Components/AppTabNavigator/ProfileTab";
import BidSelection from "./Components/AuctionComponents/bidSelection";
import ProductOverview from "./Components/AuctionComponents/productOverview";
import EditProfile from "./Components/SettingsComponents/editProfile";
import UpdatePassword from "./Components/SettingsComponents/updatePassword";
import UpdateAddress from "./Components/SettingsComponents/updateAddress";
import AddAddress from "./Components/SettingsComponents/addAddress";

import ProductInfo from "./Components/HomeComponents/ProductInfo";

import LandingScreen from "./Containers/Landing";
import BookmarkScreen from "./Containers/Bookmarks";
import LoginScreen from "./Containers/Login";
import SignUpScreen from "./Containers/SignUp";
import ChatListScreen from './Containers/ChatList'
import ChatDetailScreen from './Containers/ChatDetail'
import SettingsScreen from "./Containers/Settings";
import CartScreen from "./Containers/Cart";
import WalletScreen from "./Containers/Wallet";
import RecommendedScreen from "./Containers/Recommended";
import CheckoutScreen from "./Containers/Checkout";
import AddressScreen from "./Containers/Address";
import OrderHistoryScreen from "./Containers/OrderHistory";
import OrderHistoryDetailScreen from "./Containers/OrderHistoryDetails";
import FollowersScreen from "./Containers/Followers";

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
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        ...Platform.select({
          android: {
            backgroundColor: "white"
          }
        })
      },
      activeTintColor: "#000",
      inactiveTintColor: "#d1cece",
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
  ChatListScreen: { screen: ChatListScreen },
  ChatDetailScreen: { screen: ChatDetailScreen },
  SettingsScreen: { screen: SettingsScreen },
  WalletScreen: { screen: WalletScreen },
  RecommendedScreen: { screen: RecommendedScreen },
  CartScreen: { screen: CartScreen },
  CheckoutScreen: { screen: CheckoutScreen },
  AddressScreen: { screen: AddressScreen },
  OrderHistoryScreen: { screen: OrderHistoryScreen },
  OrderHistoryDetailScreen: { screen: OrderHistoryDetailScreen },
  FollowersScreen: { screen: FollowersScreen },
  EditProfile: { screen: EditProfile },
  UpdateAddress: { screen: UpdateAddress },
  AddAddress: { screen: AddAddress },
  UpdatePassword: { screen: UpdatePassword },
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
