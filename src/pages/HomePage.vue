<template>
<div class="banner">
	<div class="banner_del">
		<div class="banner_text">
			<h3><span>Бесплатная доставка</span> по всему городу</h3>
			<p>Привезем шины в день заказа.</p>
			<button-main class="button-yellow">Подробнее</button-main>
		</div>
		<img class="banner_img" src="../assets/banner-img-1.png" alt="">
	</div>
</div>
<product-filter v-on:sortFilter="selectParams" />
<div class="main-products">
	<product-list :items="items">
		<div class="main-more">
			<button-main class="button-yellow" @click="$router.push({ name: 'category', params: { category: 'tyres' }, query: filter })">Все шины</button-main>
			<p>Посмотрите полный каталог шин в наличии.</p>
		</div>
	</product-list>
	
</div>
</template>

<script>
import ProductList from '@/components/ProductList'
import ButtonMain from '@/components/ui/ButtonMain.vue'
import ProductFilter from '@/components/ProductFilter.vue'
import ProductService from '@/http/api/ProductService.js'

export default {
	components: { ButtonMain, ProductFilter, ProductList },
	data() {
		return {
			items: [],
			params: { limit: 3, page: 1, quantity: 1 },
			filter: {}
		}
	},
	methods: {
		selectParams(par) {
			this.params = { limit: 3, page: 1, quantity: 1, ...par }
			this.filter = par
			this.productsGet()
		},
		async productsGet() {
			this.items = (await ProductService.getByCategory('tyres', this.params)).data.result
		}
	},
	async created() {
		document.title = 'SHINPI — магазин шин и дисков'
		await this.productsGet()
	}
}
</script>

<style>
.banner { margin: 60px 0; }
.banner_del { width: 1020px; margin: 0 auto; display: flex; justify-content: space-evenly; align-items: center; }
.banner_img { width: 260px; }
.banner_text { width: 500px; }
.banner_text h3 { font-size: 38px; font-weight: 800; line-height: 38px; }
.banner_text h3 span { color: #FFBE00; }
.banner_text p { font-size: 16px; margin: 15px 0; }

.main-more { text-align: center; padding: 20px; background: #F0F0F0; border-radius: 6px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.main-more p { margin: 10px 0; }

@media screen and (max-width: 1020px) {
.banner { margin: 30px 10px; }
.banner_del { width: 100%; }
.banner_img { width: 50%; margin: 0; }
.banner_text { width: 50%; }
.banner_text h3 { font-size: 30px; line-height: 30px; }
.banner_text p { font-size: 14px; }
}
</style>