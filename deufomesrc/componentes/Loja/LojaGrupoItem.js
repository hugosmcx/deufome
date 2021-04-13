import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import {SuperHTTPURLBase} from '../Utils/SuperHTTP';
import { EstiloLojaGrupoItem as estilos } from './esLojaGrupoItem';


export default class LojaGrupoItem extends Component {
	render(){
		return (
			<View style={estilos.principal}>
				<TouchableOpacity style={estilos.botao} onPress={ () => this.props.navigation.navigate("LojaProduto", {produto_id : this.props.produto.Id})}>
					<Image style={estilos.imagem} source={ { uri : SuperHTTPURLBase + '/img/pro_' + this.props.produto.Id + '.jpg'} }/>
					<View style={estilos.grupo_texto}>
						<Text style={estilos.texto}>{this.props.produto.Nome}</Text>
						<Text style={estilos.texto_preco}>R${this.props.produto.Preco.toFixed(2)}</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}