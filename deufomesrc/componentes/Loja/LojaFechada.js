import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { EstiloLojaFechada as estilos } from './esLojaFechada';

export default class LojaFechada extends Component{

	constructor(props){
		super(props);
	}

	render(){
		if(this.props.aberto != '1'){
			return (
				<View style={estilos.principal}>
					<Text style={estilos.texto}>LOJA FECHADA {this.props.aberto}</Text>
				</View>
			);
		}else{
			return false;
		}
	}
}