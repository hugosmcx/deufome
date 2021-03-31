import { StyleSheet } from "react-native";

export const EstiloLoja = StyleSheet.create({
	principal: {
		flex: 1
	},
	rolagem: {
		flex: 1
	},
	empresa: {
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		padding: 10,
		flexDirection: 'row'
	},
	imagem_loja: {
		height: 200
	},
	imagem_logo: {
		width: 100,
		height: 100,
		borderRadius: 10,
		marginRight: 10
	},
	empresa_texto: {
		fontSize: 18,
		color: '#000'
	},
	grupo_texto: {
		fontSize: 14
	},
	grupo_estrela: {
		flexDirection: 'row'
	},
	grupo_entrega: {
		marginTop: 5,
		flexDirection: 'row'
	},
	estrela: {
		width: 15,
		height: 15,
		marginRight: 2
	},
	motoqueiro: {
		width: 15,
		height: 15,
		marginRight: 5
	},
	grupo_valor_minimo: {
		marginTop: 5,
		flexDirection: 'row'
	},
	grupo_ver_mais: {
		marginTop: 5
	},
	texto_ver_mais:{
		color: '#F00',
		fontSize: 14,
		textDecorationLine: 'underline'
	}
});