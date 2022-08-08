import { $api } from '@/api'

export default class AuthService {
	static async login(phone) {
		return $api.get('/user/login/', {
			params: { phone }
		})
	}

	static async logout() {
		return $api.get('/user/logout/')
	}

	static async activate(phone, code) {
		return $api.get('/user/activate/', {
			params: {
				phone: phone,
				code: code
			}
		})
	}
	static async refresh() {
		return $api.get('/user/refresh/')
	}
}