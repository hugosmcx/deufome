import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import { DF_BASE_URL } from './DeuFome';

import BarraVoltar from './BarraVoltar';
import ShoppingFooterMenu from './ShoppingFooterMenu';

export default class CestaAlterarEndereco extends Component {

	constructor(props){
		super(props);

		this.state = {endereco : '', numero : '', bairro : '', cep : '', celular : '', estadoBotao : {enabled: false}};
	}

	componentDidMount(){
		this.carrega_endereco();
	}

	carrega_endereco(){
		RNSecureStorage.get("biscoito")
		.then((biscoito) => {
			var fd = new FormData();
			fd.append('cookie', biscoito);

			fetch(DF_BASE_URL + 'api/cesta-endereco.php', {method : 'POST', body : fd})
      		.then((response) => response.json())
    		.then((obj) => {
				if(obj.Status == "OK"){
					this.setState({ endereco : obj.Result.Endereco, numero : obj.Result.Numero, bairro : obj.Result.Bairro, cep : obj.Result.Cep, celular : obj.Result.Celular, estadoBotao: {enabled: true} });
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

	salvar_endereco(){
		if(this.state.endereco.length < 4){
			Alert.alert("Informe o endereço");
		}else if(this.state.numero.length < 1){
			Alert.alert("Informe o número");
		}else if(this.state.bairro.length < 4){
			Alert.alert("Informe o bairro");
		}else if(this.state.cep.length != 8){
			Alert.alert("Informe o CEP (apenas números)");
		}else if(this.state.celular.length != 11){
			Alert.alert("Informe o celular (DDD + número)");
		}else{
			this.post_endereco();
		}
	}

	post_endereco(){
		this.setState({estadoTela : 0});
		RNSecureStorage.get("biscoito")
		.then((biscoito) => {
			var fd = new FormData();
			fd.append('cookie', biscoito);
			fd.append('endereco', this.state.endereco);
			fd.append('numero', this.state.numero);
			fd.append('bairro', this.state.bairro);
			fd.append('cep', this.state.cep);
			fd.append('celular', this.state.celular);

			fetch(DF_BASE_URL + 'api/cesta-alterar-endereco.php', {method : 'POST', body : fd})
      		.then((response) => response.json())
    		.then((obj) => {
				if(obj.Status == "OK"){
					this.props.navigation.navigate("Cesta", {rd_param : Math.random()});
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
			<View style={{flex: 1, backgroundColor: '#fff'}}>
				<BarraVoltar navigation={this.props.navigation} texto="Alterar Endereço"/>
				<ScrollView  style={{flex: 1}}>
				<View style={{flex: 1, margin: 10}}>
					<Text style={{fontSize: 18, color: '#000'}}>Endereço</Text>
					<TextInput placeholder='Endereço' style={{borderBottomWidth: 1, borderBottomColor: '#f00', marginBottom: 5, padding: 1, fontSize: 16}} value={this.state.endereco} onChangeText={ (valor) => this.setState({endereco : valor})}></TextInput>

					<Text style={{fontSize: 18, color: '#000'}}>Número</Text>
					<TextInput placeholder='Número' style={{borderBottomWidth: 1, borderBottomColor: '#f00', marginBottom: 5, padding: 1, fontSize: 16}} value={this.state.numero} onChangeText={ (valor) => this.setState({numero : valor})}></TextInput>

					<Text style={{fontSize: 18, color: '#000'}}>Bairro</Text>
					<TextInput placeholder='Bairro' style={{borderBottomWidth: 1, borderBottomColor: '#f00', marginBottom: 5, padding: 1, fontSize: 16}} value={this.state.bairro} onChangeText={ (valor) => this.setState({bairro : valor})}></TextInput>

					<Text style={{fontSize: 18, color: '#000'}}>CEP</Text>
					<TextInput placeholder='CEP' style={{borderBottomWidth: 1, borderBottomColor: '#f00', marginBottom: 5, padding: 1, fontSize: 16}} value={this.state.cep} onChangeText={ (valor) => this.setState({cep : valor})}></TextInput>

					<Text style={{fontSize: 18, color: '#000'}}>Celular</Text>
					<TextInput  placeholder='Celular' style={{borderBottomWidth: 1, borderBottomColor: '#f00', marginBottom: 5, padding: 1, fontSize: 16}} value={this.state.celular} onChangeText={ (valor) => this.setState({celular : valor})}></TextInput>
				</View>
				</ScrollView>
				<View style={{borderTopWidth: 1, borderTopColor: '#ccc'}}>
					<TouchableOpacity style={[{margin: 5, borderWidth: 1, borderColor: '#f00', backgroundColor: '#f00', padding: 5, borderRadius: 5}, this.state.estadoBotao]} onPress={ () => this.salvar_endereco()}>
						<Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Salvar e Continuar</Text>
					</TouchableOpacity>
				</View>
				<ShoppingFooterMenu navigation={this.props.navigation}/>
			</View>
		);
	}
}