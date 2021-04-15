import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { EstiloLocalizacao as estilos } from './esItemLocalizacao';
import {SuperHTTP} from '../Utils/SuperHTTP';

export default class ItemLocalizacao extends Component {

	constructor(props){
		super(props);

		this.state = { nome: '', id : '0'};
	}

	alteracidade(cidade_id){
		SuperHTTP(this.props.navigation, 'definir-cidade.php', {CidadeId: cidade_id})
		.then((ret) => {
			this.props.navigation.push('Shopping', {rd_param : Math.random()});
		})
		.catch((err) => {
			Alert.alert(err);
		});
	}

	render(){
		return (
			<View style={estilos.principal}>
				<TouchableOpacity onPress={ ()=> this.alteracidade(this.props.cidade.Id)}>
					<Text style={estilos.texto}>{this.props.cidade.Nome}</Text>
				</TouchableOpacity>
			</View>
		);
	}

}