import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

import {SuperHTTP, SuperHTTPURLBase} from '../Utils/SuperHTTP';
import BarraVoltar from '../BarraNevegacao/BarraVoltar';
import ShoppingFooterMenu from '../Shopping/ShoppingFooterMenu';
import SacolaNot from '../Sacola/SacolaNot';
import { EstiloLojaProduto as estilos } from './esLojaProduto';

export default class LojaProduto extends Component {

	cesta = [];

	constructor(props){
		super(props);

		this.state = {
			dados: {
				Id: 0,
				Nome: '',
				Descricao: '',
				Preco: 0.0,
				Quantidade: 0,
				Complementos: []
			},
			ValorFinal: 0.0
		};
	}

	componentDidMount(){
		this.carregaproduto();
	}

	carregaproduto(){
		SuperHTTP(this.props.navigation, 'loja-produto.php', {ProdutoId: this.props.route.params.produto_id})
		.then((ret) => {
			this.processa_produto(ret);
		})
		.catch((err) => {
			Alert.alert(err);
		});
	}

	processa_produto(ret){
		var lpro = {};
		lpro.Id = ret.Id;
		lpro.Nome = ret.Nome;
		lpro.Descricao = ret.Descricao;
		lpro.Preco = ret.Preco;
		lpro.Quantidade = 1;
		lpro.Complementos = [];

		for(var i = 0; i < ret.Complementos.length; i++){
			var tmp = [];
			for(var j = 0; j < ret.Complementos[i].Itens.length; j++){
				tmp.push({
					Id: ret.Complementos[i].Itens[j].Id,
					Nome: ret.Complementos[i].Itens[j].Nome,
					Preco: ret.Complementos[i].Itens[j].Preco,
					Quantidade: 0
				});
			}
			lpro.Complementos.push({
				Id: ret.Complementos[i].Id,
				Nome: ret.Complementos[i].Nome,
				Obrigatorio: ret.Complementos[i].Obrigatorio,
				Minimo: ret.Complementos[i].Minimo,
				Maximo: ret.Complementos[i].Maximo,
				Itens: tmp
			});
		}

		this.setState({ dados : lpro, empresa_id: ret.EmpresaId, ValorFinal: ret.Preco});
	}

	calcular_total(){
		var dados = this.state.dados;
		var valor_final = 0.0;
		valor_final += dados.Preco;
		for(var i = 0; i < dados.Complementos.length; i++){
			for(var j = 0; j < dados.Complementos[i].Itens.length; j++){
				valor_final += dados.Complementos[i].Itens[j].Quantidade * dados.Complementos[i].Itens[j].Preco;
			}
		}
		this.setState({ValorFinal : valor_final});
	}

	decrementaItem(grupo, item){
		var index_grupo = -1;
		var index_item = -1;
		var dados = this.state.dados;

		for(var i = 0; i < dados.Complementos.length; i++){
			if(dados.Complementos[i].Id == grupo){
				index_grupo = i;
				break;
			}
		}

		for(var i = 0; i < dados.Complementos[index_grupo].Itens.length; i++){
			if(dados.Complementos[index_grupo].Itens[i].Id == item){
				index_item = i;
				break;
			}
		}

		if(dados.Complementos[index_grupo].Itens[index_item].Quantidade > 0){
			dados.Complementos[index_grupo].Itens[index_item].Quantidade--;
			this.setState({dados : dados});
			this.calcular_total();
		}
	}

	incrementaItem(grupo, item){
		var index_grupo = -1;
		var index_item = -1;
		var quantidade_total = 0;
		var dados = this.state.dados;

		for(var i = 0; i < dados.Complementos.length; i++){
			if(dados.Complementos[i].Id == grupo){
				index_grupo = i;
				break;
			}
		}

		for(var i = 0; i < dados.Complementos[index_grupo].Itens.length; i++){
			if(dados.Complementos[index_grupo].Itens[i].Id == item){
				index_item = i;
				break;
			}
		}

		for(var i = 0; i < dados.Complementos[index_grupo].Itens.length; i++){
			quantidade_total += dados.Complementos[index_grupo].Itens[i].Quantidade;
		}

		if(dados.Complementos[index_grupo].Maximo > quantidade_total){
			dados.Complementos[index_grupo].Itens[index_item].Quantidade++;
			this.setState({dados : dados});
			this.calcular_total();
		}
	}

	ehObrigatirio(eh){
		if(eh == 1){
			return (<Text style={estilos.complementoInfoItem}>Obrigatório</Text>);
		}else{
			return (<Text style={estilos.complementoInfoItem}>Opcional</Text>);
		}
	}

	por_na_sacola(){
		var dados = this.state.dados;
		var tem_revisao = false;

		for(var i = 0; i < dados.Complementos.length; i++){
			var qtd = 0;
			for(var j = 0; j < dados.Complementos[i].Itens.length; j++){
				qtd += dados.Complementos[i].Itens[j].Quantidade;
			}

			if(dados.Complementos[i].Obrigatorio == 1 && qtd <= 0){
				tem_revisao = true;
			}

			if(dados.Complementos[i].Obrigatorio == 1 && qtd < dados.Complementos[i].Minimo){
				tem_revisao = true;
			}

			if(qtd > dados.Complementos[i].Maximo){
				tem_revisao = true;
			}
		}

		if(tem_revisao){
			Alert.alert("Revise as opções do produto antes de pôr na sacola");
		}else{
			RNSecureStorage.get("sacola")
			.then((sacola) => {
				if(sacola == null || sacola == ''){
					sacola = '{"EmpresaId":0,"Itens":[]}';
				}
				var lSacola = JSON.parse(sacola);
				if(lSacola.EmpresaId != this.state.empresa_id){
					lSacola = {};
					lSacola.EmpresaId = this.state.empresa_id;
					lSacola.Itens = [];
				}

				var lpro = {};
				lpro.Id = this.state.dados.Id;
				lpro.Nome = this.state.dados.Nome;
				lpro.Total = this.state.ValorFinal;
				lpro.Complementos = [];

				for(var i = 0; i < this.state.dados.Complementos.length; i++){
					var tmp = {};
					tmp.Id = this.state.dados.Complementos[i].Id;
					tmp.Nome = this.state.dados.Complementos[i].Nome;
					tmp.Itens = [];
					for(var j = 0; j < this.state.dados.Complementos[i].Itens.length; j++){
						if(this.state.dados.Complementos[i].Itens[j].Quantidade > 0){
							tmp.Itens.push({
								Id: this.state.dados.Complementos[i].Itens[j].Id,
								Nome: this.state.dados.Complementos[i].Itens[j].Nome,
								Quantidade: this.state.dados.Complementos[i].Itens[j].Quantidade
							});
						}
					}
					if(tmp.Itens.length > 0){
						lpro.Complementos.push(tmp);
					}
				}


				lSacola.Itens.push(lpro);

				RNSecureStorage.set("sacola", JSON.stringify(lSacola), {accessible: ACCESSIBLE.WHEN_UNLOCKED})
				.then((res) => {
						this.props.navigation.push('Cesta');
				}, (err) => {});
			})
			.catch((erro) => { console.log(erro) })
		}
	}

	render(){
		return (
			<View style={estilos.principal}>
				<BarraVoltar navigation={this.props.navigation} texto={this.state.dados.Nome}/>
				<ScrollView>
					<View style={estilos.grupo}>
						<Image style={estilos.imagem_produto} source={ {uri : SuperHTTPURLBase + 'img/pro_' + this.state.dados.Id + '.jpg'} }/>
					</View>
					<View style={estilos.grupo}>
						<Text style={estilos.texto_titulo}>Descrição</Text>
						<Text style={estilos.texto_padrao}>{this.state.dados.Descricao}</Text>
						<Text style={estilos.texto_preco}>R${this.state.dados.Preco.toFixed(2)}</Text>
					</View>
					<View style={estilos.grupo}>
						{
							this.state.dados.Complementos.map( com => (
								<View key={com.Id} style={estilos.complemento}>
									<View style={estilos.complementoTitulo}>
										<View>
											<Text style={estilos.complementoNome}>{com.Nome}</Text>
										</View>
										<View style={estilos.complementoInfo}>
											<Text style={estilos.complementoInfoItem}>{this.ehObrigatirio(com.Obrigatorio)}</Text>
											<Text style={estilos.complementoInfoItem}>Min {com.Minimo}</Text>
											<Text style={estilos.complementoInfoItem}>Máx {com.Maximo}</Text>
										</View>
									</View>
									<View>
										{
											com.Itens.map( subitem => (
													<View key={subitem.Id} style={estilos.grupoSubItem}>
														<View style={estilos.grupoSubItemTitulo}>
															<Text style={estilos.grupoSubItemProduto}>{subitem.Nome}</Text>
															<Text style={estilos.grupoSubItemProdutoPreco}>R${subitem.Preco.toFixed(2)}</Text>
														</View>
														<View style={estilos.grupoSubItemBotoes}>
															<View>
																<TouchableOpacity style={estilos.grupoSubItemBotao} onPress={ () => this.decrementaItem(com.Id, subitem.Id)}>
																	<Text style={estilos.grupoSubItemBotaoTexto}>-</Text>
																</TouchableOpacity>
															</View>
															<View>
																<Text style={estilos.grupoSubItemInfoTexto}>{subitem.Quantidade + '/' + com.Maximo}</Text>
															</View>
															<View>
																<TouchableOpacity style={estilos.grupoSubItemBotao} onPress={ () => this.incrementaItem(com.Id, subitem.Id)}>
																	<Text style={estilos.grupoSubItemBotaoTexto}>+</Text>
																</TouchableOpacity>
															</View>
														</View>
													</View>
												)
											)
										}
									</View>
								</View>
							) )
						}
					</View>
				</ScrollView>
				<View style={estilos.grupoFinalizar}>
					<View style={estilos.textoFinalizar}>
						<Text style={estilos.textoValorFinalizar}>Total R${this.state.ValorFinal.toFixed(2)}</Text>
					</View>
					<TouchableOpacity style={estilos.botaoFinalizar} onPress={ () => this.por_na_sacola()}>
						<Text style={estilos.textoBotaoFinalizar}>Pôr na Sacola</Text>
						<Image style={estilos.imagemBotaoFinalizar} source={require('../../imagens/bag.png')}/>
					</TouchableOpacity>
				</View>
				<SacolaNot navigation={this.props.navigation}/>
				<ShoppingFooterMenu navigation={this.props.navigation}/>
			</View>
		);
	}

}