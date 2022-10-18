<template>
<product-filter v-on:sortFilter="selectParams"></product-filter>
<product-list :items="items" />
<div ref="page_observer" class="page_observer"></div>
</template>
<script>
import ProductList from '@/components/ProductList.vue'
import ProductFilter from '@/components/ProductFilter.vue'
import ProductService from '@/http/api/ProductService.js'
import axios from 'axios'

export default {
	components: { ProductList, ProductFilter, ProductService },
	data() {
		return {
			items: [],
			params: { limit: 24, page: 1 },
			title: 'Все шины — SHINPI'
		}
	},
	methods: {
		selectParams(par) {
			this.params = { limit: 24, page: 1 }
			this.params = { ...this.params, ...par }
			this.$router.push({ name: 'category', query: par })
			this.productsGet()
		},
		async productsGet() {
			this.items = (await ProductService.getByCategory(this.$route.params.category, this.params)).data
		},
		async productsGetMore() {
			this.params.page += 1
			const res = (await ProductService.getByCategory(this.$route.params.category, this.params)).data
			this.items = [...this.items, ...res]
		}
	},
	beforeMount() { document.title = this.title },
	mounted() {
		this.params = { ...this.params, ...this.$route.query }
		this.productsGet()
		const options = {
			rootMargin: '0px',
			threshold: 1.0
		}
		const callback = (entries, observer) => {
			if (entries[0].isIntersecting) {
				this.productsGetMore()
			}
		};
		const observer = new IntersectionObserver(callback, options)
		observer.observe(this.$refs.page_observer)
	}
}
</script>
<style>
.page_observer {
	height: 30px;
}
</style>