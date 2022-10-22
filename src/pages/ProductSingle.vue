<template>
<div class="product" v-if="product.brand && product.model && product.params">
	<div class="product_title">
		<h1>{{ product.brand.name }} {{ product.model.name }} {{ product.params.width }}/{{ product.params.height }} R{{ product.params.diameter }} {{ product.params.load_index }}{{ product.params.speed_index }}</h1>
	</div>
	<div class="wrapper">
		<div class="product_body">
			<div class="product_img">
				<img v-if="product.model.img.length !== 0" :src="'https://media.shinpi.ru/800/' + product.model.img[0]">
				<img v-else src="../assets/no-img.webp">
			</div>
			<div class="product_info">
				<div class="product_params">
					<ul>
						<li><div><icon-width/>{{ product.params.width }}</div> ширина</li>
						<li><div><icon-height/>{{ product.params.height }}</div> профиль</li>
						<li><div><icon-diameter/>{{ product.params.diameter }}</div> диаметр</li>
						<li><div v-if="product.params.season === '1'"><icon-snow/>Зима</div><div v-else><icon-summer/>Лето</div>сезон</li>
						<li><div><icon-weight/>{{ product.params.load_index }}</div> индекс нагрузки</li>
						<li><div><icon-speed/>{{ product.params.speed_index }}</div> индекс скорости</li>
						<li class="articul">{{ product.article }}</li>
					</ul>
				</div>
				<div class="product_purchase">
					<div class="product_buy">
						<div class="buy_info">
							<span class="buy_price">{{ (product.price * quantity).toLocaleString() }} ₽</span>
							<div class="quantity_button">
								<span class="quantity_minus" @click="quantity <= 1 ? quantity = 1 : quantity --"></span>
								<input class="quantity_button_input" type="text" @input="quantityInput" v-model.number="quantity">
								<span class="quantity_plus" @click="quantity >= product.quantity ? quantity = product.quantity : quantity ++"></span>
							</div>
						</div>
						<button-main class="button-yellow"><span>В корзину</span><icon-cart width="18" height="18"/></button-main>
						<div class="buy_remains">
							<span style="color: #1BB600" v-if="product.quantity > 6">В наличии много</span>
							<span style="color: #1BB600" v-else-if="product.quantity <= 6 && product.quantity > 0">Осталось {{ product.quantity }}</span>
							<span style="color: #ae0000" v-else-if="product.quantity === 0">Нет в наличии</span>
						</div>
					</div>
					<div class="product_conditions">
						<p>Оплата онлайн или при получении</p>
						<div class="conditions_delivery">Бесплатная доставка по всей России</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import ButtonMain from '@/components/ui/ButtonMain.vue'
import IconWidth from '@/components/ui/icons/IconWidth.vue'
import IconHeight from '@/components/ui/icons/IconHeight.vue'
import IconDiameter from '@/components/ui/icons/IconDiameter.vue'
import IconWeight from '@/components/ui/icons/IconWeight.vue'
import IconSpeed from '@/components/ui/icons/IconSpeed.vue'
import IconSnow from '@/components/ui/icons/IconSnow.vue'
import IconSummer from '@/components/ui/icons/IconSummer.vue'
import IconCart from '@/components/ui/icons/IconCart.vue'
import ProductService from '@/http/api/ProductService'
import { create } from 'domain'

export default {
	components: { ButtonMain, IconWidth, IconHeight, IconDiameter, IconWeight, IconSpeed, IconSnow, IconSummer, IconCart },
	data() {
		return {
			product: {},
			quantity: 1
		}
	},
	methods: {
		async productGet() {
			this.product = (await ProductService.getOne(this.$route.params.id)).data
		},
		quantityInput() {
			this.quantity < 1 ? this.quantity = 1 : ''
			this.quantity >= this.product.quantity ? this.quantity = this.product.quantity : ''
		}
	},
	async created() {
		await this.productGet()
		document.title = `${this.product.brand.name} ${this.product.model.name} ${this.product.params.width}/${this.product.params.height} R${this.product.params.diameter} ${this.product.params.load_index}${this.product.params.speed_index} | SHINPI`
	}
}
</script>

<style>
.product_title { width: 1020px; margin: 30px auto; }
.product_body { width: 1020px; margin: 0 auto; display: flex; justify-content: space-between; }
.product_img { width: 415px; height: 350px; }
.product_img img { height: 350px; }
.product_info { width: 575px; display: flex; justify-content: space-between; }
.product_params { width: 220px; padding: 30px 0; }
.product_purchase { width: 330px; padding: 30px; border: 1px solid #F0F0F0; border-radius: 6px; display: flex; flex-direction: column; justify-content: space-between; }
.product_params ul { list-style: none; }
.product_params ul li { margin: 0 0 20px 0px; }
.product_params ul li div { background: #F0F0F0; padding: 5px 10px; margin: 0 10px 0 0; font-weight: 600; border-radius: 4px; display: inline-flex; }
.product_params ul li div svg { margin: 0 10px 0 0; }
.product_params ul li.articul { font-size: 12px; color: #2e2e2e; }
.buy_info { display: flex; justify-content: space-between; align-items: center; margin: 0 0 15px 0; }
.buy_price { font-size: 30px; font-weight: 600; }
.buy_button { padding: 0 20px; height: 36px; background: #FFBE00; color: #000; border-radius: 4px; border: 0; text-transform: uppercase; font-size: 14px; font-weight: 600; width: 100%; }
.product_buy button { width: 100%; height: 40px; justify-content: space-between; font-size: 15px; padding: 0 20px; }
.conditions_delivery { background: url(../assets/icons/delivery.svg) no-repeat 90% center #ECF9E6; border-radius: 6px; margin: 15px 0 0 0; padding: 15px 70px 15px 30px; font-weight: 600; }
.buy_remains { margin: 5px 0; text-align: right; }
.buy_remains span { font-size: 10px; font-weight: 700; text-transform: uppercase; }
.quantity_button { background: #F0F0F0; height: 32px; border-radius: 4px; display: flex; align-items: center; justify-content: center; }
.quantity_button span { width: 30px; height: 28px; position: relative; cursor: pointer; }
.quantity_button_input { background: #FFF; border-radius: 6px; border: 0; text-align: center; height: 28px; width: 30px; font-weight: 600; outline: 0; }
.quantity_plus:before, .quantity_minus:before  { height: 2px; width: 12px; content: ""; display: block; background: #000; border-radius: 2px; position: absolute; top: 13px; left: 9px; }
.quantity_plus:after { height: 12px; width: 2px; content: ""; display: block; background: #000; border-radius: 2px; position: absolute; top: 9px; left: 14px; }

@media screen and (max-width: 1020px) {
.product_title { width: 100%; margin: 20px 0; padding: 0 20px; }
.product_body { width: 100%; margin: 0 auto; display: flex; flex-direction: column; align-items: center; }
.product_img { width: 100%; height: 300px; margin: 20px 0; display: flex; justify-content: center; }
.product_img img { height: 100%; }
.product_info { width: 100%; flex-direction: column-reverse; }
.product_purchase { width: 100%; }
.product_params { width: 100%; }
}
</style>
