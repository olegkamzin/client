<template>
<div class="filter">
	<select-main v-model="selectedWidth" :options="params.width"></select-main>
	<select-main v-model="selectedHeight" :options="params.height"></select-main>
	<select-main v-model="selectedDiameter" :options="params.diameter"></select-main>
	<select-main v-model="selectedSeason" :options="params.season"></select-main>
	<select-main v-model="selectedBrand" :options="params.brand"></select-main>
</div>
</template>

<script>
import SelectMain from './ui/SelectMain.vue'
import FilterService from '@/http/api/FilterService'

export default {
	name: 'product-filter',
	components: {
		SelectMain
	},
	props: {
		sortFilter: {
			type: Array
		}
	},
	data() {
		return {
			selectedWidth: 'none',
			selectedHeight: 'none',
			selectedDiameter: 'none',
			selectedSeason: 'none',
			selectedBrand: 'none',
			filter: {},
			params: {}
		}
	},
	methods: {
		async getFilter(slug) {
			return (await FilterService.get(slug)).data
		}
	},
	async mounted() {
		
	},
	async beforeMount() {
		this.params = await this.getFilter('tyres')
	},
	async beforeCreate() {
		
	},
	watch: {
		selectedWidth(newValue) {
			if (newValue === 'none') {
				delete this.filter.width
				return this.$emit('sortFilter', this.filter)
			}
			this.filter.width = newValue
			this.$emit('sortFilter', this.filter)
		},
		selectedHeight(newValue) {
			if (newValue === 'none') {
				delete this.filter.height
				return this.$emit('sortFilter', this.filter)
			}
			this.filter.height = newValue
			this.$emit('sortFilter', this.filter)
		},
		selectedDiameter(newValue) {
			if (newValue === 'none') {
				delete this.filter.diameter
				return this.$emit('sortFilter', this.filter)
			}
			this.filter.diameter = newValue
			this.$emit('sortFilter', this.filter)
		},
		selectedSeason(newValue) {
			if (newValue === 'none') {
				delete this.filter.season
				return this.$emit('sortFilter', this.filter)
			}
			this.filter.season = newValue
			this.$emit('sortFilter', this.filter)
		},
		selectedBrand(newValue) {
			if (newValue === 'none') {
				delete this.filter.brand
				return this.$emit('sortFilter', this.filter)
			}

			this.filter.brand = newValue
			this.$emit('sortFilter', this.filter)
		}
	}
}
</script>

<style>
.filter {
	width: 1020px;
	border-radius: 6px;
	margin: 30px auto;
	background: #FFF;
	padding: 20px;
	display: grid;
	gap: 20px;
	grid-template-columns: 180px 180px 180px 180px 180px;
}

@media screen and (max-width: 1020px) {
.filter { width: 100%; grid-template-columns: calc(50% - 10px) calc(50% - 10px); border-radius: 0; } 
}
</style>