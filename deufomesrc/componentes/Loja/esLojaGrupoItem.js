import { StyleSheet } from "react-native";

export const EstiloLojaGrupoItem = StyleSheet.create({
	principal: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		paddingVertical: 10
	},
	botao: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start'
	},
	imagem: {
		height: 75,
		width: 75,
		borderRadius: 5
	},
	grupo_texto:{
		flexDirection: 'column'
	},
	texto: {
		marginLeft: 10,
		fontSize: 20,
		color: '#000'
	},
	texto_preco: {
		marginLeft: 10,
		fontSize: 15,
		color: '#32DD45'
	}
});