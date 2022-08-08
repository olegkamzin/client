<template>
	<div class="popup_main" v-if="show" @click.stop="hidePopup">
		<div @click.stop class="popup_content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'popup-main',
	props: {
		show: {
            type: Boolean,
            default: false
        }
	},
	methods: {
        hidePopup() {
            this.$emit('update:show', false)
        }
    }
}
</script>

<style>
.popup_main { top: 0; bottom: 0; right: 0; left: 0; background: rgba(0, 0, 0, 0.5); position: fixed; display: flex; }
.popup_content { margin: auto; background: #FFF; box-shadow: 0 5px 50px rgba(0, 0, 0, 0.150); border-radius: 10px; min-height: 50px; min-width: 300px; padding: 30px; }
</style>