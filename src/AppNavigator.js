import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Splash from './screens/Splash'
import Home from './screens/Home'
import Search from './screens/Search'
import ViewPhoto from './screens/ViewPhoto'
import ViewVideo from './screens/ViewVideo'

const AppNavigator = () => {
const Stack=createStackNavigator();
return (
   <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Splash' component={Splash} options={{headerShown:false}}/>
            <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
            <Stack.Screen name='Search' component={Search} options={{headerShown:false}}/>
            <Stack.Screen name='Photo' component={ViewPhoto} options={{headerShown:false}}/>
            <Stack.Screen name='Video' component={ViewVideo} options={{headerShown:false}}/>    
        </Stack.Navigator>
   </NavigationContainer>
  )
}

export default AppNavigator;