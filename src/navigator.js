import { Platform } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";

import HomeTab from "./Components/AppTabNavigator/HomeTab";
import SearchTab from "./Components/AppTabNavigator/SearchTab";
import AddMediaTab from "./Components/AppTabNavigator/AddMediaTab";
import LikesTab from "./Components/AppTabNavigator/LikesTab";
import ProfileTab from "./Components/AppTabNavigator/ProfileTab";
import BidSelection from "./Components/AuctionComponents/bidSelection";
import Notifications from "./Components/Notifications";
import ProductOverview from "./Components/AuctionComponents/productOverview";

import LandingScreen from "./Containers/Landing";
import LoginScreen from "./Containers/Login";
import SignUpScreen from "./Containers/SignUp";

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
    LikesTab: {
      screen: LikesTab
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
  Home: {
    screen: AppTabNavigator
  },
  Notifications: {
    screen: Notifications
  },
  ProductOverview: {
    screen: ProductOverview
  }
});

export default AppNavigator;
