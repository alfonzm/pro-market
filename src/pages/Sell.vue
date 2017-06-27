<template>
	<div>
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
</template>

<script>

export default {
	data() {
		return {
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
	},
	methods: {
		submitSellForm() {
			this.server = $('#server.dropdown').dropdown('get value');
			this.form.submitting = true
			console.log(this.form)
		},
		setServer(server){
			this.form.server = server
		}
	}
}
</script>

<style lang="scss">

</style>