<template>
	<div>
		<div v-for="item in items">
			<pro-item-listing
				:title="item.title"
				:quantity="item.quantity"
				:price="item.price"
				:description="item.description"
				/>
		</div>
	</div>
</template>

<script>
import ItemListing from './ItemListing.vue';
import Store from '../Store';

export default {
	created() {
	},
	props: ['items'],
	components: {
		'pro-item-listing': ItemListing
	},
}
</script>