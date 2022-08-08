<template>
	<button class="button">
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: 'button-main'
}
</script>

<style>
.button { padding: 0 15px; min-height: 30px; border-radius: 6px; border: 0; text-transform: uppercase; font-weight: 600; display: flex; align-items: center; font-size: 14px; cursor: pointer; }
.button svg { margin: 0 0 0 10px; padding: 0 0 0 10px; }
.button-yellow { background: #FFBE00; color: #000; }
.button-yellow:hover { background: #FFC827; }
.button-yellow:active { background: #e2aa00; }
.button-yellow svg { border-left: 1px solid rgba(0, 0, 0, 0.15); }
.button-gray { background: #494949; color: #ECECEC; }
.button-gray svg { border-left: 1px solid rgba(255, 255, 255, 0.15); }
.button-icon { border: 0; }
.button-icon svg { border: 0; margin: 0; padding: 0; }
</style>