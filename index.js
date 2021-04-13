import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {AppRegistry} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

import SplashScreen from './deufomesrc/componentes/SplashScreen/SplashScreen';
import LoginEmail from './deufomesrc/componentes/Login/LoginEmail';
import LoginCodigo from './deufomesrc/componentes/Login/LoginCodigo';
import Shopping from './deufomesrc/componentes/Shopping/Shopping';
import Loja from './deufomesrc/componentes/Loja/Loja';

const Stack = createStackNavigator();

class AppDeuFome extends Component {

	componentDidMount(){
		RNSecureStorage.get("token")
		.then((res) => {})
		.catch((err) => {this.gravabiscoito()});
	}

	gravabiscoito(){
		RNSecureStorage.set("token", "", {accessible: ACCESSIBLE.WHEN_UNLOCKED});
	}

	render(){
		return (
			<NavigationContainer>
				<Stack.Navigator screenOptions={{headerShown: false}}>
					<Stack.Screen name="SplashScreen" component={SplashScreen}/>
					<Stack.Screen name="LoginEmail"   component={LoginEmail}/>
					<Stack.Screen name="LoginCodigo"  component={LoginCodigo}/>
					<Stack.Screen name="Shopping"     component={Shopping}/>
					<Stack.Screen name="Loja"         component={Loja} initialParams={{loja_id: 0}}/>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}

AppRegistry.registerComponent('deufome', () => AppDeuFome);