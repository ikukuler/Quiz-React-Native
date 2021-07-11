import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffe3d5',
		textAlign: 'center',
		justifyContent: 'center',
		paddingBottom: 15,
		paddingRight: 30,
		paddingLeft: 30 
	},
	row: {
		justifyContent: 'space-between',
		flexDirection: 'row',
    	marginVertical: 8,
    	marginHorizontal: 16,
	},
	heading: {
		marginTop: 10,
		marginBottom: 10,
		fontSize: 30
	},
	badge: {
		backgroundColor: 'tomato',
		padding: 10
	},
	paragraph: {
		marginBottom: 10
	},
	item: {
		backgroundColor: '#f9c2ff',
    	marginVertical: 8,
    	marginHorizontal: 16,
	}
});

export default Styles;