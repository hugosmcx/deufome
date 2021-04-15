import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default class ShoppingFooterMenu extends Component {
	constructor(props){
		super(props);
	}

	estilos = StyleSheet.create({
		principal: {
			borderTopColor: '#CCC',
			borderTopWidth: 1,
			padding: 5,
			flexDirection: 'row'
		},
		botoes: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		botao: {
			borderRadius: 20,
			backgroundColor: '#FFF',
			//borderColor: '#F9C3A2',
			borderColor: '#CCC',
			borderWidth: 1,
			padding: 10,
			justifyContent: 'center',
			alignItems: 'center'
		},
		imagembotao: {
			width: 25,
			height: 25
		}
	});

	render(){
		return (
			<View style={this.estilos.principal}>
				<View style={this.estilos.botoes}>
					<TouchableOpacity style={this.estilos.botao} onPress={ () => this.props.navigation.push("Shopping", {rd_param : Math.random()})}>
						<Image style={this.estilos.imagembotao} source={ require('../../imagens/menu_home.png') }/>
					</TouchableOpacity>
				</View>
				<View style={this.estilos.botoes}>
					<TouchableOpacity style={this.estilos.botao}>
						<Image style={this.estilos.imagembotao} source={ require('../../imagens/menu_search.png') }/>
					</TouchableOpacity>
				</View>
				<View style={this.estilos.botoes}>
					<TouchableOpacity style={this.estilos.botao}>
						<Image style={this.estilos.imagembotao} source={ require('../../imagens/menu_order.png') }/>
					</TouchableOpacity>
				</View>
				<View style={this.estilos.botoes}>
					<TouchableOpacity style={this.estilos.botao}>
						<Image style={this.estilos.imagembotao} source={ require('../../imagens/menu_profile.png') }/>
					</TouchableOpacity>
				</View>
			</View>
		);
	};
}