import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class BarraVoltar extends Component {
	constructor(props){
		super(props);
	}

	estilos = StyleSheet.create({
		principal: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
			alignItems: 'center'
		},
		botao: {
			padding: 5,
			alignItems: 'center',
			justifyContent: 'center'
		},
		imagem: {
			width: 35,
			height: 35,
			marginRight: 10
		},
		texto: {
			fontSize: 25,
			color: '#000'
		}
	});

	render(){
		return (
			<View style={this.estilos.principal}>
				<TouchableOpacity style={this.estilos.botao} onPress={() => this.props.navigation.goBack()}>
					<Image style={this.estilos.imagem} source={require('../../imagens/arrow_left.png')}/>
				</TouchableOpacity>
				<Text style={this.estilos.texto}>{this.props.texto}</Text>
			</View>
		);
	}
}