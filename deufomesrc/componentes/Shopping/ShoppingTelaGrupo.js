import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import ShoppingTelaGrupoItem from './ShoppingTelaGrupoItem';

export default class ShoppingTelaGrupo extends Component {

	constructor(props){
		super(props);

		this.state = { grupo : { Nome: '', Itens: []} };
	}

	estilos = StyleSheet.create({
		principal: {
			margin: 5,
			padding: 5
		},
		texto: {
			fontSize: 25,
			color: '#000'
		},
		container:{
			flex: 1
		},
		agrupamento: {
			flex: 1,
			flexDirection: 'row'
		}
	});

	componentDidMount(){
		this.setState( { grupo : this.props.grupo });
	}

	render(){
		return (
			<View style={this.estilos.principal}>
				<Text style={this.estilos.texto}>{ this.state.grupo.Nome }</Text>
				<View style={this.estilos.container}>
					<ScrollView horizontal={true}>
						<View style={this.estilos.agrupamento}>
							{ this.state.grupo.Itens.map( (it) => (<ShoppingTelaGrupoItem key={it.Id} item={it} navigation={this.props.navigation}/>) )}
						</View>
					</ScrollView>
				</View>
			</View>
		);
	}
}