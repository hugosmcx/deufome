import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class ShoppingNotPedido extends Component {
	constructor(props){
		super(props);
	}

	estilos = StyleSheet.create({
		principal: {
			margin: 5,
			borderWidth: 1,
			borderColor: '#7d1538',
			borderRadius: 5,
			padding: 5
		},
		botao: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
		},
		imagem: {
			width: 25,
			height: 25,
			marginRight: 20
		}
	});

	render(){
		if(1 == 1){
			return (
				<View style={this.estilos.principal}>
					<TouchableOpacity style={this.estilos.botao}>
						<Image style={this.estilos.imagem} source={ require('../imagens/icone.png') }/>
						<Text>Acompanhe seu pedido</Text>
					</TouchableOpacity>
				</View>
			);
		}else{
			return false;
		}
	};
}