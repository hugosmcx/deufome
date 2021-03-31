import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Alert, StatusBar, Text, TouchableOpacity } from 'react-native';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

import ShoppingLocalizacao from './ShoppingLocalizacao';
import ShoppingTela from './ShoppingTela';
import ShoppingFooterMenu from './ShoppingFooterMenu';
import { DF_BASE_URL } from './DeuFome'; 

export default class Shopping extends Component {

	DF_ATUALIZANDO = false;

	DF_ESTADO_ANTERIOR = "";


	constructor(props){
		super(props);

		this.state = { cardapio : [], cidade : '' };
		this.carregamenu = this.carregamenu.bind(this);
	}

	estilos = StyleSheet.create({
		principal: {
			flex: 1,
			backgroundColor: '#FFF'
		},
		area:{
			flex: 1
		},
		rolagem: {
			flex: 1
		},
		botaoatu: {
			padding: 5
		},
		textoatu: {
			textAlign: 'center',
			color: '#0090FF',
			padding: 5,
			fontSize: 13
		}
	});

	componentDidMount(){
		this.carregamenu();
	}

	componentDidUpdate(){
		if(this.props.route.params.estado_novo){
			if((this.DF_ESTADO_ANTERIOR != this.props.route.params.estado_novo)){
				this.DF_ESTADO_ANTERIOR = this.props.route.params.estado_novo;
				this.carregamenu();
			}
		}
	}

	carregamenu(){
		this.setState({cardapio: []});
		this.DF_ATUALIZANDO = true;
		RNSecureStorage.get("biscoito")
		.then((biscoito) => {
			var fd = new FormData();
			fd.append('cookie', biscoito);

			fetch(DF_BASE_URL + 'api/menu.php', {method : 'POST', body : fd})
      		.then((response) => response.json())
    		.then((obj) => {
				this.setState({ cardapio : obj.Result.Ramos, cidade : obj.Result.Cidade});
				this.UP_ATUALIZAR = true;
			})
      		.catch((erro) => {
				Alert.alert('Serviço Indisponível');
			});
		})
		.catch((erro) => { console.log(erro) });
	}

	render(){
		return (
			<View style={this.estilos.principal}>
				<StatusBar backgroundColor="#000"/>
				<ShoppingLocalizacao navigation={this.props.navigation} cidade={this.state.cidade}/>
				<View style={this.estilos.principal}>
					<ScrollView style={this.estilos.rolagem}>
						<TouchableOpacity style={this.estilos.botaoatu} onPress={ () => this.carregamenu()}>
							<Text style={this.estilos.textoatu}>Toque para atualizar</Text>
						</TouchableOpacity>
						<ShoppingTela cardapio={this.state.cardapio} navigation={this.props.navigation}/>
					</ScrollView>
				</View>
				<ShoppingFooterMenu/>
			</View>
		);
	};
}