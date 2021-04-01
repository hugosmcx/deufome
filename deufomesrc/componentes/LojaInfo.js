import React, { Component } from "react";
import { View, Text } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

import BarraVoltar from './BarraVoltar';
import LojaInfoAvaliacao from './LojaInfoAvaliacao';
import { EstiloLojaInfo as estilos } from '../estilos/esLojaInfo';
import { DF_BASE_URL } from './DeuFome';

export default class LojaInfo extends Component{

	dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

	constructor(props){
		super(props);

		this.state = {
			loja_id: 0,
			dados: {
				Id: 0,
				CpfCnpj: '',
				Endereco: '',
				Numero: '',
				Bairro: '',
				Cep: '',
				Cidade: '',
				Telefone: '',
				Email: ''
			},
			horarios: [],
			avaliacoes: []
		};
	}

	componentDidMount(){
		this.carregadados();
	}

	carregadados(){
		this.carregainfo();
		this.carregahorario();
		this.carregaavaliacoes();
	}

	carregainfo(){
		RNSecureStorage.get("biscoito")
		.then((biscoito) => {
			var fd = new FormData();
			fd.append('cookie', biscoito);
			fd.append('loja_id', this.props.route.params.loja_id);

			fetch(DF_BASE_URL + 'api/loja-info.php', {method : 'POST', body : fd})
      		.then((response) => response.json())
    		.then((obj) => {
				if(obj.Status == "OK"){
					this.setState({ dados : obj.Result});
				}else{
					Alert.alert('Falha ao obter dados da loja');
				}
			})
      		.catch((erro) => {
				Alert.alert('Serviço Indisponível');
			});
		})
		.catch((erro) => { console.log(erro) });
	}

	carregahorario(){
		RNSecureStorage.get("biscoito")
		.then((biscoito) => {
			var fd = new FormData();
			fd.append('cookie', biscoito);
			fd.append('loja_id', this.props.route.params.loja_id);

			fetch(DF_BASE_URL + 'api/loja-horario.php', {method : 'POST', body : fd})
      		.then((response) => response.json())
    		.then((obj) => {
				if(obj.Status == "OK"){
					this.setState({ horarios : obj.Result});
				}else{
					Alert.alert('Falha ao obter dados da loja');
				}
			})
      		.catch((erro) => {
				Alert.alert('Serviço Indisponível');
			});
		})
		.catch((erro) => { console.log(erro) });
	}

	carregaavaliacoes(){
		RNSecureStorage.get("biscoito")
		.then((biscoito) => {
			var fd = new FormData();
			fd.append('cookie', biscoito);
			fd.append('loja_id', this.props.route.params.loja_id);

			fetch(DF_BASE_URL + 'api/loja-avaliacoes.php', {method : 'POST', body : fd})
      		.then((response) => response.json())
    		.then((obj) => {
				if(obj.Status == "OK"){
					console.log(obj.Result);
					this.setState({ avaliacoes : obj.Result});
				}else{
					Alert.alert('Falha ao obter dados da loja');
				}
			})
      		.catch((erro) => {
				Alert.alert('Serviço Indisponível');
			});
		})
		.catch((erro) => { console.log(erro) });
	}

	render(){
		return (
			<View style={estilos.principal}>
				<BarraVoltar navigation={this.props.navigation} texto='Nome da Loja'/>
				<ScrollView style={estilos.rolagem}>
					<View style={estilos.grupo}>
						<Text style={estilos.titulo_grupo}>Contato</Text>
						<View>
							<View style={estilos.lista_tab}>
								<Text style={estilos.lista_tab_chave}>Tel: </Text>
								<Text style={estilos.lista_tab_valor}>{this.state.dados.Telefone}</Text>
							</View>
							<View style={estilos.lista_tab}>
								<Text style={estilos.lista_tab_chave}>E-mail: </Text>
								<Text style={estilos.lista_tab_valor}>{this.state.dados.Email}</Text>
							</View>
							<View style={estilos.lista_tab}>
								<Text style={estilos.lista_tab_chave}>CPF/CNPJ: </Text>
								<Text style={estilos.lista_tab_valor}>{this.state.dados.CpfCnpj}</Text>
							</View>
							<View style={estilos.lista_tab}>
								<Text style={estilos.lista_tab_chave}>Endereco: </Text>
								<Text style={estilos.lista_tab_valor}>{this.state.dados.Endereco + ', ' + this.state.dados.Numero}</Text>
							</View>
							<View style={estilos.lista_tab}>
								<Text style={estilos.lista_tab_chave}>CEP: </Text>
								<Text style={estilos.lista_tab_valor}>{this.state.dados.Cep}</Text>
							</View>
							<View style={estilos.lista_tab}>
								<Text style={estilos.lista_tab_chave}>Cidade: </Text>
								<Text style={estilos.lista_tab_valor}>{this.state.dados.Cidade}</Text>
							</View>
						</View>
					</View>
					<View style={estilos.grupo}>
						<Text style={estilos.titulo_grupo}>Horarios</Text>
						<View>
							{ this.state.horarios.map( (item) => (
									<View key={item.Id} style={estilos.lista_tab}>
										<Text style={estilos.lista_tab_chave}>{this.dias[item.Dia]}</Text>
										<Text style={estilos.lista_tab_valor}>{item.HoraIni + ' - ' + item.HoraFin}</Text>
									</View>
								))
							}
						</View>
					</View>
					<View style={estilos.grupo}>
						<Text style={estilos.titulo_grupo}>Avaliações</Text>
						{ this.state.avaliacoes.map( (item) => (<LojaInfoAvaliacao key={item.Id} avaliacao={item}/>) ) }
					</View>
				</ScrollView>
			</View>
		);
	}
}