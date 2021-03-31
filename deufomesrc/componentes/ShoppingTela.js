import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

import ShoppingTelaGrupo from './ShoppingTelaGrupo';

export default class ShoppingTela extends Component {
	constructor(props){
		super(props);

		this.state = { cardapio : []};
	}

	estilos = StyleSheet.create({
		principal: {
			padding: 5,
		}
	});

	render(){
		return (
			<View style={this.estilos.principal}>
				{
					this.props.cardapio.map( (item) => (<ShoppingTelaGrupo key={item.Nome} grupo={item} navigation={this.props.navigation}/>))
				}
			</View>
		);
	};
}