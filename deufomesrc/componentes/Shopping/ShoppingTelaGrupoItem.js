import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {SuperHTTPURLBase} from '../Utils/SuperHTTP';

export default class ShoppingTelaGrupoItem extends Component {
	constructor(props){
		super(props);
	}

	estilos = StyleSheet.create({
		principal: {
			alignItems: 'center',
			padding: 10,
			minWidth: 100,
			marginRight: 10
		},
		botao: {
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			borderWidth: 1,
			borderColor: '#333',
			borderRadius: 10,
			overflow: 'hidden'
		},
		imagem: {
			width: 80,
			height: 80
		},
		texto: {
			fontSize: 15,
			color: '#000'
		}
	});

	render(){
		return (
			<View style={this.estilos.principal}>
				<TouchableOpacity style={this.estilos.botao}  onPress={ ()=> { this.props.navigation.push('Loja', {loja_id : this.props.item.Id}); }}>
					<Image style={this.estilos.imagem} source={ {uri : SuperHTTPURLBase + 'img/emp_logo_' + this.props.item.Id + '.jpg'} }/>
				</TouchableOpacity>
				<Text style={this.estilos.texto}>{ this.props.item.Nome }</Text>
			</View>
		);
	}
}