<template>
	<div id="home">
		<!-- Masthead -->
		<header class="ui container center aligned segment">
			<h1 class="ui header">
				Sell / Buy / Trade Items
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
		<div class="ui grid">
			<!-- Latest items list -->
			<div class="ten wide column">
				<h1>Latest items ({{ serverSetting | capitalize }})</h1>

				<!-- Loading items -->
				<div v-if="loadingLatestItems">
					Loading...
				</div>
				<!-- Display list items -->
				<div v-else>
					<pro-item-listing-list :items="latestItems" />
					<router-link :to="'/sell/' + serverSetting">View all...</router-link>
				</div>
			</div>
			<div class="six wide column">
				<h1>Sidebar</h1>
			</div>
		</div>
	</div>
</template>

<script>
import ItemListingList from '../components/ItemListingList.vue'
import ItemsStore from '../stores/ItemsStore'
import UserStore from '../stores/UserStore'
import _ from 'lodash'

export default {
	data() {
		return {
			serverSetting: UserStore.getServer(),
			latestItems: [],
			loadingLatestItems: true
		}
	},
	mounted() {
		this.loadLatestItems()
		bus.$on('change-server-setting', (newServer) => {
			this.loadLatestItems()
			this.serverSetting = newServer
		})
	},
	methods: {
		loadLatestItems() {
			this.loadingLatestItems = true

			ItemsStore.getLatestItems(UserStore.getServer(), 10, (items) => {
				this.latestItems = items
				this.loadingLatestItems = false
			})
		}
	},
	components: {
		'pro-item-listing-list': ItemListingList
	},
}
</script>

<style lang="scss">
#home header.segment {
	padding: 50px 0;
}
</style>