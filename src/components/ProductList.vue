<template>
<div class="wrapper">
	<div class="catalog_block">
		<div class="catalog_items">
			<div class="item" v-for="item in items" :key="item._id">
				<div v-if="item.quantity <= 4" class="quantity">
					<span v-if="item.quantity === 0">Закончились</span>
					<span v-else>Осталось {{ item.quantity }}</span>
				</div>
				<div class="item_info">
					<router-link class="item_img" :to="{ name: 'single', params: { category: 'tyres', id: item._id } }">
						<img v-if="item.model.img.length !== 0" :src="'https://media.shinpi.ru/400/' + item.model.img[0]">
						<img v-else src="../assets/no-img.webp">
					</router-link>
					<div class="params">
						<div class="params_data">
							<span>{{ item.params.width }}</span>
							<span>{{ item.params.height }}</span>
							<span>R{{ item.params.diameter }}</span>
						</div>
						<div class="params_icons">
							<icon-snow v-if="item.params.season === '1'"/><icon-summer v-else/>
						</div>
					</div>
					<router-link :to="{ name: 'single', params: { category: 'tyres', id: item._id } }" class="title">{{ item.brand.name }} {{ item.model.name }}</router-link>
				</div>
				<div class="item_price">
					<button-main class="button-yellow">
						{{ item.price.toLocaleString() }} ₽
						<icon-cart/>
					</button-main>
					<span class="delivery">доставим бесплатно</span>
				</div>
			</div>
			<slot></slot>
		</div>
	</div>
</div>
</template>

<script>
import ButtonMain from '@/components/ui/ButtonMain.vue'
import IconCart from './ui/icons/IconCart.vue'
import IconSnow from '@/components/ui/icons/IconSnow.vue'
import IconSummer from '@/components/ui/icons/IconSummer.vue'

export default {
	components: { ButtonMain, IconCart, IconSnow, IconSummer },
	props: {
		items: {
			type: Array
		}
	}
}
</script>

<style>
.catalog_block {
	width: 1020px;
	margin: 0 auto;
}
.catalog_items {
	display: grid;
	gap: 20px;
	grid-template-columns: 240px 240px 240px 240px;
}
.catalog_items .item {
	border: 1px solid #f0f0f0;
	border-radius: 6px;
	width: 240px;
	transition: 0.15s ease-in;
	display: flex;
	align-content: space-between;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	z-index: 0;
}
.catalog_items .item:hover {
	border: 1px solid #FFBE00;
	box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.08);
}
.catalog_items .item .quantity {
	position: absolute;
    top: 20px;
    right: 0;
    background: #f00;
    color: #FFF;
    padding: 3px 10px;
    font-size: 10px;
	font-weight: 600;
	text-transform: uppercase;
    border-radius: 4px 0 0 4px;
}
.catalog_items .item_info {
	padding: 10px;
}
.catalog_items .item_img {
	display: flex;
	justify-content: center;
}
.catalog_items .item_img img {
	max-width: 185px;
	max-height: 185px;
	margin: 10px 0 20px 0;
}
.catalog_items .item .params {
	display: flex;
}
.catalog_items .item .params_data {
	background: #f0f0f0;
	
	border-radius: 6px;
}
.catalog_items .item .params_data span {
	padding: 3px 10px;
    border-right: 1px solid #FFF;
    font-size: 12px;
    display: inline-block;
}
.catalog_items .item .params_data span:last-child {
	border: 0;
}
.catalog_items .item .params_icons {
	display: flex;
	align-items: center;
	margin: 0 0 0 10px;
}
.catalog_items .item a.title {
	color: #000;
	text-decoration: none;
	font-size: 14px;
	font-weight: 700;
	margin: 10px 0 0 0;
	display: block;
}
.catalog_items .item_price {
	padding: 10px;
	border-top: 1px solid #f0f0f0;
	display: flex;
	flex-wrap: nowrap;
    justify-content: flex-start;
}
.catalog_items .item_price .delivery {
	font-size: 11px;
	width: 60px;
	margin: 0 0 0 15px;
	color: #444;
}

@media screen and (max-width: 1020px) {
.catalog_block { width: 100%; margin: 0; }
.catalog_items { display: grid; gap: 10px; grid-template-columns: calc(50% - 5px) calc(50% - 5px);
}
.catalog_items .item {
	border: 1px solid #f0f0f0;
	border-radius: 6px;
	width: 100%;
	transition: 0.15s ease-in;
	display: flex;
	align-content: space-between;
	flex-direction: column;
	justify-content: space-between;
}
.catalog_items .item_price .delivery { display: none; }
}
</style>