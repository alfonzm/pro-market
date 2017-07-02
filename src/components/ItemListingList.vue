<template>
	<div>
		<div class="ui links items">
			<div v-for="(item, itemId) in items" class="item">
				<div class="content">
					<h1 class="header">
						<a :href="'/sell/item/' + itemId" @click.prevent="viewSellItem(itemId, item)">{{ item.name }}</a>
					</h1>
					<div class="description">
						<p>Price: {{ item.price }}</p>
						<p>Quantity: {{ item.quantity }}</p>
						<p>Description: {{ item.description }}</p>
					</div>
				</div>
				<!-- <pro-item-listing
					:name="item.name"
					:quantity="item.quantity"
					:price="item.price"
					:description="item.description"
					/> -->
			</div>
		</div>
	</div>
</template>

<script>
import ItemListing from './ItemListing.vue'

export default {
	created() {
	},
	props: ['items'],
	components: {
		'pro-item-listing': ItemListing
	},
	methods: {
		viewSellItem(itemId, item) {
			item.id = itemId
			this.$store.commit('setSelectedItem', item)
			this.$router.push('/sell/item/' + itemId)
		}
	}
}
</script>