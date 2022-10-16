<template>
<header class="header">
	<div class="notification">
		Сайт в разработке! Заказать можно на <a href="https://market.yandex.ru/store--shinpi?businessId=10698030">Я.Маркете.</a>
	</div>
	<div class="header_links">
		<div class="header_block">
			<ul>
				<li><a href="#">Оплата</a></li>
				<li><a href="#">Вакансии</a></li>
				<li><a href="#">Доставка</a></li>
				<li><a href="#">О компании</a></li>
			</ul>
			<ul>
				<li>+7 (996) 567-13-44</li>
			</ul>
		</div>
	</div>
	<div class="header_main" v-bind:class="{ fixed: scrolledLinks }">
		<div class="header_block">
			<div class="header_menu">
				<div class="logo"><router-link :to="{ name: 'main' }"><img src="../.././assets/logo.svg"></router-link></div>
				<button-main @click="catalogVisible ? catalogVisible = false : catalogVisible = true" class="button-yellow"><div class="menu_hamburger" v-bind:class="{ active: catalogVisible }"><i></i></div>Каталог</button-main>
				<input-search v-model="search" @focus="catalogVisible = true" @focusout="catalogVisible = false" @input="searchGet" />
			</div>
			<div class="header_panel">
				<button-main class="button-gray" @click="authShow = true">вход<icon-enter fill="#ECECEC"/></button-main>
				<button-main class="button-gray button-icon"><icon-cart fill="#ECECEC"/></button-main>
			</div>
		</div>
	</div>
	<transition name="modal_show">
	<div class="menu_modal" v-if="catalogVisible" @click="catalogVisible = false" v-bind:class="{ fixed: scrolledLinks }">
		<div @click.stop class="menu_block">
			<div class="search_result" v-if="searchResult.length > 0">
				<div class="search_result_item" v-for="result in searchResult" :key="result.item._id">
					<router-link @click="catalogVisible = false" :to="'/tyres/' + result.item._id" class="title"><strong>{{ result.item.brand.name }} {{ result.item.model.name }}</strong> {{ result.item.width }}/{{ result.item.height }} {{ result.item.diameter }}</router-link>
				</div>
			</div>
			<div v-else class="menu_links">
				<div class="menu_item">
					<h2>Шины</h2>
					<ul>
						<li><router-link to="/tyres" @click="catalogVisible = false">Все шины</router-link></li>
						<li><router-link to="/tyres" @click="catalogVisible = false">Летние шины</router-link></li>
						<li><router-link to="/tyres" @click="catalogVisible = false">Зимние шины</router-link></li>
					</ul>
				</div>
				<div class="menu_item">
					<h2>Диски</h2>
					<ul>
						<li><router-link to="/tyres" @click="catalogVisible = false">Все диски</router-link></li>
						<li><router-link to="/tyres" @click="catalogVisible = false">Литые диски</router-link></li>
						<li><router-link to="/tyres" @click="catalogVisible = false">Штампованные диски</router-link></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	</transition>
</header>
<popup-main v-model:show="authShow">
	<login-form />
</popup-main>
</template>

<script>
import axios from 'axios'
import ButtonMain from '../ui/ButtonMain.vue'
import InputSearch from '../ui/InputSearch.vue'
import IconLike from '../ui/icons/IconLike.vue'
import IconEnter from '../ui/icons/IconEnter.vue'
import IconCart from '../ui/icons/IconCart.vue'
import PopupMain from '../ui/PopupMain.vue'
import LoginForm from '../auth/LoginForm.vue'

export default {
	components: { ButtonMain, InputSearch, IconLike, IconEnter, IconCart, PopupMain, LoginForm },
	name: 'header-main',
	data() {
		return {
			authShow: false,
			catalogVisible: false,
			scrolledLinks: false,
			search: '',
			searchResult: []
		}
	},
	methods: {
		hideCatalog() {
			this.$emit('update:show', false)
		},
		handleScroll() {
			this.scrolledLinks = window.scrollY > 72
		},
		async searchGet() {
			console.log(this.search)
			const res = await axios.get('https://api.shinpi.ru/api/search/', {
				params: { string: this.search }
			})
			console.log(res.data)
			this.searchResult = res.data
		}
	},
	mounted() {
		window.addEventListener('scroll', this.handleScroll);
	},
	destroyed() {
    	window.removeEventListener('scroll', this.handleScroll);
	}
}

</script>

<style>
.notification { height: 36px; background: #ae0000; color: #FFF; text-align: center; line-height: 36px; font-weight: 600; }
.notification a { color: #ffbe00; }
.header { height: 132px; }
.header_block { width: 1020px; margin: 0 auto; display: flex; justify-content: space-between; }
.header_links { background: #000; height: 36px; line-height: 36px; color: #FFF; }
.header_links a { color: #FFF; text-decoration: none; }
.header_links ul { list-style: none; margin: 0; padding: 0; display: flex; }
.header_links ul li { margin: 0 10px; }
.header_links ul li:first-child { margin-left: 0; }
.header_links ul li:last-child { margin-right: 0; }
.header_main { background: #272727; height: 60px; display: flex; }
.header_main.fixed { position: fixed; top: 0; left: 0; right: 0; }
.header_menu { display: flex; align-items: center; }
.header_menu .logo { margin: -8px 40px 0 0; }
.header_panel { display: flex; width: 320px; align-items: center; justify-content: flex-end; }
.header_panel button { margin: 0 0 0 20px; }

.menu_hamburger { display: inline-block; width: 12px; height: 10px; position: relative; margin: 0 5px 0 0; }
.menu_hamburger i, .menu_hamburger i:after, .menu_hamburger i:before { width: 12px; height: 2px; background: #000; border-radius: 4px; position: absolute; }
.menu_hamburger i { display: block; top: calc(50% - 1px); }
.menu_hamburger i:after, .menu_hamburger i:before { content: ""; display: block; }
.menu_hamburger i:before { top: calc(50% - 5px) }
.menu_hamburger i:after { bottom: calc(50% - 5px) }
.menu_hamburger.active i { background: rgba(0, 0, 0, 0); }
.menu_hamburger.active i:before { top: 0; background: #000; transform: rotate(45deg); }
.menu_hamburger.active i:after { bottom: 0; background: #000; transform: rotate(-45deg); }
.menu_modal { position: absolute; top: 132px; bottom: -36px; left: 0; right: 0; background: rgba(0, 0, 0, 0.3); }
.menu_modal.fixed { position: fixed; top: 60px; }
.menu_block { width: 1020px; background: #FFF; box-shadow: 0px 5px 50px rgba(0, 0, 0, 0.2); padding: 30px; margin: 0 auto; border-radius: 0px 0px 6px 6px; }
.menu_links { display: flex; }
.menu_item { margin: 10px 30px }
.menu_item ul { list-style: none; }
.menu_item ul li { margin: 8px 0; }
.search_result { width: 600px; margin: 0 auto; }
.search_result_item { padding: 8px 0; }
.modal_show-enter-active, .modal_show-leave-active { transition: opacity 0.15s ease; }
.modal_show-enter-from, .modal_show-leave-to { opacity: 0; }

@media screen and (max-width: 1020px) {
.header_block { width: 100%; padding: 0 20px; }
.header_links .header_block ul:first-child { display: none; }
.header_menu { justify-content: space-between; width: 100%; }
.header_menu input { display: none; }
.header_panel { display: none; }
.menu_block { width: 100%; padding: 10px; }
.menu_item { margin: 10px 20px; width: 50%; }
}
</style>