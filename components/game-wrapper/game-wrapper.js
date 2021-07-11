import React, { useEffect, useState } from 'react'
import { View, Text, Button, ActivityIndicator } from 'react-native'

import Question from '../question'

import Styles from '../../styles/'

const GameWrapper = ({ navigation, route }) => {
	const { level, category, token } = route.params;

	const [items, setItems] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [page, setPage] = useState(0);
	const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
	const [isNextDisabled, setNextDisabled] = useState(true);
	const [isItemsDisabled, setItemsDisabled] = useState(false);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [results, setResult] = useState(0);

	useEffect(() => {
		let urlString = 'https://opentdb.com/api.php?amount=10';

        if (token) {
            urlString += `&token=${token}`;
        }
        if (category) {
            urlString += `&category=${category}`;
        } 
        if (level) {
            urlString += `&difficulty=${level}`
        }

		fetch(urlString)
			.then(response => {
				if (!response.ok) {
					throw new Error(`Couldn't fetch data, received ${response.status}`);
				}
				return response.json();
			})
			.then(data => {
				setItems(data.results)
				setLoading(false)
			})
	}, []);

	const onItemPress = (answer, correctAnswer) => {
		setSelectedAnswer(answer)
		setShowCorrectAnswer(true);
		setNextDisabled(false);
		setItemsDisabled(true);

		if (answer === correctAnswer) {
			setResult(prev => prev + 1)
		}
	}

	const onPressNext = () => {
		setShowCorrectAnswer(false);
		setPage(state => state + 1)
		setNextDisabled(true)
		setItemsDisabled(false);
	}

	if (isLoading) {
		return (
			<View style={Styles.container}>
				<ActivityIndicator size="large" />
			</View>
		)
	}

	if (page === items.length) {
		return (
			<View style={Styles.container}>
				<Text style={Styles.heading}>You've finished</Text>
				<Button title="Results" onPress={() => navigation.navigate('Result', { results })} />
			</View>
		)
	}

	return (
		<View style={Styles.container}>
			<Question question={items[page]}
				onItemPress={onItemPress}
				selectedAnswer={selectedAnswer}
				showCorrectAnswer={showCorrectAnswer}
				isItemsDisabled={isItemsDisabled}/>
			<Button title="Next" onPress={onPressNext} disabled={isNextDisabled} />
		</View>
	)
}

export default GameWrapper;