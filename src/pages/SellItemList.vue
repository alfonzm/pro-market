<template>
	<div>
		<h1>Items for sale ({{ $route.params.server | capitalize }})</h1>

		<template v-for="item in items">
			<div>
				{{ item.name }}
			</div>
		</template>
	</div>
</template>

<script>
import ItemStore from '../stores/ItemStore'

export default {
	data() {
		return {
			items: []
		}
	},
	mounted() {
		ItemStore.getItems(this.$route.params.server, 20, (items) => {
			this.items = items
		})
	}
}
</script>

<style lang="scss">

</style>