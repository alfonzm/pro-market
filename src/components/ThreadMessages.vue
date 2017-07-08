<template>
	<div class="ui large feed" id="convo-messages">
		<!-- Message -->
		<div class="event convo-message" v-for="message in messages">
			<pre>{{ message }}</pre>
			<div class="label">
				<img src="http://placeimg.com/480/480/sports">
			</div>
			<div class="content convo-content">
				<div class="summary">
					{{ messageSender(message) }}
					<div class="date">
						11:20 AM
					</div>
				</div>
				<p class="extra text convo-text">
					{{ message.message }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	props: ['messages'],
	methods: {
		messageSender(message) {
			console.log("M", message)
			console.log(this.$store.state.selectedThreadMembers)
		}
	},
}
</script>

<style lang="scss">

</style>