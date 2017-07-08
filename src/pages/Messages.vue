<template>
	<div id="messages">
		<h1>Messages</h1>
		<div class="ui grid divided relaxed stackable">
			<div class="five wide column" id="threads">
				<pro-thread-list :threads="threads" />
			</div>
			<div class="eleven wide column" id="convo">
				<!-- messages -->
				<pro-thread-messages :messages="messages" />

				<!-- end feed -->
				<div class="ui fluid big action input convo-messagebox">
					<input type="text" placeholder="Type a message...">
					<button class="ui big button">Send</button>
				</div>
			</div>
			<!-- end eleven wide column -->
		</div>
		<!-- end grid -->
	</div>
</template>

<script>
import MessageStore from '../stores/MessageStore'
import FirebaseStore from '../stores/FirebaseStore'
import ThreadList from '../components/ThreadList.vue'
import ThreadMessages from '../components/ThreadMessages.vue'
import firebase from 'firebase'

export default {
	created() {
		// Watch for selected thread change
		this.$store.watch((state) => {
			return state.selectedThread
		}, () => {
			// if user clicks on thread, load the messaes
			var thread = this.$store.state.selectedThread
			console.log("MEMBERS", this.$store.state.selectedThreadMembers)
			
			MessageStore.getMessagesByThreadId(thread.id, 0, 20, (messages) => {
				this.messages = messages
			})
		})
	},
	mounted() {
		this.loadThreads()
	},
	data() {
		return {
			threads: [],
			messages: []
		}
	},
	methods: {
		loadThreads() {
			FirebaseStore.checkLoggedIn((user) => {
				MessageStore.getThreadsByUserId(user.uid, (threads) => {
					this.threads = threads
					this.$store.commit('setThreads', threads)
				})
			}, (error) => {
				console.log('error')
			})
		},
	},
	components: {
		'pro-thread-list': ThreadList,
		'pro-thread-messages': ThreadMessages
	},
}
</script>

<style lang="scss">
#messages {
	height: 100%;

	.ui.grid {
		height: 100%;

		$heightPercent: 100%;
		$mainPaddingTop: 60px;
		height: -webkit-calc(#{$heightPercent} - #{$mainPaddingTop});
		height:    -moz-calc(#{$heightPercent} - #{$mainPaddingTop});
		height:         calc(#{$heightPercent} - #{$mainPaddingTop});

		#threads {
			height: 100%;
			overflow: scroll;

			span.threads-item-title {
				&.read {
					font-weight: 400;
				}
			}
		}

		#convo {
			height: 100%;
			position: relative;
			padding-top: 0px;

			.feed {
				height: 90%;
				overflow: scroll;
			}

			.convo-message {
				margin-bottom: 1em;
			}

			.convo-text {
				max-width: 100%;
				font-weight: 400;
				color: #333;
				line-height: 1.5em;
				font-size: 15px;
			}

			.convo-content {
				margin-top: 0;

				.summary {
					font-weight: 700;
				}

				.date {
					color: #aaa;
				}
			}
		}

		.convo-messagebox {
			position: absolute;
			margin-left: 0;
			width: 96%;
			bottom: 0;

			$widthPercent: 100%;
			$parentPadding: 42px;
			width: -webkit-calc(#{$widthPercent} - #{$parentPadding});
			width:    -moz-calc(#{$widthPercent} - #{$parentPadding});
			width:         calc(#{$widthPercent} - #{$parentPadding});
		}
	}

}
</style>