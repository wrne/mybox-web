export const FormValidateService = {

	IsEmail(email) {

		// let exclude = /[^@-.w]|^[_@.-]|[._-]{2}|[@.]{2}|(@)[^@]*1/
		// let check = /@[w-]+./
		// let checkend = /.[a-zA-Z]{2,3}$/

		// if ((email.search(exclude) != -1) || (email.search(check)) == -1 || (email.search(checkend) == -1)) {
		// 	return false
		// } else {
		// 	return true
		// }
		var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		if (!filter.test(email)) {
			return false
		}

		return true
	},

	PasswordMatch(password, confirmPassword) {

		return password === confirmPassword

	},
	
	PasswordValid(password){
		return true
	}

}