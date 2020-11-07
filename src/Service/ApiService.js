export const apiService = {

	request(url, methodRequest = 'GET', headersRequest = {}, body = {}) {

		if (methodRequest === 'GET') {

			return fetch(url, {
				headers: headersRequest,
			})
			.then(async response => {
				console.log('API_RESPONSE', response);
				if (!response.ok) {
					const responseErrorServer = await response.json();
					const errorObj = Error(responseErrorServer.message);
					throw errorObj;
				}

				return await response.json();
			})
			.catch((err) => {
				console.log('ERRO_NOTAS', err);
				return ({ error: err })
			})
		} else {

			const bodyRequest = JSON.stringify(body)
			console.log('BODY', body, 'JSON_BODY', bodyRequest);

			return fetch(url, {
				method: methodRequest,
				headers: headersRequest,
				body: JSON.stringify(body) //{bodyRequest}
			})
				.then(async response => {
					console.log('API_RESPONSE', response);
					if (!response.ok) {
						const responseErrorServer = await response.json();
						const errorObj = Error(responseErrorServer.message);
						throw errorObj;
					}

					return await response.json();
				})
				.catch((err) => {
					return ({ error: err })
				}
				)
		}
	}
}