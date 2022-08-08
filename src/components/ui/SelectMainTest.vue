<template>
<div class="select">
	<input :optionSearch="optionSearch" @focus="optionsVisible = true" @input="selectSearch(optionSearch)">
	<div v-if="optionsVisible" class="select_options">
		<div class="select_option" v-for="option in options" :key="option.value" @click="selectOption(option)">{{ option.name }}</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'select-main',
	props: {
		modelValue: {
			type: Object
		},
		options: {
			type: Array,
		},
		optionsVisible: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			selectedOption: {
				volue: '',
				name: ''
			},
			optionSearch: ''
		}
	},
	methods: {
		selectOption(option) {
			this.selectedOption = option
			this.$emit('update:modelValue', option)
			this.optionSearch = option.name
		},
		selectSearch() {
			console.log(this.optionSearch);
		}
	}
}
</script>

<style>
.select { min-width: 150px; position: relative; }
.select input { width: 100%; height: 30px; background: #F0F0F0; padding: 0 15px; border: 0; border-radius: 6px; outline: none; }
.select input:focus { background: #e1e1e1; }
.select_options { position: absolute; top: 30px; width: 100%; background: #FFF; box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15); padding: 5px 0; border-radius: 6px; }
.select_option { cursor: pointer; padding: 5px 10px; }
.select_option:hover { background: #e2e2e2; }
</style>