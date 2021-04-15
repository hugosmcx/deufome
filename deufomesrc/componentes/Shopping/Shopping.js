import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Alert, StatusBar, Text, TouchableOpacity } from 'react-native';

import ShoppingLocalizacao from './ShoppingLocalizacao';
import ShoppingTela from './ShoppingTela';
import ShoppingFooterMenu from './ShoppingFooterMenu';
import SacolaNot from '../Sacola/SacolaNot';

import {SuperHTTP} from '../Utils/SuperHTTP';

export default class Shopping extends Component {

	constructor(props){
		super(props);

		this.state = { cardapio : [], cidade : '', rd_param : 0.0};
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
			color: '#F00',
			padding: 5,
			fontSize: 13
		}
	});

	componentDidMount(){
		this.carregamenu();
	}

	carregamenu(){
		this.setState({cardapio: []});
		SuperHTTP(this.props.navigation, 'menu.php', {})
		.then((ret) => {
			this.setState({ cardapio : ret.Ramos, cidade : ret.Cidade});
		})
		.catch((err) => {
			Alert.alert(err);
		});
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
				<SacolaNot rd_param={Math.random()} navigation={this.props.navigation}/>
				<ShoppingFooterMenu navigation={this.props.navigation}/>
			</View>
		);
	};
}