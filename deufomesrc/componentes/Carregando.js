import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

export default class Carregando extends Component {

	estilos = StyleSheet.create({
		principal: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#FFF'
		},
		texto: {
			fontSize: 20,
			color: '#000'
		}
	});

	render(){
		return (
			<View style={this.estilos.principal}>
				<Text style={this.estilos.texto}>Aguarde...</Text>
			</View>
		);
	}

}