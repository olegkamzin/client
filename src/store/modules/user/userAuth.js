import LoginService from '@/http/api/LoginService'
import axios from 'axios'

export const userAuth = {
	state() {
		return {
			isAuth: false,
			codeSend: false,
			number: '',
			code: ''
		}
	},
	getters: {

	},
	mutations: {
		setNumber(state, number) {
			state.number = number
		},
		setCode(state, code) {
			state.code = code
		},
		setAuth(state, bool) {
			state.isAuth = bool
		},
		setCodeSend(state, bool) {
			state.codeSend = bool
		}
	},
	actions: {
		async login({ state, commit }) {
			LoginService.login(state.number)
			.then(() => {
				commit('setCodeSend', true)
			})
			.catch(res => console.log(res.response?.data))
		},
		async activate({ state, commit }) {
			LoginService.activate(state.number, state.code)
			.then(res => {
				commit('setAuth', true)
				localStorage.setItem('token', res.data.accessToken)
			})
			
		},
		async logout({ commit }) {
			LoginService.logout()
			.then(() => {
				localStorage.removeItem('token')
				commit('setAuth', false)
				commit('setCodeSend', false)
			})
			.catch(res => console.log(res.response?.data))
		},
		async refresh({ commit }) {
			// LoginService.refresh()
			axios.get('https://api.shinpi.ru/user/refresh', { withCredentials: true })
			.then(res => {
				commit('setAuth', true)
				localStorage.setItem('token', res.data.accessToken)
			})
			.catch(res => {
				commit('setAuth', false)
				commit('setCodeSend', false)
				console.log(res)
			})
		}
	}
}