import { createStore } from 'vuex'
import { userAuth } from './modules/user/userAuth'

export default createStore({
	modules: {
		userAuth
	}
})