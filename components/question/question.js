import React, { useEffect, useState, useMemo } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'

import Styles from '../../styles/'

import { decode } from 'html-entities'

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function useLevelColor(level) {
	if (level === 'easy') {
		return '#93e1ab'
	} else if (level === 'hard') {
		return '#ff5c5c'
	}
	return '#ffa75c';
}

const Item = ({ answer, bgColor, onItemPress, isItemsDisabled }) => {

	const style = {
		backgroundColor: bgColor,
    	padding: 10,
    	marginVertical: 8,
    	marginHorizontal: 16,
	}
	return <View style={style}>
		<TouchableOpacity style={Styles.heading} onPress={() => onItemPress(answer)} disabled={isItemsDisabled}>
			<Text>{decode(answer)}</Text>
		</TouchableOpacity>
	</View>
};

const Question = ({ question, showCorrectAnswer, selectedAnswer, onItemPress, isItemsDisabled }) => {
	const { correct_answer, difficulty, category, incorrect_answers } = question;
	const allAnswers = useMemo(() => shuffle([correct_answer, ...incorrect_answers]), [correct_answer, incorrect_answers]);
	const levelColor = useLevelColor(difficulty)

	const renderItem = ({ item }) => {
		let bgColor;
		const isCorrectAnswerSelected = selectedAnswer === correct_answer;
		const isCorrectAnswerHighlighted = correct_answer === item && showCorrectAnswer;
		if ((isCorrectAnswerSelected && selectedAnswer === item) || isCorrectAnswerHighlighted) {
			bgColor = '#89cf2d';
		} else if (!isCorrectAnswerSelected && selectedAnswer === item) {
			bgColor = '#f2435b';
		} else {
			bgColor = '#f9c2ff';
		}
		return <Item answer={item}
			bgColor={bgColor}
			onItemPress={() => onItemPress(item, correct_answer)}
			selectedAnswer={selectedAnswer}
			isItemsDisabled={isItemsDisabled} />
	}

	return (
		<View>
			<View style={Styles.row}>
				<View style={{color: '#fff', backgroundColor: levelColor, padding: 10}}>
					<Text>{difficulty}</Text>
				</View>
				<View style={Styles.badge}>
					<Text>{category}</Text>
				</View>
			</View>
			<Text style={Styles.heading}>{decode(question.question)}</Text>
			<FlatList
				data={allAnswers}
				renderItem={renderItem}
				extraData={selectedAnswer}
				keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	)
}

export default Question;