import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import { DF_BASE_URL } from './DeuFome';

import { EstiloCesta as estilos } from '../estilos/esCesta';
import BarraVoltar from './BarraVoltar';

export default class Cesta extends Component {

	constructor(props){
		super(props);

		this.state = {total: 0.00, sacola : []};
	}

	componentDidMount(){
		this.carrega_lista();
	}

	carrega_lista(){
		RNSecureStorage.get("biscoito")
		.then((biscoito) => {
			var fd = new FormData();
			fd.append('cookie', biscoito);

			fetch(DF_BASE_URL + 'api/cesta.php', {method : 'POST', body : fd})
      		.then((response) => response.json())
    		.then((obj) => {
				if(obj.Status == "OK"){
					this.setState({ total: obj.Result.Total, sacola : obj.Result.Itens});
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
			<View style={estilos.principal}>
				<BarraVoltar navigation={this.props.navigation} texto='Sacola'/>
				<View style={estilos.grupo}>
					<ScrollView>
						{
							this.state.sacola.map( (produto) => (
								<View key={produto.Id} style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5, margin: 5}}>
									<View style={{backgroundColor: '#eee', flexDirection: 'row'}}>
										<Text style={{padding: 5, fontSize: 20, flex: 1, color: '#000'}}>{produto.Nome}</Text>
										<TouchableOpacity style={{backgroundColor: '#f00', padding: 5}}>
											<Image style={{width: 25, height: 25}} source={require('../imagens/trash.png')}/>
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
					</ScrollView>
				</View>
				<View style={{borderTopWidth: 1, borderTopColor: '#ccc'}}>
					<View style={{padding: 5}}>
						<Text style={{fontSize: 25}}>Total Pedido R${this.state.total.toFixed(2)}</Text>
					</View>
					<TouchableOpacity style={estilos.botao_fechar_pedido} onPress={ () => this.adiciona() }>
						<Text style={estilos.texto_fechar_pedido}>Fechar Pedido</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}