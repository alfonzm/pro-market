<template>
	<div id="home">
		<!-- Masthead -->
		<header class="ui container center aligned segment">
			<h1 class="ui header">
				pRO Marketplace {{ this.$parent.test }}
				<div class="sub header">
					The best place to buy and sell stuff in Ragnarok Online Philippines!
				</div>
			</h1>
		</header>
		
		<!-- Search box -->
		<div class="ui large form">
			<div class="inline fields">
				<div class="thirteen wide field">
					<div class="ui fluid action input left icon">
						<i class="search icon"></i>
						<input type="text" placeholder="Search: ex. Red Potions, Slotted Muffler, +7 Quad Bloody Main Gauche">
						<div class="ui large basic button">Search</div>
					</div>
				</div>
				<div class="three wide field">
					<div class="ui large fluid green submit button">Sell an item</div>
				</div>
			</div>
		</div>

		<!-- Popular items list -->
		<h1>Popular Items:</h1>
		<pro-item-listing-list></pro-item-listing-list>
	</div>
</template>

<script>
import ItemListingList from '../components/ItemListingList.vue';

export default {
	created() {
	},
	components: {
		'pro-item-listing-list': ItemListingList
	},
}
</script>

<style lang="scss">
#home .segment {
	padding: 50px 0;
}
</style>