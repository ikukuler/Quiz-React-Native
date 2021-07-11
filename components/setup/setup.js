import React, { useEffect, useState } from 'react';
import { View, Button, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'
import RadioForm from 'react-native-simple-radio-button'

import Styles from '../../styles';

const LEVELS = [
	{ label: 'Easy', value: 'easy'},
	{ label: 'Medium', value: 'medium'},
	{ label: 'Hard', value: 'hard'},
];

export default function Setup({ navigation, route }) {
	const [data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [category, setCategory] = useState(null);
	const [level, setLevel] = useState(null);
	const { token } = route.params;

	useEffect(() => {
		fetch('https://opentdb.com/api_category.php')
			.then(response => {
				if (!response.ok) {
					throw new Error(`Couldn't fetch data, received ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				setData(data.trivia_categories)
				setLoading(false)
			})
	}, [])

	const mapCategories = (category) => {
		return {
			label: category.name,
			value: category.id
		}
	}

	if (isLoading) {
		return (
			<View style={Styles.container}>
				<ActivityIndicator size="large" />
			</View>
		)
	}

	return (
		<View style={Styles.container}>
			<Text style={Styles.paragraph}>Select category</Text>
			<DropDownPicker
				items={data.map(mapCategories)}
				placeholder='Random'
				style={[Styles.paragraph, {zIndex: 5000}]}
				containerStyle={{height: 50}}
				dropDownStyle={{zIndex: 5000}}
				itemStyle={{
					justifyContent: 'flex-start'
				}}
				zIndex={3000}
				onChangeItem={(item) => setCategory(item.value)}
			/>
			<RadioForm
				radio_props={LEVELS}
				formHorizontal={true}
				style={[Styles.row, {zIndex: 0}]}
				buttonColor={'#2196f3'}
				initial={-1}
				onPress={(value) => setLevel(value)}
			/>

			<Button style={{margin: 30, zIndex: 0}} title='Play' onPress={() => navigation.navigate("Game", { level, category, token })} />
		</View>
	)
}