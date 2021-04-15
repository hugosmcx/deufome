import { StyleSheet } from "react-native";

export const EstiloLojaInfo = StyleSheet.create({
	principal: {
		flex: 1,
		backgroundColor: '#fff'
	},
	rolagem: {
		flex: 1
	},
	grupo: {
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		padding: 10
	},
	titulo_grupo: {
		fontSize: 25,
		color: '#000'
	},
	lista_tab: {
		flexDirection: 'row'
	},
	lista_tab_chave: {
		width: 65
	},
	lista_tab_valor: {
		color: '#fa5035'
	}
});