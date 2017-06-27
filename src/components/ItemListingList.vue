<template>
	<div>
		<pro-item-listing name="Test" price="123" qty="1"></pro-item-listing>
		<pro-item-listing name="Test" price="123" qty="1"></pro-item-listing>
		<pro-item-listing name="Test" price="123" qty="1"></pro-item-listing>
	</div>
</template>

<script>
import ItemListing from './ItemListing.vue';
import Store from '../Store';

export default {
	created() {
	},
	components: {
		'pro-item-listing': ItemListing
	},
}
</script>