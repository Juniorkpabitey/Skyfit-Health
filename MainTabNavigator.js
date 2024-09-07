// MainTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Dashboard from './components/screens/Dashboard';
import Appointment from './components/screens/Appointment';
import GeminiChat from './components/screens/GeminiChat';
import Message from './components/screens/Message';
import ChatSession from './components/screens/ChatSession';
import Mother from './components/screens/Mother';
import Baby from './components/screens/Baby';
import MapScreen from './components/screens/MapScreen';
import Profile from './components/screens/Profile'; // Import your ProfileScreen

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MessageStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Message" component={Message} options={{ headerShown: false }} />
      <Stack.Screen name="ChatSession" component={ChatSession} options={{ headerShown: false }} />
      <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function DashboardStack({ route }) {
  const { email, firstName } = route.params;
  
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Dashboard" 
        component={Dashboard} 
        options={{ headerShown: false }} 
        initialParams={{ email, firstName }} 
      />
      <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

const CustomTabBarIcon = ({ name, focused }) => {
  return (
    <View style={[styles.iconContainer, focused && styles.focusedIconContainer]}>
      <Icon name={name} size={20} color={focused ? '#C5314E' : '#666'} />
    </View>
  );
};

export default function MainTabNavigator({ route }) {
  const { email, firstName } = route.params;

  return (
    <Tab.Navigator
      initialRouteName="DashboardStack"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          switch (route.name) {
            case 'DashboardStack':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Mother':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Baby':
              iconName = focused ? 'happy' : 'happy-outline';
              break;
            case 'Appointment':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'Chat':
              iconName = focused ? 'chatbubble' : 'chatbubble-outline';
              break;
            case 'Lets talk':
              iconName = focused ? 'headset' : 'headset-outline';
              break;
            default:
              iconName = 'circle';
              break;
          }

          return <CustomTabBarIcon name={iconName} focused={focused} />;
        },
        tabBarLabel: ({ focused, color }) => {
          let label;
          switch (route.name) {
            case 'DashboardStack':
              label = 'Home';
              break;
            case 'Mother':
              label = 'Mother';
              break;
            case 'Baby':
              label = 'Baby';
              break;
            case 'Appointment':
              label = 'Booking';
              break;
            case 'Chat':
              label = 'Chat';
              break;
            case 'Lets talk':
              label = 'Lets talk';
              break;
            default:
              label = 'Unknown';
          }

          return <Text style={{ color, fontSize: 12 }}>{label}</Text>;
        },
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#C5314E',
        tabBarInactiveTintColor: '#666',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="DashboardStack" 
        component={DashboardStack} 
        initialParams={{ email, firstName }} 
      />
      <Tab.Screen name="Mother" component={Mother} />
      <Tab.Screen name="Baby" component={Baby} />
      <Tab.Screen name="Appointment" component={Appointment} />
      <Tab.Screen name="Chat" component={MessageStack} />
      <Tab.Screen name="Lets talk" component={GeminiChat} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    elevation: 0,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  focusedIconContainer: {
    backgroundColor: '#f0f0f0',
  },
});
