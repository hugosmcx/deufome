import React, { Component } from "react";
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';

export default class SemInternet extends Component {
	render(){
		return (
			<View style={estilos.esSemInternetPrincipal}>
				<StatusBar backgroundColor="#000"/>
				<Image style={estilos.esSemInternetImagem} source={ require('./deufomesrc/imagens/no_internet.png') }/>
				<TouchableOpacity style={estilos.esSemInternetBotao} onPress={ () => this.tentarnovamente() }>
					<Text style={estilos.esSemInternetBotaoTexto}>Tentar Novamente</Text>
				</TouchableOpacity>
			</View>
		);
	}
}