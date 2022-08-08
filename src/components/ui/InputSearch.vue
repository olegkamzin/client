<template>
<input class="search" type="text" v-model="search" placeholder="Поиск..." />
</template>

<script>
export default {
	name: 'imput-search',
	props: {
		search: {
			type: String
		}
	}
}
</script>

<style>
.search {
	border: 0;
	outline: none;
	height: 30px;
	line-height: 30px;
	padding: 0 15px;
	background: #494949;
	color: #FFF;
	border-radius: 6px;
	margin: 0 10px;
	width: 340px;
}
.search:focus {
	background: #3b3b3b;
}
</style>