import React, { Component } from "react";
import { View, Text, RefreshControl } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

import BarraVoltar from './BarraVoltar';
import LojaInfoAvaliacao from './LojaInfoAvaliacao';
import { EstiloLojaInfo as estilos } from '../estilos/esLojaInfo';

export default class LojaInfo extends Component{

	df_atualizando = false;

	constructor(props){
		super(props);

		this.state = { loja_id : 0 };
	}

	carregadados(){
		this.df_atualizando = true;
		//
		this.df_atualizando = false;
	}

	render(){
		return (
			<View style={estilos.principal}>
				<BarraVoltar navigation={this.props.navigation} texto='Nome da Loja'/>
				<ScrollView style={estilos.rolagem} refreshControl={ <RefreshControl refreshing={this.df_atualizando} onRefresh={ () => this.carregadados() } /> }>
					<View style={estilos.grupo}>
						<Text style={estilos.titulo_grupo}>Contato</Text>
						<View>
							<View style={estilos.lista_tab}>
								<Text>Tel: </Text>
								<Text style={estilos.lista_tab_valor}>(84) 9 8855-5016</Text>
							</View>
							<View style={estilos.lista_tab}>
								<Text>E-mail: </Text>
								<Text style={estilos.lista_tab_valor}>hugosmcx@gmail.com</Text>
							</View>
						</View>
					</View>
					<View style={estilos.grupo}>
						<Text style={estilos.titulo_grupo}>Horarios</Text>
						<View>
							<View style={estilos.lista_tab}>
								<Text style={estilos.lista_tab_chave}>Seg: </Text>
								<Text style={estilos.lista_tab_valor}>14:00 - 20:00hs</Text>
							</View>
							<View style={estilos.lista_tab}>
								<Text style={estilos.lista_tab_chave}>Ter: </Text>
								<Text style={estilos.lista_tab_valor}>14:00 - 20:00hs</Text>
							</View>
							<View style={estilos.lista_tab}>
								<Text style={estilos.lista_tab_chave}>Qua: </Text>
								<Text style={estilos.lista_tab_valor}>14:00 - 20:00hs</Text>
							</View>
							<View style={estilos.lista_tab}>
								<Text style={estilos.lista_tab_chave}>Qui: </Text>
								<Text style={estilos.lista_tab_valor}>14:00 - 20:00hs</Text>
							</View>
							<View style={estilos.lista_tab}>
								<Text style={estilos.lista_tab_chave}>Sex: </Text>
								<Text style={estilos.lista_tab_valor}>14:00 - 20:00hs</Text>
							</View>
							<View style={estilos.lista_tab}>
								<Text style={estilos.lista_tab_chave}>Sáb: </Text>
								<Text style={estilos.lista_tab_valor}>14:00 - 20:00hs</Text>
							</View>
							<View style={estilos.lista_tab}>
								<Text style={estilos.lista_tab_chave}>Dom: </Text>
								<Text style={estilos.lista_tab_valor}>14:00 - 20:00hs</Text>
							</View>
						</View>
					</View>
					<View style={estilos.grupo}>
						<Text style={estilos.titulo_grupo}>Avaliações</Text>
						<LojaInfoAvaliacao/>
						<LojaInfoAvaliacao/>
						<LojaInfoAvaliacao/>
					</View>
				</ScrollView>
			</View>
		);
	}
}