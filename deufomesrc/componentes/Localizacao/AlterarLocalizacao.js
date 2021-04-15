import React, { Component } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View, Text, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import BarraVoltar from '../BarraNevegacao/BarraVoltar';
import ItemLocalizacao from './ItemLocalizacao';
import { SuperHTTP } from '../Utils/SuperHTTP';

export default class AlterarLocalizacao extends Component {

	constructor(props){
		super(props);

		this.state = { textoPesquisa : '', cidades: []};
	}

	estilos = StyleSheet.create({
		principal: {
			flex: 1
		},
		pesquisa: {
			flexDirection: 'row',
			alignItems: 'center',
			margin: 5,
			borderWidth: 1,
			borderColor: '#ccc',
			borderRadius: 10
		},
		entrada: {
			flex: 1,
			margin: 2,
			padding: 5,
			fontSize: 16,
			color: '#000',
			borderWidth: 0
		},
		imagem: {
			width: 30,
			height: 30,
			marginRight: 10
		},
		containerlista: {
			flex: 1,
			margin: 5
		}
	});

	componentDidMount(){
		this.pesquisar();
	}

	pesquisar(){
		SuperHTTP(this.props.navigation, 'pesquisa-cidade.php', {Cidade: this.state.textoPesquisa})
		.then((ret) => {
			this.setState({ cidades : ret })
		})
		.catch((err) => {
			Alert.alert(err);
		});
	}

	render(){
		return (
			<View style={this.estilos.principal}>
				<BarraVoltar texto='Localização' navigation={this.props.navigation}/>
				<View style={this.estilos.pesquisa}>
					<TextInput style={this.estilos.entrada} placeholder='Digite sua cidade' value={this.state.textoPesquisa} onChangeText={ (valor) => this.setState({textoPesquisa : valor})}/>
					<TouchableOpacity onPress={ () => this.pesquisar()}>
						<Image style={this.estilos.imagem} source={ require('../../imagens/menu_search.png')}/>
					</TouchableOpacity>
				</View>
				<View style={this.estilos.containerlista}>
					<ScrollView>
						{ this.state.cidades.map( (item) => (<ItemLocalizacao key={item.Id} cidade={item} navigation={this.props.navigation}/>)) }
					</ScrollView>
				</View>
			</View>
		);
	}
}