import React, {Component} from 'react';
import {View, StatusBar, Image, TouchableOpacity, Text} from 'react-native';

import {SuperHTTP} from '../Utils/SuperHTTP';
import {EstiloBase} from '../Estilos/EstiloBase';

export default class SplashScreen extends Component {
	componentDidMount(){
		SuperHTTP(this.props.navigation, 'esta-logado.php', {})
		.then((ret) => {
			if(ret == "PASS"){
				this.props.navigation.push('Shopping');
			}
		})
		.catch((err) => console.log(err));
	}

	continuar(){
		this.props.navigation.push('Shopping');
	}

	render(){
		return (
			<View style={{backgroundColor: '#FFF', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<StatusBar backgroundColor="#000"/>
				<View>
					<Image style={{width: 250, height: 250}} source={ require('./logo.png') }/>
				</View>
				<View style={{margin: 10, position: 'absolute', bottom: 0, left: 0, right: 0}}>
					<TouchableOpacity style={[EstiloBase.botao]} onPress={() => this.continuar()}>
						<Text style={[EstiloBase.botaoTexto]}>Continuar</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}