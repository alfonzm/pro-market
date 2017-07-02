<template>
	<div>
		<template v-if="!item.id || !user.name">
			Loading...
		</template>
		<template v-else>
			<div class="ui stackable grid">
				<div class="row item-content">
					<div class="ten wide column">
						<!-- ITEM HEADER -->
						<div class="item-header">
							<h1 class="ui header" id="item-name">
								{{ item.name }}
							</h1>
							<h4 class="ui header" id="item-metadata">
								<img class="ui avatar image" :src="user.avatarUrl">
								<span>by <router-link to="">{{ user.name }}</router-link></span> <span id="time">— Posted {{ createdDate }}</span>
							</h4>
						</div>

						<!-- TAGS -->
						<div class="ui labels">
							<div class="ui label"> Weapon </div> <div class="ui label"> Swordsman </div> <div class="ui label"> Knight </div> <div class="ui label"> Great for PvP </div> <div class="ui label"> Great for PvM </div> <div class="ui label"> Great for WoE </div> </div>

						<div class="ui divider"></div>

						<!-- MORE INFO -->
						<p><strong>Quantity</strong>: {{ item.quantity }}</p>
						<p><strong>Accepting offers</strong>:
							<i :class="['ui icon', { checkmark: item.acceptOffers }, { x: !item.acceptOffers }]"></i>
							{{ item.acceptOffers ? 'Yes' : 'No' }}
						</p>
						<p><strong>Accepting trade</strong>:
							<i :class="['ui icon', { checkmark: item.acceptTrades }, { x: !item.acceptTrades }]"></i>
							{{ item.acceptTrades ? 'Yes' : 'No' }}
						</p>
						<p v-if="item.description"><strong>Description</strong>: {{ item.description }}</p>
						<p><strong>Last updated:</strong> {{ updatedDate }}</p>
					</div>

					<!-- sidebar -->
					<div class="six wide column item-actions">
						<h1 class="ui header centered" id="item-price">
							{{ itemPrice }} zeny
							<div class="sub header">
								Price
							</div>
						</h1>

						<div class="ui divider"></div>

						<router-link to="/buy/" class="ui fluid button green">
							<i class="icon shopping cart"></i> Buy item
						</router-link><br/>
						<router-link to="/buy/offer" class="ui fluid button basic">
							<i class="icon money"></i> Leave offer
						</router-link><br/>
						<router-link to="/contact/" class="ui fluid button basic">
							<i class="icon mail outline"></i> Contact seller
						</router-link><br/>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import ItemStore from '../stores/ItemStore'
import UserStore from '../stores/UserStore'
import numeral from 'numeral'
import moment from 'moment'

export default {
	mounted() {
		this.item = this.$store.state.selectedItem

		if(!this.item.id) {
			ItemStore.getItemWithUserById(this.$route.params.sellItemId, (item) => {
				item.id = this.$route.params.sellItemId
				this.item = item
				this.user = item.user
				this.$store.commit('setSelectedItem', this.item)
			})
		} else {
			// if no user, get the user owner
			if(!this.item.user) {
				UserStore.getUserById(this.item.userId, (user) => {
					this.user = user
					this.$store.commit('setSelectedItem', this.item)
				})
			} else {
				this.user = this.item.user
			}
		}
	},
	data() {
		return {
			item: {},
			user: {}
		}
	},
	methods: {
		// isAccepting: function(isAccepting) {
		// 	if(isAccepting) {
		// 		return 'Yes'
		// 	} else {
		// 		return 'No'
		// 	}
		// },
	},
	computed: {
		itemPrice: function() {
			return numeral(this.item.price).format('0,0')
		},
		createdDate: function() {
			return moment(this.item.createdAt).fromNow()
		},
		updatedDate: function() {
			if(this.item.updatedAt) {
				return moment(this.item.updatedAt).fromNow()
			}

			return moment(this.item.createdAt).fromNow()
		},
	}
}
</script>

<style lang="scss">
#item-name {
	font-size: 36pt;
	font-weight: 300;
}

.item-header {
	h4.ui.header {
		margin: 0;
	}

	margin-bottom: 20px;
}

#item-price {
	font-size: 36pt;
	font-weight: 300;
	// margin-bottom: 40px;
}

.item-actions .button {
	font-size: 1.2em;
	padding: 20px 0;
	font-weight: 300 !important;
}

#time {
	font-weight: 300;
}
</style>