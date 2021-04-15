import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

import { EstiloSacolaNot as estilos } from './esSacolaNot';

export default class SacolaNot extends Component {

	constructor(props){
		super(props);

		this.state = {Quantidade : 0};
	}

	componentDidMount(){
		RNSecureStorage.get("sacola")
		.then((sacola) => {
			var lSacola = JSON.parse(sacola);
			this.setState({Quantidade: lSacola.Itens.length});
		})
		.catch((erro) => { console.log(erro) });
	}

	render(){
		if(this.state.Quantidade == 1){
			return (
				<View style={estilos.principal}>
					<TouchableOpacity style={estilos.botao}  onPress={() => this.props.navigation.push('Cesta')}>
						<Text style={estilos.texto}>1 item - ver sacola</Text>
					</TouchableOpacity>
				</View>
			);
		}else if(this.state.Quantidade > 1){
			return (
				<View style={estilos.principal}>
					<TouchableOpacity style={estilos.botao} onPress={() => this.props.navigation.push('Cesta')}>
						<Text style={estilos.texto}>{this.state.Quantidade} itens - ver sacola</Text>
					</TouchableOpacity>
				</View>
			);
		}else{
			return false;
		}		
	}
}