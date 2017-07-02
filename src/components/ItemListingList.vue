<template>
	<div>
		<div class="ui links items">
			<div v-for="(item, itemId) in items" class="item">
				<img src="https://placeimg.com/480/480/tech" class="ui image circular avatar">
				<div class="content">
					<h3 class="ui header">
						<a :href="'/sell/item/' + itemId" @click.prevent="viewSellItem(itemId, item)">{{ item.name }}</a>
						<div class="sub header">
							{{ item.price }}z
						</div>
					</h3>
					<div class="extra">
						<span>Description: {{ item.description }}</span>
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

<style lang="scss">

</style>