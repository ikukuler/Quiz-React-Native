import React, { useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from './components/welcome';
import Setup from './components/setup';
import GameWrapper from './components/game-wrapper'
import Result from './components/result'
import { View, Text } from 'react-native';

import Styles from './styles';

const Stack = createStackNavigator();

export default function App() {

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Welcome" component={Welcome} />
				<Stack.Screen name="Setup" component={Setup} />
				<Stack.Screen name="Game" component={GameWrapper} />
				<Stack.Screen name="Result" component={Result} />
			</Stack.Navigator>
		</NavigationContainer>
  );
}
