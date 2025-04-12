import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Intro1 from './Screen/Intro/IntroScreen1';
import Intro2 from './Screen/Intro/IntroScreen2';
import Intro3 from './Screen/Intro/IntroScreen3';

import Login from './Screen/Login/Login';
import SignUp from './Screen/SignUp/SignUp';
import RoleSelection from './Screen/RoleSelection/RoleSelection';

import WorkingHours from './Screen/WorkingHours/WorkingHours';
import ProfilePicture from './Screen/ProfilePicture/ProfilePicture';

import Home from './Screen/Home/Home';

import Profile from './Screen/Profile/Profile';
import Garage from './Screen/Garage/Garage';
import EditProfile from './Screen/EditProfile/EditProfile';


const Stack = createStackNavigator();
const RootStack = createStackNavigator();

function IntroNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="Intro1">
        {props => <Intro1 {...props} activeDotIndex={1} />}
      </Stack.Screen>
      <Stack.Screen name="Intro2">
        {props => <Intro2 {...props} activeDotIndex={2} />}
      </Stack.Screen>
      <Stack.Screen name="Intro3">
        {props => <Intro3 {...props} activeDotIndex={3} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function RegNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="RoleSelection" component={RoleSelection} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="WorkingHours" component={WorkingHours} />
      <Stack.Screen name="ProfilePicture" component={ProfilePicture} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}


function ProfileNavigator() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="Garage"
        component={Garage}
      />
       <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
      />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }} >
        {/* Profile Screens*/}
        <RootStack.Screen
          name="ProfileFlow"
          component={ProfileNavigator}
          
        />

        {/* Intro Screens */}
        <RootStack.Screen
          name="IntroFlow"
          component={IntroNavigator}
        />

        {/* Registration Screens */}
        <RootStack.Screen
          name="RegFlow"
          component={RegNavigator}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
