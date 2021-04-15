import RNSecureStorage from 'rn-secure-storage';

export const SuperHTTP = (navigation, pServico, pFormulario) => {
	return new Promise((resolve, reject) => {
		RNSecureStorage.get("token")
		.then((biscoito) => {
			pFormulario.Token = '' + biscoito;
			fetch(SuperHTTPURLBase + 'api/' + pServico, {method : 'POST', body : JSON.stringify(pFormulario), headers: {'Content-type': 'application/json; charset=UTF-8'}})
      		.then((response) => response.json())
    		.then((obj) => {
				if(obj.Status == 'OK'){
					resolve(obj.Result);
				}else if(obj.Status == 'UNAUTHORIZED'){
					navigation.push("LoginEmail");
					reject('Entre com seu e-mail');
				}else if(obj.Status == 'ERROR'){
					reject(obj.Message);
				}else{
					reject("Erro no processamento");
				}
			})
      		.catch((erro) => reject('Serviço indisponível'));
		})
		.catch((erro) => reject('Erro interno'));
	});
}

export const SuperHTTPURLBase = 'http://192.168.218.2/deufomeapi/';