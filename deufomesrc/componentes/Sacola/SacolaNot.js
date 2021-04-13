import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

import { EstiloSacolaNot as estilos } from './esSacolaNot';

export default class SacolaNot extends Component {

	constructor(props){
		super(props);

		this.state = {Quantidade : 0};
	}

	XcomponentDidMount(){
		RNSecureStorage.get("biscoito")
		.then((biscoito) => {
			var fd = new FormData();
			fd.append('cookie', biscoito);

			fetch(DF_BASE_URL + 'api/cesta-qtd.php', {method : 'POST', body : fd})
      		.then((response) => response.json())
    		.then((obj) => {
				this.setState({ Quantidade : obj.Result});
				this.UP_ATUALIZAR = true;
			})
      		.catch((erro) => {
				Alert.alert('Serviço Indisponível');
			});
		})
		.catch((erro) => { console.log(erro) });
	}

	render(){
		if(this.state.Quantidade == 1){
			return (
				<View style={estilos.principal}>
					<TouchableOpacity style={estilos.botao}  onPress={() => this.props.navigation.navigate('Cesta')}>
						<Text style={estilos.texto}>1 item - ver sacola</Text>
					</TouchableOpacity>
				</View>
			);
		}else if(this.state.Quantidade > 1){
			return (
				<View style={estilos.principal}>
					<TouchableOpacity style={estilos.botao} onPress={() => this.props.navigation.navigate('Cesta')}>
						<Text style={estilos.texto}>{this.state.Quantidade} itens - ver sacola</Text>
					</TouchableOpacity>
				</View>
			);
		}else{
			return false;
		}		
	}
}