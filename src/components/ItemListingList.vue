<template>
	<div id="item-listing">
		<!-- <pre>{{ items }}</pre> -->
		<div v-if="loading">
			<template v-if="loading">
				<br/>
				<div class="ui active centered inline text loader">Loading...</div>
			</template>
		</div>
		<table class="ui very basic large selectable unstackable table" v-else>
			<!-- Header -->
			<thead>
				<tr>
					<th colspan="2">Item</th>
					<th class="center aligned">Qty</th>
					<th class="center aligned">Price</th>
				</tr>
			</thead>
			<!-- If there are items -->
			<tbody>
				<template v-if="items.length > 0">
					<tr v-for="item in items" @click="viewSellItem(item)" class="item-row">
						<td class="one wide"><img src="http://placeimg.com/480/480/tech" class="ui image avatar"></td>
						<td>
							<!-- <a :href="'/sell/item/' + item.id" @click.prevent="viewSellItem(item)"> -->
								<template v-if="searchHighlighting && item.highlightedName">
									<span class="item-highlighted-name" v-html="item.highlightedName"></span>
								</template>
								<template v-else>
									<span>{{ item.name }}</span>
								</template>
							<!-- </a> -->
							<br/>
							<span class="item-username">{{ moment(item.createdAt).fromNow() }}</span>
						</td>
						<td class="two wide center aligned">
							{{ item.quantity }}
						</td>
						<td class="three wide center aligned">
							{{ numeral(item.price).format('0,0') }}z
						</td>
					</tr>
				</template>
				<!-- No items found -->
				<template v-else>
					<tr>
						<td colspan="4">
							<div class="no-items-found">
								No items found.
							</div>
						</td>
					</tr>
				</template>
			</tbody>
			<!-- Table footer, "view all" link -->
			<tfoot v-if="items.length > 0">
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
import numeral from 'numeral'
import moment from 'moment'
import _ from 'lodash'

export default {
	props: ['items', 'loading', 'searchHighlighting'],
	methods: {
		viewSellItem(item) {
			this.$store.commit('setSelectedItem', item)
			this.$router.push('/sell/item/' + item.id)
		}
	},
	computed: {
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
#item-listing {
	.item-username {
		font-size: 9pt;
		color: #666;
		font-weight: 300;
	}

	.no-items-found {
		font-weight: 300;
		color: #666;
		line-height: 2em;
	}

	// the <tr> row
	.item-row {
		&:hover {
			cursor: pointer;
		}
	}

	.item-highlighted-name {
		color: #222;

		strong {
			font-weight: 900;
			color: teal;
		}
	}
}
</style>