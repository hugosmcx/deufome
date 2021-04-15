import React, { Component } from 'react';
import { Image, View, Text, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { EstiloLoja as estilos } from './esLoja';
import {SuperHTTP, SuperHTTPURLBase} from '../Utils/SuperHTTP';

import BarraVoltar from '../BarraNevegacao/BarraVoltar';
import ShoppingFooterMenu from '../Shopping/ShoppingFooterMenu';
import LojaGrupo from './LojaGrupo';
import LojaFechada from './LojaFechada';
import SacolaNot from '../Sacola/SacolaNot';

export default class Loja extends Component {

	constructor(props){
		super();

		this.state = {
			loja_id : '0',
			loja : {
				NomeFantasia : '',
				RazaoSocial : '',
				Endereco : '',
				Numero : '',
				Bairro : '',
				Cep : '',
				Cidade : '',
				Telefone : '',
				Email : '',
				TempoEntrega : 0,
				ValorMinimo : 0,
				Aberto: 1,
				Estrelas: [],
				Grupos : []
			}
		};
	}

	componentDidMount(){
		this.setState({loja_id : this.props.route.params.loja_id});
		this.carregaloja();
	}

	carregaloja(){
		SuperHTTP(this.props.navigation, 'menu-loja.php', {LojaId:  this.props.route.params.loja_id})
		.then((ret) => {
			this.setState({ loja :ret});
		})
		.catch((err) => {
			Alert.alert(err)
		});
	}

	render(){
		return (
			<View style={estilos.principal}>
				<BarraVoltar texto={this.state.loja.NomeFantasia} navigation={this.props.navigation}/>
				<ScrollView style={estilos.rolagem}>
					<View>
						<Image style={estilos.imagem_loja} source={ {uri : SuperHTTPURLBase + 'img/emp_' + this.state.loja_id + '.jpg'} }/>
					</View>
					<View style={estilos.empresa}>
						<Image style={estilos.imagem_logo} source={{uri : SuperHTTPURLBase + 'img/emp_logo_' + this.state.loja_id + '.jpg'}}/>
						<View>
							<Text style={estilos.empresa_texto}>{this.state.loja.NomeFantasia}</Text>
							<View>
								<View style={estilos.grupo_estrela}>
									{ this.state.loja.Estrelas.map( (item) => (<Image style={estilos.estrela} key={item} source={require('../../imagens/star.png')}/>)) }
								</View>
								<View style={estilos.grupo_entrega}>
									<Image style={estilos.motoqueiro} source={require('../../imagens/icone.png')}/>
									<Text style={estilos.grupo_texto}>Tempo: até {this.state.loja.TempoEntrega} minutos</Text>
								</View>
								<View style={estilos.grupo_valor_minimo}>
									<Image style={estilos.motoqueiro} source={require('../../imagens/coin.png')}/>
									<Text style={estilos.grupo_texto}>Valor mínimo R${this.state.loja.ValorMinimo.toFixed(2)}</Text>
								</View>
								<View style={estilos.grupo_ver_mais}>
									<TouchableOpacity onPress={ () => this.props.navigation.push('LojaInfo', { loja_id : this.state.loja_id})}>
										<Text style={estilos.texto_ver_mais}>Ver mais</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>
					<LojaFechada aberto={this.state.loja.Aberto}/>
					<View>
						{ this.state.loja.Grupos.map( (item) => (<LojaGrupo navigation={this.props.navigation} key={item.Id} grupo={item}/>) ) } 
					</View>
				</ScrollView>
				<SacolaNot navigation={this.props.navigation}/>
				<ShoppingFooterMenu navigation={this.props.navigation}/>
			</View>
		);
	}

}