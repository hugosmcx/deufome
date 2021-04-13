import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { EstiloLocalizacao as estilos } from '../estilos/esItemLocalizacao';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import { DF_BASE_URL } from './DeuFome';

export default class ItemLocalizacao extends Component {

	constructor(props){
		super(props);

		this.state = { nome: '', id : '0'};
	}

	alteracidade(cidade_id){
		RNSecureStorage.get("biscoito")
		.then((biscoito) => {
			var fd = new FormData();
			fd.append('cookie', biscoito);
			fd.append('cidade', cidade_id);
			fetch(DF_BASE_URL + 'api/definir-cidade.php', {method : 'POST', body : fd})
      		.then((response) => response.json())
    		.then((obj) => {
				if(obj.Status == "OK"){
					this.props.navigation.navigate('Shopping', {estado_novo : Date.now()});
				}else{
					Alert.alert('Ocorreu um erro ao definir a cidade');
				}
			})
      		.catch((erro) => {
				Alert.alert('Serviço Indisponível');
				this.setState({ tela : 'SemInternet' });
			});
		})
		.catch((erro) => { console.log(erro) });
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