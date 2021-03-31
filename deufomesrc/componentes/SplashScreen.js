import React, { Component } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';

export default class SplashScreen extends Component {
	
	constructor(props){
		super(props);
	}

	estilos = StyleSheet.create({
		principal: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#FFF'
		}
	});

	chamaTela(objeto){
		if(objeto.Status == 'OK'){
			this.props.navigation.navigate('Shopping');
		}else if(objeto.Status == 'LOGIN'){
			this.props.navigation.navigate('Login');
		}else{
			Alert.alert('Serviço Indisponível');
			console.log(objeto);
		}
	}

	componentDidMount(){
		/*
		fetch('http://10.2.25.218/deufome/api/esta-logado.php')
      	.then((response) => response.json())
    	.then((objeto) => { this.chamaTela(objeto) })
      	.catch((erro) => {
			console.log(erro);
			Alert.alert('Serviço Indisponível\n');
		  });
		*/
		this.chamaTela({Status : "LOGIN"});
	}

	render(){
		return (
			<View style={this.estilos.principal}>
				<StatusBar backgroundColor="#000"/>
				<Image source={ require('../imagens/logo.png') }/>
			</View>
		);
	}

}