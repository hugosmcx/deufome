import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class ShoppingLocalizacao extends Component {
	constructor(props){
		super(props);
	}

	estilos = StyleSheet.create({
		principal: {
			borderBottomWidth: 1,
			borderBottomColor: "#CCC",
			padding: 10
		},
		botao: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'flex-start'
		},
		imagem: {
			width: 35,
			height: 35,
			marginRight: 8
		},
		texto1: {
			fontSize: 20,
			color: '#000'
		},
		texto2: {
			fontSize: 15,
			color: '#F00'
		}
	});

	render(){
		return (
			<View style={this.estilos.principal}>
				<TouchableOpacity style={this.estilos.botao} onPress={ () => this.props.navigation.push('AlterarLocalizacao') }>
					<View>
						<Image style={this.estilos.imagem} source={ require('../../imagens/location.png') }/>
					</View>
					<View>
						<Text style={this.estilos.texto1}>{this.props.cidade}</Text>
						<Text style={this.estilos.texto2}>Alterar localização</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	};
}