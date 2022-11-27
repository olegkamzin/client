<template>
<product-filter v-on:sortFilter="selectParams"></product-filter>
<product-list :items="items" />
<div class="pagination">
	<ul>
		<li v-if="params.page !== 1" class="select_page" @click="productsGet(1)">В начало</li>
		<li class="un" :class="{ 'select_page' : page === params.page }" v-for="page in pages.showPage" :key="page" @click="productsGet(page)">{{ page }}</li>
		<li v-if="params.page !== pages.last_page && pages.last_page !== undefined" class="select_page" @click="productsGet(params.page + 1)">Дальше</li>
	</ul>
</div>
</template>
<script>
import ProductList from '@/components/ProductList.vue'
import ProductFilter from '@/components/ProductFilter.vue'
import ProductService from '@/http/api/ProductService.js'
import axios from 'axios'

export default {
	components: { ProductList, ProductFilter },
	data() {
		return {
			items: [],
			pages: {},
			params: { page: 1 },
			title: 'Купить шины | SHINPI'
		}
	},
	methods: {
		async selectParams(par) {
			this.params = { page: 1, ...par }
			this.$router.push({ name: 'category', query: par })
			await this.productsGet(1)
		},
		async productsGet(page) {
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			})
			if (page) this.params.page = Number(page)
			const res = (await ProductService.getByCategory(this.$route.params.category, { ...this.params, limit: 36,  quantity: 1 })).data
			this.items = res.result

			this.pages = res.pages
			this.pages.last_page = this.pages.total[this.pages.total.length - 1]
			if (this.params.page >= 3) {
				this.pages.showPage = this.pages.total.slice(this.params.page - 3, this.params.page + 2)
			} else {
				this.pages.showPage = this.pages.total.slice(0, this.params.page + 5 - this.params.page)
			}
			this.$router.push(({ name: 'category', query: { ...this.params } }))
		}
	},
	async created() {
		document.title = this.title
		this.params = { ...this.params, ...this.$route.query }
		this.params.page = Number(this.params.page)
		await this.productsGet()
	}
}
</script>
<style>
.pagination {
	margin: 30px auto;
	width: 100%;
}
.pagination ul {
	display: flex;
	list-style: none;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center
}
.pagination ul li {
	cursor: pointer;
	padding: 7px 8px;
	margin: 0 5px;
	text-align: center;
	min-width: 28px;
	border-radius: 6px;
}
.pagination ul li.select_page {
	background: #FFBE00;
	color: #000;
	font-weight: 600;
}
</style>