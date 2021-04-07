import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { EstiloCesta as estilos } from '../estilos/esCesta';
import BarraVoltar from './BarraVoltar';

export default class Cesta extends Component {

	render(){
		return (
			<View style={estilos.principal}>
				<BarraVoltar navigation={this.props.navigation} texto='Sacola'/>
				<Text>Cesta</Text>
			</View>
		);
	}
}