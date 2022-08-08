<template>
	<div class="login">
		<div v-if="!isAuth">
			<h3>Введите номер телефона</h3>
			<p>Вам позвонит уникальный номер и <strong>последние 4 цыфры являются кодом</strong>. Отвечать на звонок не нужно. </p>
			<div v-if="!codeSend" class="login_phone">
				<div class="login_phone_input">
					<span>+7</span>
					<input v-model="inputNumbe" @input="numberFormat(inputNumbe)" @change="login" type="text" placeholder="9..."/>
				</div>
				<button @click="login">Войти</button>
			</div>
			<div v-if="codeSend" class="login_activate">
				<p>Введите последнии 4 цыфры входящего телефона.</p>
				<input v-model="inputCode" @input="codeFormat(inputCode)" @change="activate" type="text" placeholder="Код активации"/>
				<button @click="activate">Подтвердить</button>
			</div>
		</div>
		<div v-else>
			<p>Вы авторезированы</p>
			<button @click="logout">Выйти</button>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import InputMain from '../ui/InputMain.vue'

export default {
	components: { InputMain },
	name: 'login-form',
	data() {
		return {
			inputNumbe: '',
			inputCode: ''
		}
	},
	methods: {
		...mapActions([ 'login', 'activate', 'logout' ]),
		...mapMutations([ 'setNumber', 'setCode' ]),
		numberFormat(numberFormat) {
			this.inputNumbe = numberFormat.replace(/[^\d]/g, '')
			// this.number = this.number.replace(/\s+/g, ' ')
			if (numberFormat.length > 10) this.inputNumbe = numberFormat.slice(0, -1)
			this.setNumber(7 + this.inputNumbe)
		},
		codeFormat(codeFormat) {
			this.inputCode = codeFormat.replace(/[^\d]/g, '')
			// this.number = this.number.replace(/\s+/g, ' ')
			if (codeFormat.length > 4) this.inputCode = codeFormat.slice(0, -1)
			this.setCode(this.inputCode)
		}
	},
	computed: {
		...mapState({
			isAuth: state => state.userAuth.isAuth,
			codeSend: state => state.userAuth.codeSend,
			number: state => state.userAuth.number,
			code: state => state.userAuth.code
		})
	}
}
</script>

<style>
.login { max-width: 250px; }
.login p { margin: 0 0 20px 0; line-height: 18px; font-size: 13px; }
.login span { font-size: 16px; }
.login input { font-size: 17px; outline: none; padding: 0 10px; min-height: 40px; border: none; border-radius: 6px; background: #ececec; width: 100%; font-weight: 600; }
.login_phone_input span { width: 20px; margin: 0 5px 0 0; }
.login_phone_input { display: flex; justify-content: space-around; flex-direction: row; align-items: center; }
.login button { display: block; width: 100%; padding: 0 15px; min-height: 40px; border-radius: 6px; border: 0; text-transform: uppercase; font-weight: 600; font-size: 14px; cursor: pointer; background: #FFBE00; color: #000; margin: 20px 0 0 0; }
</style>