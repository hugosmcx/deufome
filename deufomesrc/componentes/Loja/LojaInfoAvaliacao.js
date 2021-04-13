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
				<Text style={estilos.nome_usuario}>{this.props.avaliacao.Usuario}</Text>
				<View style={estilos.grupo}>
					{ this.props.avaliacao.Estrelas.map( (item) => (<Image key={item} style={estilos.estrela} source={require('../imagens/star.png')}/>) ) }
				</View>
				<View style={estilos.grupo}>
					<Text style={estilos.texto}>{this.props.avaliacao.Comentario}</Text>
				</View>
				<View style={estilos.grupo}>
					<Text style={estilos.data}>{this.props.avaliacao.Data}</Text>
				</View>
			</View>
		);
	}

}