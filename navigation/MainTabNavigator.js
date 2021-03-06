import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

import EditProfileScreen from '../screens/EditProfileScreen'
import CountryScreen from '../screens/CountryScreen'
import FeedScreen from '../screens/FeedScreen'
import ProfileScreen from '../screens/ProfileScreen'
import PostScreen from '../screens/PostScreen'
import SearchScreen from '../screens/SearchScreen'
import TabBarIcon from '../components/TabBarIcon'
import TripReportScreen from '../screens/TripReportScreen'

const FeedStack = createStackNavigator({
  Feed: FeedScreen,
  TripReport: TripReportScreen,
  Post: PostScreen,
  Country: CountryScreen,
})

FeedStack.navigationOptions = {
  tabBarLabel: 'Feed',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
    />
  ),
}

const SearchStack = createStackNavigator({
  Search: SearchScreen,
  Country: CountryScreen,
})

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
    />
  ),
}

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  EditProfile: EditProfileScreen,
  TripReport: TripReportScreen,
  Post: PostScreen,
  Country: CountryScreen,
})

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
}

export default createBottomTabNavigator({
  FeedStack,
  SearchStack,
  ProfileStack,
})
