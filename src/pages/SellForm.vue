<template>
	<div v-if="isAuthenticated">
		<h1 class="ui header">
			Sell an item
			<div class="sub header">Create an item to sell to other players!</div>
		</h1>
		<div :class="['ui form', formSize, { loading: form.submitting }]">
			<div class="field">
				<label>Title</label>
				<input v-model="form.title" type="text" placeholder="ex. S>+10 Main Gauche">
			</div>
			<div class="three wide field">
				<label>Server</label>
				<div class="ui selection dropdown" id="server">
					<input type="hidden" name="gender">
					<i class="dropdown icon"></i>
					<div class="default text">Server</div>
					<div class="menu">
						<div class="item" data-value="thor">Thor</div>
						<div class="item" data-value="loki">Loki</div>
					</div>
				</div>
			</div>
			<div class="fields">
				<div class="three wide field">
					<label>Quantity</label>
					<div class="ui right labeled input">
						<input v-model="form.quantity" type="number" value="1">
						<div class="ui basic label">pc(s)</div>
					</div>
				</div>
			</div>
			<div class="fields">
				<div class="three wide field">
					<label>Price</label>
					<div class="ui right labeled input">
						<input v-model="form.price" type="number" value="" placeholder="100,000">
						<div class="ui basic label">zeny</div>
					</div>
				</div>
			</div>
			<div class="field">
				<label>Description</label>
				<textarea v-model="form.description" rows="3" placeholder="(Optional) ex. PM me your offers ingame, I'll accept trade too"></textarea>
			</div>
			<button :class="'ui submit green button large'" @click="submitSellForm">
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
import FirebaseStore from '../helpers/FirebaseStore'

const db = FirebaseStore.db
const sellItemsRef = db.ref('sellItems')

export default {
	data() {
		return {
			isAuthenticated: false,
			formSize: 'large',
			form: {
				title: null,
				quantity: 1,
				price: null,
				description: null,
				server: null,
				submitting: false
			}
		}
	},
	mounted() {
		$('.dropdown').dropdown();

		FirebaseStore.checkLoggedIn(() => {
			this.isAuthenticated = true
		}, () => {
			this.$router.push('/login')
		});
	},
	methods: {
		submitSellForm() {
			this.form.server = $('#server.dropdown').dropdown('get value') || null
			this.form.submitting = true

			var newSellItemRef = sellItemsRef.push();

			newSellItemRef.set(this.form, (err) => {
				if(err) {
					console.log(err)
					return
				}

				this.$router.push('/sell/' + newSellItemRef.key)
			})
		},
		setServer(server){
			this.form.server = server
		}
	},
	firebase: {
		sellItems: db.ref('sellItems')
	}
}
</script>

<style lang="scss">

</style>