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
		<div class="ui large stackable form">
			<div class="ui stackable grid">
				<div class="twelve wide column">
					<div class="ui fluid action input left icon">
						<i class="search icon"></i>
						<input type="text" placeholder="Search: ex. Red Potions, Slotted Muffler, +7 Quad Bloody Main Gauche" v-model="searchTerm">
						<div class="ui large button" @click="search()">Search</div>
					</div>
				</div>
				<div class="four wide column">
				    <router-link to="/sell" class="ui large fluid green submit button">
					    Sell an item
				    </router-link>
				</div>
			</div>
		</div>

		<!-- Popular items list -->
		<div class="ui stackable grid latest-items">
			<!-- Latest items list -->
			<div class="ten wide column">
				<h1>Latest items</h1>

				<!-- Loading items -->
				<div v-if="loadingLatestItems">
					Loading...
				</div>
				<!-- Display list items -->
				<div v-else>
					<pro-item-listing-list :items="latestItems" />
				</div>
			</div>
			<div class="six wide column">
				<h1>Tags</h1>
			</div>
		</div>
	</div>
</template>

<script>
import ItemListingList from '../components/ItemListingList.vue'
import ItemStore from '../stores/ItemStore'
import UserStore from '../stores/UserStore'
import _ from 'lodash'

export default {
	data() {
		return {
			serverSetting: this.$store.state.serverSetting,
			latestItems: [],
			loadingLatestItems: true,
			searchTerm: ''
		}
	},
	mounted() {
		this.loadLatestItems()
		this.$store.watch((state) => {
			// watch server setting change
			return state.serverSetting
		}, () => {
			// on server setting change
			this.loadLatestItems()
			this.serverSetting = this.$store.state.serverSetting
		})
	},
	methods: {
		loadLatestItems() {
			this.loadingLatestItems = true

			ItemStore.getLatestItems(this.$store.state.serverSetting, 5, (items) => {
				this.latestItems = items
				this.loadingLatestItems = false
			})
		},
		search() {
			this.$router.push({
				path: 'search',
				query: { s: this.searchTerm }
			})
		}
	},
	components: {
		'pro-item-listing-list': ItemListingList
	},
}
</script>

<style lang="scss">
#home {
	header.segment {
		padding: 50px 0;
	}

	.latest-items {
		margin-top: 50px;
	}
}
</style>