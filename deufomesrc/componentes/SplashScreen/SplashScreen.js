import React, {Component} from 'react';
import {View, StatusBar, Image} from 'react-native';

import {SuperHTTP} from '../Utils/SuperHTTP';

export default class SplashScreen extends Component {
	componentDidMount(){
		SuperHTTP(this.props.navigation, 'esta-logado.php', {})
		.then((ret) => {
			if(ret == "PASS"){
				this.props.navigation.navigate('Shopping', {rd_param : Math.random()});
			}
		})
		.catch((err) => console.log(err));
	}

	render(){
		return (
			<View style={{backgroundColor: '#FFFFFF', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<StatusBar backgroundColor="#000"/>
				<Image style={{width: 250, height: 250}} source={ require('./logo.png') }/>
			</View>
		);
	}
}