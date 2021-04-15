import React, {Component} from "react";
import {View, Text, StatusBar, TouchableOpacity, TextInput, Alert} from 'react-native';

import {EstiloBase} from '../Estilos/EstiloBase';
import {SuperHTTP} from '../Utils/SuperHTTP';

export default class LoginEmail extends Component {

	constructor(props){
		super(props);

		this.state = {email : '', estadoBotao: true};
	}

	validarEmail(){
		if(this.state.estadoBotao){
			if(this.state.email.length < 5){
				Alert.alert('Informe seu e-mail corretamente');
			}else{
				this.setState({estadoBotao: false});
				SuperHTTP(this.props.navigation, 'login-email.php', {Email : this.state.email})
				.then((ret) => {
					if(ret == "OK"){
						this.props.navigation.push('LoginCodigo', {email : this.state.email});
						this.setState({estadoBotao : true});
					}
				})
				.catch((err) => {
					this.setState({estadoBotao : true});
					Alert.alert(err);
				});
			}
		}
	}

	render(){
		return (
			<View style={{backgroundColor: '#FFF', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<StatusBar backgroundColor="#000"/>
				<View>
					<Text style={{fontSize: 25, alignSelf: 'center', color: '#000'}}>Informe seu E-mail para continuar</Text>
					<TextInput style={[EstiloBase.entrada, {marginVertical: 10}]} autoCapitalize="none" textContentType="emailAddress" value={ this.state.email} onChangeText={ (valor) => this.setState({'email' : valor}) } placeholder="Seu e-mail"></TextInput>
				</View>
				<View>
					<TouchableOpacity style={EstiloBase.botao} onPress={() => this.validarEmail()}>
						<Text style={[EstiloBase.botaoTexto]}>Continuar</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}