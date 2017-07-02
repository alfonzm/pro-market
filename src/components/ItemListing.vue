<template>
	<div class="item-listing">
		<h3 class="ui header">
			{{ name }}
			<div class="sub header">Price: {{ price }} / Qty: {{ quantity }}</div>
		</h3>
	</div>
</template>

<script>
	export default {
		props: [
			'name',
			'quantity',
			'price',
			'description',
			'server',
		],
		methods: {
		}
	}
</script>

<style lang="scss">
.item-listing {
	padding: 10px 0;
}
</style>