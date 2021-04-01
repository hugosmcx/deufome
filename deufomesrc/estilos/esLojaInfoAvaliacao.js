import { StyleSheet } from "react-native";

export const EstiloLojaInfoAvaliacao = StyleSheet.create({
	principal: {
		flex: 1,
		marginBottom: 25
	},
	nome_usuario: {
		fontSize: 18,
		color: '#000'
	},
	grupo: {
		flexDirection: 'row',
		marginTop: 5
	},
	estrela: {
		width: 15,
		height: 15,
		marginRight: 5
	},
	texto: {
		fontSize: 16,
		color: '#333'
	},
	data: {
		fontSize: 15,
		color: '#000',
		fontStyle: 'italic'
	}
});