import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

import { DF_BASE_URL } from './DeuFome';
import BarraVoltar from './BarraVoltar';
import { EstiloLojaProduto as estilos } from '../estilos/esLojaProduto';

export default class LojaProduto extends Component {

	constructor(props){
		super(props);

		this.state = {
			dados: {
				Id: 0,
				Nome: '',
				Descricao: '',
				Preco: 0.0,
				Complementos: []
			}
		};
	}

	componentDidMount(){
		this.carregaproduto();
	}

	carregaproduto(){
		RNSecureStorage.get("biscoito")
		.then((biscoito) => {
			var fd = new FormData();
			fd.append('cookie', biscoito);
			fd.append('produto_id', this.props.route.params.produto_id);

			fetch(DF_BASE_URL + 'api/loja-produto.php', {method : 'POST', body : fd})
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

	retorna_item_grupo(grupo){
		return (
			<Text>{grupo.Itens[0].Nome}</Text>
		);
	}

	render(){
		return (
			<View style={estilos.principal}>
				<BarraVoltar navigation={this.props.navigation} texto={this.state.dados.Nome}/>
				<ScrollView>
					<View style={estilos.grupo}>
						<Image style={estilos.imagem_produto} source={ {uri : DF_BASE_URL + 'img/pro_' + this.state.dados.Id + '.jpg'} }/>
					</View>
					<View style={estilos.grupo}>
						<Text style={estilos.texto_titulo}>Descrição</Text>
						<Text style={estilos.texto_padrao}>{this.state.dados.Descricao}</Text>
						<Text style={estilos.texto_preco}>R${this.state.dados.Preco.toFixed(2)}</Text>
					</View>
					<View style={estilos.grupo}>
						{
							this.state.dados.Complementos.map( (com) => (
								<View key={com.Id}>
									<Text>{com.Nome}</Text>
									{ this.retorna_item_grupo(com) }
								</View>
							) )
						}
					</View>
				</ScrollView>
			</View>
		);
	}

}