import { StyleSheet } from 'react-native';

export const EstiloLojaProduto = StyleSheet.create({
	principal: {
		flex: 1,
		backgroundColor: '#fff'
	},
	imagem_produto: {
		height: 200,
		borderRadius: 10
	},
	grupo: {
		margin: 10,
		overflow: 'hidden'
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
	},
	complemento: {
		margin: 1,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 10,
		overflow: 'hidden'
	},
	complementoTitulo: {
		backgroundColor: '#ccc'
	},
	complementoNome: {
		margin: 5,
		color: '#000',
		fontSize: 20
	},
	complementoInfo: {
		flexDirection: 'row'
	},
	complementoInfoItem: {
		backgroundColor: '#000',
		padding: 2,
		color: '#fff',
		borderRadius: 4,
		margin: 5
	},
	grupoSubItem: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		marginBottom: 5,
		padding: 2
	},
	grupoSubItemTitulo:{
		flex: 1
	},
	grupoSubItemBotoes:{
		flexDirection: 'row',
		alignItems: 'center'
	},
	grupoSubItemBotao: {
		backgroundColor: '#f00',
		marginHorizontal: 5,
		borderRadius: 25,
		width: 25,
		height: 25,
		justifyContent: 'center',
		alignItems: 'center'
	},
	grupoSubItemBotaoTexto: {
		color: '#fff',
		fontSize: 15,
		fontWeight: 'bold'
	},
	grupoFinalizar: {
		paddingVertical: 5
	},
	botaoFinalizar: {
		backgroundColor: '#f00',
		margin: 5,
		borderRadius: 5,
		padding: 5
	},
	textoBotaoFinalizar: {
		textAlign: 'center',
		color: '#fff',
		fontSize: 25
	}
});