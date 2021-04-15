import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {AppRegistry} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

import SplashScreen from './deufomesrc/componentes/SplashScreen/SplashScreen';
import AlterarLocalizacao from './deufomesrc/componentes/Localizacao/AlterarLocalizacao';
import LoginEmail from './deufomesrc/componentes/Login/LoginEmail';
import LoginCodigo from './deufomesrc/componentes/Login/LoginCodigo';
import Shopping from './deufomesrc/componentes/Shopping/Shopping';
import Loja from './deufomesrc/componentes/Loja/Loja';
import LojaProduto from './deufomesrc/componentes/Loja/LojaProduto';
import LojaInfo from './deufomesrc/componentes/Loja/LojaInfo';
import Cesta from './deufomesrc/componentes/Sacola/Cesta';

const Stack = createStackNavigator();

class AppDeuFome extends Component {

	componentDidMount(){
		RNSecureStorage.get("token")
		.then((res) => {})
		.catch((err) => {this.gravatoken()});

		RNSecureStorage.get("sacola")
		.then((res) => {})
		.catch((err) => {this.gravatoken()});
	}

	gravatoken(){
		RNSecureStorage.set("token", "", {accessible: ACCESSIBLE.WHEN_UNLOCKED});
	}

	gravasacola(){
		RNSecureStorage.set("sacola", '{"EmpresaId":0,"Itens":[]}', {accessible: ACCESSIBLE.WHEN_UNLOCKED});
	}

	render(){
		return (
			<NavigationContainer>
				<Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="SplashScreen">
					<Stack.Screen name="SplashScreen"        component={SplashScreen}/>
					<Stack.Screen name="Shopping"            component={Shopping}/>
					<Stack.Screen name="LoginEmail"          component={LoginEmail}/>
					<Stack.Screen name="LoginCodigo"         component={LoginCodigo}/>
					<Stack.Screen name="Loja"                component={Loja}/>
					<Stack.Screen name="LojaProduto"         component={LojaProduto}/>
					<Stack.Screen name="LojaInfo"            component={LojaInfo}/>
					<Stack.Screen name="AlterarLocalizacao"  component={AlterarLocalizacao}/>
					<Stack.Screen name="Cesta"               component={Cesta}/>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}

AppRegistry.registerComponent('deufome', () => AppDeuFome);