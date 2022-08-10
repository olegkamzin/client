<template>
	<div class="footer">
		<div class="footer_block">

		</div>
	</div>
</template>

<script>
export default  {
	name: 'footer-main'
}
</script>

<style>
.footer {
    background: #272727;
    padding: 30px 0;
}
.footer_block {
    width: 1020px;
    margin: 0 auto;
    height: 50px;
}
@media screen and (max-width: 1020px) {
.footer_block { width: 100%; }
}
</style>