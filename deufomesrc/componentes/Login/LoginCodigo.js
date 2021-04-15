import React, { Component } from "react";
import {View, Text, StatusBar, TouchableOpacity, TextInput, Alert} from 'react-native';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

import {EstiloBase} from '../Estilos/EstiloBase';
import {SuperHTTP} from '../Utils/SuperHTTP';

export default class LoginCodigo extends Component {
	constructor(props){
		super(props);

		this.state = {email: '', codigo: ''};
	}

	componentDidMount(){
		this.setState({email: this.props.route.params.email});
	}

	validarCodigo(){
		if(this.state.codigo.length != 6){
			Alert.alert('Informe o código de 6 dígitos enviado para seu e-mail');
		}else{
			SuperHTTP(this.props.navigation, 'login-codigo.php', {Email: this.state.email, Codigo: this.state.codigo})
			.then((ret) => {
				if(ret.Status == "OK"){
					RNSecureStorage.set("token", ret.Token, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
					.then((res) => {
						this.props.navigation.push('Shopping');
					}, (err) => {
						Alert.alert(err);
					});
				}else{
					Alert.alert(ret.Message);
				}
			});
		}
	}

	render(){
		return (
			<View style={{flex: 1, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center'}}>
				<StatusBar backgroundColor="#000"/>
				<View style={{paddingHorizontal: 20}}>
					<View style={{marginVertical: 20}}>
						<Text style={{fontSize: 25, color: '#000'}}>Um e-mail foi enviado para {this.state.email} com o código de acesso</Text>
					</View>
					<View>
						<Text style={{color: '#000', fontSize: 15}}>Informe o código enviado por e-mail</Text>
						<TextInput style={[EstiloBase.entrada, {textAlign: 'center', fontSize: 40}]} keyboardType="numeric" placeholder=" - - -   - - - " onChangeText={ (valor) => {this.setState({'codigo' : valor})}} value={this.state.codigo}/>
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 15, paddingHorizontal: 10}}>
						<Text style={{color: '#000', fontSize: 15}}>Não recebeu o código?</Text>
						<TouchableOpacity>
							<Text style={{color: '#F00', fontSize: 15}}> Enviar um novo Código</Text>
						</TouchableOpacity>
					</View>
					<View style={{marginVertical: 10}}>
						<TouchableOpacity onPress={() => this.validarCodigo()} style={EstiloBase.botao}>
							<Text style={EstiloBase.botaoTexto}>Continuar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}