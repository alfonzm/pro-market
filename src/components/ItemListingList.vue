<template>
	<div id="item-listing"> 
		<table class="ui very basic large unstackable table">
			<thead>
				<tr>
					<th colspan="2">Item</th>
					<th class="center aligned">Qty</th>
					<th class="center aligned">Price</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in latestItems">
					<td class="one wide"><img src="http://placeimg.com/480/480/tech" class="ui image avatar"></td>
					<td>
						<a :href="'/sell/item/' + item.id" @click.prevent="viewSellItem(item)"><strong>{{ item.name }}</strong></a><br/>
						<span class="item-username">{{ moment(item.createdAt).fromNow() }}</span>
					</td>
					<td class="two wide center aligned">
						{{ item.quantity }}
					</td>
					<td class="three wide right aligned">
						{{ numeral(item.price).format('0,0') }}z
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th colspan="4">
						<router-link :to="'/sell/'">View all...</router-link>
					</th>
				</tr>
			</tfoot>
		</table>
	</div>
</template>

<script>
import UserStore from '../stores/UserStore'
import ItemListing from './ItemListing.vue'
import numeral from 'numeral'
import moment from 'moment'
import _ from 'lodash'

export default {
	created() {

	},
	props: ['items'],
	components: {
		'pro-item-listing': ItemListing
	},
	methods: {
		viewSellItem(item) {
			this.$store.commit('setSelectedItem', item)
			this.$router.push('/sell/item/' + item.id)
		}
	},
	computed: {
		latestItems() {
			var latestItems = _.map(this.items, (item, key) => {
				item.id = key
				return item
			})
			return _.reverse(latestItems)
		},
		numeral() {
			return numeral
		},
		moment() {
			return moment
		}
	}
}
</script>

<style lang="scss">
#item-listing .item-username {
	font-size: 9pt;
	color: #666;
	font-weight: 300;
}
</style>