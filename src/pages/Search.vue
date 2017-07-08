<template>
	<div id="search"> 
		<h1>Search</h1>

		<form class="ui large stackable form" v-on:submit.prevent="search">
			<div class="ui fluid action input left icon">
				<i class="search icon"></i>
				<input type="text" placeholder="Search: ex. Red Potions, Slotted Muffler, +7 Quad Bloody Main Gauche" v-model="searchTerm">
				<button class="ui large button" type="submit">Search</button>
			</div>
		</form>

		<pro-item-listing-list :items="items" class="search-results-item-list" :loading="loading" searchHighlighting="true" />
	</div>
</template>

<script>
import ItemListingList from '../components/ItemListingList.vue'
import Helpers from '../helpers/Helpers'
import ItemStore from '../stores/ItemStore'
import UserStore from '../stores/UserStore'
import fuzzy from 'fuzzy'

export default {
	watch: {
		searchTerm: function(newSearchTerm, oldSearchTerm) {
			clearTimeout(this.searchTimeout)
			this.searchTimeout = setTimeout(this.search, 200)
		},
	},
	created() {
		// Watch for serverSetting change
		this.$store.watch((state) => {
			return state.serverSetting
		}, () => {
			// on change serverSetting
			this.serverSetting = this.$store.state.serverSetting
			this.search()
		})
	},
	mounted() {
		this.serverSetting = this.$store.state.serverSetting
		this.searchTerm = this.$route.query.s
		this.search()
	},
	methods: {
		search() {
			this.loading = true
			this.$router.replace({
				path: 'search',
				query: { s: this.searchTerm }
			})

			// Get all items of current server and cache it to the store
			if(!this.$store.state.sellItems[this.serverSetting]) {
				this.fetchAndCacheAllItemsOfCurrentServer(this.serverSetting)
			} else {
				// If already cached, refresh cache if last updated > 30 secs
				var secondsSinceCacheLastUpdated = Math.abs(this.$store.state.sellItems.lastUpdated - Date.now())/1000

				if(secondsSinceCacheLastUpdated > 30) {
					this.fetchAndCacheAllItemsOfCurrentServer(this.serverSettingSetting)
				} else {
					this.filterItems()
				}
			}
		},
		filterItems() {
			let cachedItems = Helpers.convertObjectsToArray(this.$store.state.sellItems[this.serverSetting])
			let options = {
				pre: '<strong>',
				post: '</strong>',
				extract: (el) => { return el.name }
			}
			let results = fuzzy.filter(this.searchTerm, cachedItems, options)
			this.items = results.map((el) => {
				el.original.highlightedName = el.string
				return el.original 
			})
			this.loading = false
		},
		fetchAndCacheAllItemsOfCurrentServer() {
			ItemStore.getAllItems(this.serverSetting, (items) => {
				this.$store.commit('setSellItems', items, this.serverSetting)
				this.filterItems()
			})
		}
	},
	data() {
		return {
			serverSetting: null,
			searchTerm: '',
			items: [],
			loading: true,
			searchTimeout: null,
		}
	},
	components: {
		'pro-item-listing-list': ItemListingList
	},
}
</script>

<style lang="scss">
#search {
	.search-results-item-list {
		margin-top: 30px;
	}
}
</style>