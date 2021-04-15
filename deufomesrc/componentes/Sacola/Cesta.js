import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Alert, TouchableOpacity} from 'react-native';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

import { EstiloCesta as estilos } from './esCesta';
import BarraVoltar from '../BarraNevegacao/BarraVoltar';
import ShoppingFooterMenu from '../Shopping/ShoppingFooterMenu';

export default class Cesta extends Component {

	constructor(props){
		super(props);

		this.state = {total: 0.00, sacola : []};
	}

	componentDidMount(){
		this.carrega_lista();
	}

	carrega_lista(){
		RNSecureStorage.get("sacola")
		.then((sacola) => {
			var lSacola = JSON.parse(sacola);
			var total = 0.00;
			for(var i = 0; i < lSacola.Itens.length; i++){
				total += lSacola.Itens[i].Total;
			}
			this.setState({total: total, sacola: lSacola.Itens});
		})
		.catch(err => {console.log(err)});
	}

	remover_item(id){
		RNSecureStorage.get("sacola")
		.then((sacola) => {
			var lSacola = JSON.parse(sacola);
			var nItens = [];
			var total = 0.00;
			for(var i = 0; i < lSacola.Itens.length; i++){
				if(lSacola.Itens[i].Id != id){
					nItens.push(lSacola.Itens[i]);
					total += lSacola.Itens[i].Total;
				}
			}
			lSacola.Itens = nItens;
			RNSecureStorage.set("sacola", JSON.stringify(lSacola), {accessible: ACCESSIBLE.WHEN_UNLOCKED})
			.then((res) => {
				this.setState({total: total, sacola: lSacola.Itens});
			}, (err) => {});
			
		})
		.catch((erro) => { console.log(erro) });
	}

	finalizar_pedido(){
		var itens = this.state.sacola;
		if(itens.length < 1){
			Alert.alert("Sua sacola está vazia");
		}
	}

	render(){
		return (
			<View style={estilos.principal}>
				<BarraVoltar navigation={this.props.navigation} texto='Sacola'/>
				<View style={estilos.grupo}>
					<ScrollView>
						{
							this.state.sacola.map( (produto) => (
								<View key={produto.Id} style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5, margin: 5, overflow: 'hidden'}}>
									<View style={{backgroundColor: '#eee', flexDirection: 'row'}}>
										<Text style={{padding: 5, fontSize: 20, flex: 1, color: '#000'}}>{produto.Nome}</Text>
										<TouchableOpacity style={{backgroundColor: '#f00', padding: 5, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.remover_item(produto.Id)}>
											<Image style={{width: 25, height: 25}} source={require('../../imagens/trash.png')}/>
										</TouchableOpacity>
									</View>
									{
										produto.Complementos.map( (complemento) => (
											<View key={complemento.Id}>
												<Text style={{padding: 3, backgroundColor: '#fff', color: '#f00', fontSize: 15}}>{complemento.Nome}</Text>
												{
													complemento.Itens.map( (item) => (
														<Text key={item.Id} style={{paddingVertical: 2, paddingLeft: 15, fontSize: 12}}>{item.Nome}</Text>
													) )
												}
											</View>
										) )
									}
									<Text style={{fontSize: 22, color: '#f00', padding: 5}}>R${produto.Total.toFixed(2)}</Text>
								</View>
							) )
						}
						<View>
					</View>
					</ScrollView>
				</View>
				<View style={{borderTopWidth: 1, borderTopColor: '#ccc'}}>
					<TouchableOpacity style={{borderWidth: 1, borderColor: '#f00', margin: 5, overflow: 'hidden'}} onPress={ () => this.props.navigation.push("CestaAlterarEndereco")}>
						<Text style={{padding: 5, color: '#000', fontSize: 18}}>Enviar para: Trabalho</Text>
					</TouchableOpacity>
					<View style={{padding: 5}}>
						<Text style={{fontSize: 25}}>Total Pedido R${this.state.total.toFixed(2)}</Text>
					</View>
					<TouchableOpacity style={estilos.botao_fechar_pedido} onPress={ () => this.finalizar_pedido() }>
						<Text style={estilos.texto_fechar_pedido}>Fechar Pedido</Text>
					</TouchableOpacity>
				</View>
				<ShoppingFooterMenu navigation={this.props.navigation}/>
			</View>
		);
	}
}