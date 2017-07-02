<template>
	<div v-if="isAuthenticated">
		<h1 class="ui header">
			Sell an item
			<div class="sub header">Create an item to sell to other players!</div>
		</h1>
		<div :class="['ui form', formSize, { loading: submitting }]">
			<div class="required field">
				<label>Name</label>
				<input v-model="newItem.name" type="text" placeholder="ex. +10 Main Gauche">
			</div>
			<div class="required five wide field">
				<label>Server</label>
				<div class="ui selection dropdown" id="server">
					<input type="hidden" name="server" :value="serverSetting">
					<i class="dropdown icon"></i>
					<div class="default text"></div>
					<div class="menu">
						<div class="item" data-value="thor">Thor</div>
						<div class="item" data-value="loki">Loki</div>
					</div>
				</div>
			</div>
			<div class="required fields">
				<div class="five wide field">
					<label>Quantity</label>
					<div class="ui right labeled input">
						<input v-model="newItem.quantity" type="number" value="1">
						<div class="ui basic label">pc(s)</div>
					</div>
				</div>
			</div>
			<div class="fields">
				<div class="five wide field">
					<label>Price</label>
					<div class="ui right labeled input">
						<input v-model="newItem.price" type="number" value="" placeholder="(Optional) ex. 100,000">
						<div class="ui basic label">zeny</div>
					</div>
				</div>
				<div class="field">
					<label>&nbsp;</label>
					<button id="trades" :class="['ui button basic', formSize, { green: newItem.acceptTrades }]" @click="toggleTrades">
						<template v-if="newItem.acceptTrades">
							<i class="icon check"></i> Accepting trades
						</template>
						<template v-else>
							Accept trades
						</template>
					</button>
				</div>
				<div class="field">
					<label>&nbsp;</label>
					<button id="offers" :class="['ui button basic', formSize, { green: newItem.acceptOffers }]" @click="toggleOffers">
						<template v-if="newItem.acceptOffers">
							<i class="icon check"></i> Accepting offers
						</template>
						<template v-else>
							Accept offers
						</template>
					</button>
				</div>
			</div>
			<div class="field">
				<label>Description</label>
				<textarea v-model="newItem.description" rows="3" placeholder="(Optional) ex. PM me your offers ingame, I'll accept trade too"></textarea>
			</div>
			<button :class="'ui submit primary button huge'" @click="submitSellForm">
				<i class="icon check"></i>
				Start selling
			</button>
		</div>
	</div>
	<div v-else>
		Loading...
	</div>
</template>

<script>
import firebase from 'firebase'
import FirebaseStore from '../stores/FirebaseStore'
import UserStore from '../stores/UserStore'

const db = FirebaseStore.db
const sellItemsRef = db.ref('sellItems')

export default {
	data() {
		return {
			isAuthenticated: false,
			formSize: 'large',
			server: null,
			submitting: false,
			serverSetting: UserStore.getServer(),

			newItem: {
				name: null,
				quantity: 1,
				acceptOffers: false,
				acceptTrades: false,
				price: null,
				description: null,
				userId: null
			}
		}
	},
	mounted() {
		setTimeout(() => {
			$('.dropdown').dropdown()
		}, 50)

		FirebaseStore.checkLoggedIn(() => {
			this.isAuthenticated = true
			this.newItem.userId = FirebaseStore.getLoggedInUser().uid
		}, () => {
			this.$router.push('/login')
		})
	},
	activate() {
		console.log('hi');
	},
	methods: {
		submitSellForm() {
			this.server = $('#server.dropdown').dropdown('get value') || null
			this.submitting = true

			var newSellItemRef = sellItemsRef.child(this.server).push()

			this.newItem.createdAt = firebase.database.ServerValue.TIMESTAMP

			newSellItemRef.set(this.newItem, (err) => {
				if(err) {
					console.log(err)
					return
				}

				this.$router.push('/sell/item/' + newSellItemRef.key)
			})
		},
		setServer(server){
			this.server = server
		},
		toggleOffers() {
			this.newItem.acceptOffers = !this.newItem.acceptOffers
		},
		toggleTrades() {
			this.newItem.acceptTrades = !this.newItem.acceptTrades
		},
	},
	firebase: {
		sellItems: db.ref('sellItems')
	}
}
</script>

<style lang="scss">
.field, .fields {
	padding-top: 5px;
}
</style>