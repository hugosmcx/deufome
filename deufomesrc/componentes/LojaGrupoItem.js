import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { DF_BASE_URL } from './DeuFome';
import { EstiloLojaGrupoItem as estilos } from '../estilos/esLojaGrupoItem';


export default class LojaGrupoItem extends Component {
	render(){
		return (
			<View style={estilos.principal}>
				<TouchableOpacity style={estilos.botao}>
					<Image style={estilos.imagem} source={ { uri : DF_BASE_URL + '/img/pro_' + this.props.produto.Id + '.jpg'} }/>
					<View style={estilos.grupo_texto}>
						<Text style={estilos.texto}>{this.props.produto.Nome}</Text>
						<Text style={estilos.texto_preco}>R${this.props.produto.Preco.toFixed(2)}</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}