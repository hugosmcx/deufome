import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import { EstiloLojaInfoAvaliacao as estilos } from '../estilos/esLojaInfoAvaliacao';

export default class LojaInfoAvaliacao extends Component {

	constructor(props){
		super(props);
	}

	render(){
		return (
			<View style={estilos.principal}>
				<Text style={estilos.nome_usuario}>Hugo Stéfano</Text>
				<View style={estilos.grupo}>
					<Image style={estilos.estrela} source={require('../imagens/star.png')}/>
					<Image style={estilos.estrela} source={require('../imagens/star.png')}/>
					<Image style={estilos.estrela} source={require('../imagens/star.png')}/>
				</View>
				<View style={estilos.grupo}>
					<Text style={estilos.texto}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
				</View>
				<View style={estilos.grupo}>
					<Text style={estilos.data}>26/03/2021 13:16</Text>
				</View>
			</View>
		);
	}

}