<template>
	<select class="select" v-bind="modelValue" @change="changeOption">
		<option v-for="option in options" :key="option.value" :value="option.value">{{ option.name }}</option>
	</select>
</template>

<script>
export default {
	name: 'select-main',
	props: {
		modelValue: {
			type: [String, Number]
		},
		options: {
			type: [String, Array],
			default: 'none'
		}
	},
	methods: {
		changeOption(event) {
			this.$emit('update:modelValue', event.target.value)
		}
	}
}
</script>

<style>
.select { padding: 0 15px; height: 30px; line-height: 30px; background: #F0F0F0; color: #000; border: 0; border-radius: 6px; font-weight: 600; outline: none; -webkit-appearance: none; }
.select:active { background: #e1e1e1; }
</style>