export const apiService = {

	request(url, methodRequest = 'GET', headersRequest = {}, body = {}){

		const bodyRequest = JSON.stringify({body})

		return fetch(url, {
			method: methodRequest,
			headers: headersRequest,
			body: JSON.stringify(body) //{bodyRequest}
		})
			.then(async response => {
				
				if (!response.ok) {
					const responseErrorServer = await response.json();
					const errorObj = Error(responseErrorServer.message);
					throw errorObj;
				}
				
				return await response.json();
			})
			.catch((err) => {
				return({error:err})
			}
			)
	}
}