import React, { Component } from 'react';
import {AppRegistry, StyleSheet, StatusBar, View, Image, TouchableOpacity, Text, TextInput, Alert} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

import { DF_BASE_URL } from './deufomesrc/componentes/DeuFome';
import AlterarLocalizacao from './deufomesrc/componentes/AlterarLocalizacao';
import Shopping from './deufomesrc/componentes/Shopping';
import Loja from './deufomesrc/componentes/Loja';
import LojaInfo from './deufomesrc/componentes/LojaInfo';
import LojaProduto from './deufomesrc/componentes/LojaProduto';
import Cesta from './deufomesrc/componentes/Cesta';
import { EstiloIndex as estilos } from './deufomesrc/estilos/esIndex';

const Stack = createStackNavigator();

class AppDeuFome extends Component {

	clicou = false;

	constructor(props){
		super(props);

		this.state= { tela : 'SplashScreen', email : '', codigo : '' };
	}

	componentDidMount(){
		RNSecureStorage.get("biscoito")
		.then((biscoito) => {
			this.verificalogin();
		})
		.catch((erro) => {
			this.gravabiscoito();
		});
	}

	gravabiscoito(){
		RNSecureStorage.set("biscoito", "", {accessible: ACCESSIBLE.WHEN_UNLOCKED})
		.then((res) => {
			this.verificalogin();
		}, (err) => {

		});
	}

	verificalogin(){
		RNSecureStorage.get("biscoito")
		.then((biscoito) => {
			var fd = new FormData();
			fd.append('cookie', biscoito);

			fetch(DF_BASE_URL + 'api/esta-logado.php', {method : 'POST', body : fd})
      		.then((response) => response.json())
    		.then((obj) => {
				if(obj.Status == "PASS"){
					this.setState({ tela : 'Home' });
				}else{
					this.setState({ tela : 'LoginEmail' });
				}
			})
      		.catch((erro) => {
				Alert.alert('Serviço Indisponível');
				this.setState({ tela : 'SemInternet' });
			});
		})
		.catch((erro) => { console.log(erro) });
	}

	validaremail(){
		if(!this.clicou){
			this.clicou = true;
			if(this.state.email.length < 4){
				Alert.alert("Informe um e-mail válido");
				this.clicou = false;
			}else{
				console.log("Processa E-mail");
				this.processaemail();
			}
		}
	}

	processaemail(){
		var fd = new FormData();
		fd.append('email', this.state.email);
		fetch(DF_BASE_URL + 'api/login-email.php', {method: 'POST', body: fd})
      	.then((response) => response.json())
    	.then((obj) => {
			if(obj.Status == "OK"){
				this.setState({ tela : 'LoginCodigo' });
				this.clicou = false;
			}else{
				Alert.alert("Falha ao validar e-mail");
				this.clicou = false;
			}
		})
      	.catch((erro) => {
			Alert.alert('Serviço Indisponível');
			this.setState({ tela : 'SemInternet' });
			this.clicou = false;
		});
	}

	validarcodigo(){
		if(!this.clicou){
			this.clicou = true;
			if(this.state.codigo.length != 6){
				Alert.alert("Informe o Código de 6 dígitos enviado por e-mail");
				this.clicou = false;
			}else{
				this.processacodigo();
			}
		}
	}

	processacodigo(){
		var fd = new FormData();
		fd.append('email', this.state.email);
		fd.append('codigo', this.state.codigo);

		fetch(DF_BASE_URL + 'api/login-codigo.php', {credentials: 'include', method: 'POST', body: fd})
      	.then((response) => response.json())
    	.then((obj) => {
			if(obj.Status == "OK"){
				RNSecureStorage.set("biscoito", obj.Cookie, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
				.then((res) => {console.log(res)}, (err) => {console.log(err)});

				this.setState({ tela : 'Home' });
				this.clicou = false;
			}else{
				Alert.alert("Falha ao validar o código");
				this.clicou = false;
			}
		})
      	.catch((erro) => {
			console.log(erro);
			Alert.alert('Serviço Indisponível');
			this.setState({ tela : 'SemInternet' });
			this.clicou = false;
		});
	}

	tentarnovamente(){
		this.setState({ tela : 'SplashScreen'});
		this.verificalogin();
	}

	render(){
		switch (this.state.tela) {
			case 'SplashScreen':
				return this.telaSplash();
			case 'Home':
				return this.telaHome();
			case 'LoginEmail':
				return this.telaLoginEmail();
			case 'LoginCodigo':
				return this.telaLoginCodigo();
			case 'SemInternet':
				return this.telaSemInternet();
			default:
				return this.telaErro();
		}
		
	}

	telaErro(){
		return (
			<View>
				<Text>Erro</Text>
			</View>
		);
	}

	telaLoginEmail(){
		return (
			<View style={estilos.esLoginPrincipal}>
				<StatusBar backgroundColor="#000"/>
				<View>
					<Text style={estilos.esLoginTexto}>Informe seu E-mail para continuar</Text>
					<TextInput autoCapitalize="none" textContentType="emailAddress" value={ this.state.email} onChangeText={ (valor) => this.setState({'email' : valor}) } style={estilos.esLoginEntrada} placeholder="Seu e-mail"></TextInput>
				</View>
				<View style={estilos.esLoginBotao}>
					<TouchableOpacity onPress={ () => this.validaremail() } style={estilos.esLoginBotaoTouch}>
						<Text style={estilos.esLoginBotaoTexto}>Continuar</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	telaLoginCodigo(){
		return (
			<View style={estilos.esLoginCodigoPrincipal}>
				<StatusBar backgroundColor="#000"/>
				<View style={estilos.esLoginCodigoFormulario}>
					<View>
						<Text style={estilos.esLoginCodigoTexto}>Informe o código enviado por e-mail</Text>
						<TextInput style={estilos.esLoginCodigoEntrada} placeholder=" - - -   - - - " onChangeText={ (valor) => {this.setState({'codigo' : valor})}} value={this.state.codigo}/>
					</View>
					<View style={estilos.esLoginCodigoBtns}>
						<Text style={estilos.esLoginCodigoBtnTexto1}>Não recebeu o código?</Text>
						<TouchableOpacity onPress={ () => this.verificalogin() }>
							<Text style={estilos.esLoginCodigoBtnText2}> Enviar um novo Código</Text>
						</TouchableOpacity>
					</View>
					<View style={estilos.esLoginCodigoBotao}>
						<TouchableOpacity onPress={() => this.validarcodigo() } style={estilos.esLoginCodigoBotaoTouch}>
							<Text style={estilos.esLoginCodigoBotaoTexto}>Continuar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}

	telaSemInternet(){
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

	telaSplash(){
		return (
			<View style={estilos.esSplashScreenPrincipal}>
				<StatusBar backgroundColor="#000"/>
				<Image style={estilos.esSplashScreenImagem} source={ require('./deufomesrc/imagens/logo.png') }/>
			</View>
		);
	}

	telaHome(){
		return (
			<NavigationContainer>
				<Stack.Navigator screenOptions={{headerShown: false}}>
					<Stack.Screen name="Shopping" component={Shopping} initialParams={ { rd_param : Date.now(), estado_novo : ""} }/>
					<Stack.Screen name="AlterarLocalizacao" component={AlterarLocalizacao} />
					<Stack.Screen name="Loja" component={Loja} initialParams={ { rd_param : Date.now(), loja_id : 0} } />
					<Stack.Screen name="LojaInfo" component={LojaInfo} initialParams={ { rd_param : Date.now(), loja_id : 0} } />
					<Stack.Screen name="LojaProduto" component={LojaProduto} initialParams={ {rd_param : Date.now(), produto_id : 0} } />
					<Stack.Screen name="Cesta" component={Cesta} initialParams={ {rd_param : Date.now()} } />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}

AppRegistry.registerComponent('deufome', () => AppDeuFome);