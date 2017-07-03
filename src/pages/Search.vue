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

		<pro-item-listing-list :items="items" class="search-results-item-list" :loading="loading" />
	</div>
</template>

<script>
import ItemListingList from '../components/ItemListingList.vue'
import ItemStore from '../stores/ItemStore'
import UserStore from '../stores/UserStore'
import numeral from 'numeral'
import moment from 'moment'
import _ from 'lodash'

export default {
	mounted() {
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
			ItemStore.getLatestItems(UserStore.getServer(), 10, (items) => {
				this.items = items
				this.loading = false
			})
		}
	},
	data() {
		return {
			searchTerm: '',
			items: [],
			loading: true
		}
	},
	computed: {
		numeral() {
			return numeral
		},
		moment() {
			return moment
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