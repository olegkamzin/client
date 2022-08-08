<template>
<div class="quantity_button">
	<span class="quantity_minus" @click="quantity <= 1 ? quantity = 1 : quantity --"></span>
	<input class="quantity_button_input" type="text" @input="quantityInput" v-model.number="quantity">
	<span class="quantity_plus" @click="quantity >= product.quantity ? quantity = product.quantity : quantity ++"></span>
</div>
</template>

<script>
export default {
	name: 'quantity-button',
	props: {
		totalQuantity: {
			type: Number,
			default: 1
		}
	},
	methods: {
		quantityInput() {
			this.quantity < 1 ? this.quantity = 1 : ''
			this.quantity >= this.product.quantity ? this.quantity = this.product.quantity : ''
		}
	}
}
</script>

<style>
.quantity_button { background: #F0F0F0; height: 32px; border-radius: 4px; display: flex; align-items: center; justify-content: center; }
.quantity_button span { width: 30px; height: 28px; position: relative; cursor: pointer; }
.quantity_button_input { background: #FFF; border-radius: 6px; border: 0; text-align: center; height: 28px; width: 30px; font-weight: 600; outline: 0; }
.quantity_plus:before, .quantity_minus:before  { height: 2px; width: 12px; content: ""; display: block; background: #000; border-radius: 2px; position: absolute; top: 13px; left: 9px; }
.quantity_plus:after { height: 12px; width: 2px; content: ""; display: block; background: #000; border-radius: 2px; position: absolute; top: 9px; left: 14px; }
</style>