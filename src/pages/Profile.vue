<template>
	<div id="profile" class="ui stackable grid">
		<div class="four wide column">
			<img src="https://placeimg.com/480/480/tech" class="ui image rounded" />
			<h1 class="ui header">
				Alphonsus
			</h1>
			<div class="ui large list" id="bio-items">
				<div class="item">
					<strong>IGN:</strong> Alphonsus, AlfonzM, +3 others
				</div>
				<div class="item">
					<strong>Server: </strong> Thor
				</div>
				<div class="item">
					<strong>Join date: </strong> June 25, 2017
				</div>
				<div class="item">
					<strong>Last active: </strong> 3 days ago
				</div>
			</div>
			<div class="ui divider"></div>
			<p><router-link to="/msg" class="ui button large fluid green">Contact user</router-link></p>
			<p><router-link to="/msg" class="ui button large fluid basic">Report user</router-link></p>
		</div>
		<div class="twelve wide column">
			<div class="ui secondary pointing massive menu">
				<a :class="['item', { active: activeTab == 'overview' }]" @click.prevent="setActiveTab('overview')">
					Overview
				</a>
				<a :class="['item', { active: activeTab == 'selling' }]" @click.prevent="setActiveTab('selling')">
					Selling
				</a>
				<a :class="['item', { active: activeTab == 'buying' }]" @click.prevent="setActiveTab('buying')">
					Buying
				</a>
			</div>
			<div>
				<div v-if="activeTab == 'overview'">
					<div id="overview-characters">
						<h2 class="ui dividing header">
							Characters
						</h2>
						<div class="ui large labels">
							<a class="ui blue image label">
								Alphonsus
								<div class="detail">Knight</div>
							</a>
							<a class="ui orange image label">
								AlfonzM
								<div class="detail">Priest</div>
							</a>
							<a class="ui teal image label">
								Saint Alphonsus
								<div class="detail">Merchant</div>
							</a>
						</div>
					</div>
					<br><br><br>
					<div class="overview-location">
						<h2 class="ui header">
							Favorite Spot
						</h2>
						<div class="ui divider"></div>
						<p>Payon Cave Entrance</p>
					</div>
				</div>
				<div v-else-if="activeTab == 'selling'">
					<h1 class="ui header">
						Coming soon!
						<div class="sub header">
							This feature is still under construction.
						</div>
					</h1>
				</div>
				<div v-else-if="activeTab == 'buying'">
					<h1 class="ui header">
						Coming soon!
						<div class="sub header">
							This feature is still under construction.
						</div>
					</h1>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	mounted() {

	},
	data() {
		return {
			activeTab: 'overview',
		}
	},
	methods: {
		setActiveTab(tab) {
			this.activeTab = tab
		}
	},
}
</script>

<style lang="scss">
#profile {
	.ui.list#bio-items > .item {
		padding-bottom: 4px;
	}

	#bio-items {
		color: #666;
		margin: 0;
	}

	#overview-characters {
		padding-top: 20px;
	}
}
</style>