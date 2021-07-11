import React from 'react';
import { View, Text, Button } from 'react-native';

import Styles from '../../styles/';

const Result = ({ route, navigation }) => {
	const { results } = route.params;
	return (
		<View style={Styles.container}>
			<Text style={Styles.heading}>Total correct answers: {results}</Text>
			<Button title="Play again?" onPress={() => navigation.navigate("Welcome")} />
		</View>
	)
}

export default Result;