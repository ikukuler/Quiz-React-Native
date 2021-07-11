import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';

import Styles from "../../styles";

export default function Welcome({ navigation }) {
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch('https://opentdb.com/api_token.php?command=request')
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Couldn't fetch data, received ${response.status}`);
				}
				return response.json();
			})
			.then((response) => {
				if (response.response_code !== 0) {
					throw new Error(response.message);
				}
				setLoading(false)
				setToken(response.token);
			});
	}, [])

	if (loading) return (
		<View style={Styles.container}>
			<ActivityIndicator size="large" />
	  	</View>
	)
	return (
		<View style={Styles.container}>
			<Text style={Styles.heading}>Quiz, quiz, quiz!</Text>
			<Text style={Styles.paragraph}>Are you smart enough, MF?</Text>
		 	<Button title='Start' onPress={() => navigation.navigate("Setup", { token })} />
		</View>
	)
}