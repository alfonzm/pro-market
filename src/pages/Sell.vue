<template>
	<div>
		<h1 class="ui header">
			Sell an item
			<div class="sub header">Create an item to sell to other players!</div>
		</h1>
		<form :class="['ui form', formSize, { loading: form.submitting }]" v-on:submit.prevent="submitSellForm">
			<div class="field">
				<label>Title</label>
				<input type="text" placeholder="ex. S>+10 Main Gauche">
			</div>
			<div class="field">
				<label>Server</label>
				<div :class="'ui buttons ' + formSize">
					<button class="ui button">Thor</button>
					<button class="ui button">Loki</button>
				</div>
			</div>
			<div class="fields">
				<div class="four wide field">
					<label>Quantity</label>
					<input type="number" value="1">
				</div>
			</div>
			<div class="fields">
				<div class="four wide field">
					<label>Price</label>
					<input type="number" value="" placeholder="100,000">
				</div>
			</div>
			<div class="field">
				<label>Description</label>
				<textarea rows="3" placeholder="(Optional) ex. PM me your offers ingame, I'll accept trade too"></textarea>
			</div>
			<button type="submit" :class="'ui submit green button huge'">
				<i class="icon user"></i>
				Start selling
			</button>
		</form>
	</div>
</template>

<script>

export default {
	data() {
		return {
			formSize: 'large',
			form: {
				submitting: false
			}
		}
	},
	methods: {
		submitSellForm() {
			this.form.submitting = true
			console.log('yey')
		}
	}
}
</script>

<style lang="scss">

</style>