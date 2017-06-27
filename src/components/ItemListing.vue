<template>
	<div>
		<h1 class="ui header">
			{{ name }}
			<div class="sub header">Price: {{ price }} / Qty: {{ qty }}</div>
		</h1>
	</div>
</template>

<script>
	export default {
		props: [
			'name',
			'price',
			'qty'
		],
		methods: {
		}
	}
</script>