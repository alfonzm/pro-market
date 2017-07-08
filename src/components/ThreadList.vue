<template>
	<div id="thread-list">
		<div class="ui secondary vertical fluid menu">
			<div v-if="threads.length === 0">
				<div class="ui active centered text loader">Loading messages...</div>
			</div>
			<div v-else>
				<div class="item">
					<div class="ui transparent icon input">
						<input type="text" placeholder="Search messages...">
						<i class="search icon"></i>
					</div>
				</div>
				<a class="item threads-item" v-for="(thread, threadId) in threads" @click="selectThread(thread, threadId)">
					<h4 class="ui header inline">
						<img class="ui image avatar" :src="thread.recipientUser.avatarUrl" />
						<span class="threads-item-title">
							{{ thread.recipientUser.name }}
							<span class="ui teal circular tiny label">1</span>
						</span>
					</h4>
				</a>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	props: ['threads'],
	methods: {
		selectThread(thread, threadId) {
			thread.id = threadId
			this.$store.commit('setSelectedThread', thread)
		},
	}
}
</script>

<style lang="scss">

</style>