<template>
	<svg :width="width" :height="height" viewBox="0 0 16 16" fill="#000" xmlns="http://www.w3.org/2000/svg">
		<path d="M6.205 15.247a1.78 1.78 0 1 1 0-3.562 1.78 1.78 0 0 1 0 3.562zm6.234 0a1.78 1.78 0 1 1 0-3.562 1.78 1.78 0 0 1 0 3.562zM.829 2.712A.857.857 0 0 1 .829 1h1.025c.803 0 1.498.557 1.672 1.341l1.116 5.024c.174.783.869 1.34 1.672 1.34h6.69l1.283-5.137H5.966a.857.857 0 0 1 0-1.711h8.321a1.712 1.712 0 0 1 1.662 2.128L14.665 9.12a1.712 1.712 0 0 1-1.662 1.297H6.314a3.425 3.425 0 0 1-3.343-2.682L1.854 2.712H.829z"/>
	</svg>
</template>

<script>
export default {
	name: 'icon-cart',
	props: {
		width: {
			type: [Number, String],
			default: 16
		},
		height: {
			type: [Number, String],
			default: 16
		},
	}
}
</script>