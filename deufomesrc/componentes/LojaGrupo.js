import React, { Component } from 'react';
import { View, Text } from 'react-native';

import LojaGrupoItem from './LojaGrupoItem';
import { EstiloLojaGrupo as estilos } from '../estilos/esLojaGrupo';


export default class LojaGrupo extends Component {
	render(){
		return (
			<View style={estilos.principal}>
				<Text style={estilos.titulo}>{this.props.grupo.Nome}</Text>
				<View>
					{ this.props.grupo.Itens.map( (item) => (<LojaGrupoItem navigation={this.props.navigation} key={item.Id} produto={item} />) ) }
				</View>
			</View>
		);
	}
}