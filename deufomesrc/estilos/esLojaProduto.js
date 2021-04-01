import { StyleSheet } from 'react-native';

export const EstiloLojaProduto = StyleSheet.create({
	principal: {
		flex: 1
	},
	imagem_produto: {
		height: 200,
		borderRadius: 10
	},
	grupo: {
		margin: 10
	},
	texto_titulo: {
		fontSize: 25,
		color: '#000'
	},
	texto_padrao: {
		fontSize: 14,
		color: '#000'
	},
	texto_destaque: {
		fontSize: 14,
		color: '#fa5035'
	},
	texto_preco: {
		fontSize: 20,
		color: '#fa5035'
	}
});