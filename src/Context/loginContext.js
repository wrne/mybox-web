import React, { useState, createContext } from 'react';
import { Toast } from 'react-bootstrap';


export const LoginContext = createContext({
	msg: '',
	setMsg(newMsg) { }
})

export const LoginContextProvider = ({ children }) => {
	const [msg, setMsg] = useState('');

	return (
		<LoginContext.Provider value={{ msg, setMsg }}>
			{children}
			{msg && (
				<Toast delay={5000} autohide onClose={() => setMsg('')} style={{
					position: 'absolute',
					top: 0,
					right: 0,
				  }}>
					<Toast.Header>
						<strong className="mr-auto">Login Success</strong>
						<small>now</small>
					</Toast.Header>
					<Toast.Body>{msg}</Toast.Body>
				</Toast>
				
			)}

		</LoginContext.Provider>
	)


}
