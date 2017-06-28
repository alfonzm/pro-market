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
				    <router-link to="/sell" class="ui large fluid green submit button">
					    Sell an item
				    </router-link>
				</div>
			</div>
		</div>

		<!-- Popular items list -->
		<h1>Latest</h1>
		<div v-if="loadingLatestItems">
			Loading...
		</div>
		<pro-item-listing-list v-else :items="latestItems" />
	</div>
</template>

<script>
import ItemListingList from '../components/ItemListingList.vue'
import ItemsStore from '../helpers/ItemsStore'
import UserStore from '../helpers/UserStore'
import _ from 'lodash'

export default {
	data() {
		return {
			latestItems: [],
			loadingLatestItems: true
		}
	},
	mounted() {
		setTimeout(() => {
			UserStore.serverSetting = 'thor'
		}, 3000)
		ItemsStore.getLatestItems(UserStore.serverSetting, 10, (items) => {
			this.latestItems = items
			this.loadingLatestItems = false
		})
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