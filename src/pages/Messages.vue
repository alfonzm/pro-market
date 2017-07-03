<template>
	<div id="messages">
		<h1>Messages</h1>
		<div class="ui grid divided relaxed stackable">
			<div class="five wide column" id="threads">
				<div class="ui secondary vertical fluid menu">
					<div class="item">
						<div class="ui transparent icon input">
							<input type="text" placeholder="Search messages...">
							<i class="search icon"></i>
						</div>
					</div>
					<a class="item active threads-item">
						<h4 class="ui header inline">
							<img class="ui image avatar" src="http://placeimg.com/480/480/fruits" />
							<span class="threads-item-title">Indy <span class="ui teal circular label">1</span></span>
						</h4>
					</a>
					<a class="item threads-item">
						<h4 class="ui header inline">
							<img class="ui image avatar" src="http://placeimg.com/480/480" />
							<span class="threads-item-title read">Testo</span>
						</h4>
					</a>
					<a class="item threads-item">
						<h4 class="ui header inline">
							<img class="ui image avatar" src="http://placeimg.com/480/480" />
							<span class="threads-item-title read">Hello World</span>
						</h4>
					</a>
				</div>
			</div>
			<div class="eleven wide column" id="convo">
				<div class="ui large feed">
					<!-- Message -->
					<div class="event convo-message">
						<div class="label">
							<img src="http://placeimg.com/480/480/sports">
						</div>
						<div class="content convo-content">
							<div class="summary">
								You
								<div class="date">
									11:20 AM
								</div>
							</div>
							<p class="extra text convo-text">
								Ours is a life of constant reruns. We're always circling back to where we'd we started, then starting all over again. Even if we don't run extra laps that day, we surely will come back for more of the same another day soon.
							</p>
						</div>
					</div>
					<!-- Message -->
					<div class="event convo-message">
						<div class="label">
							<img src="http://placeimg.com/480/480/sports">
						</div>
						<div class="content convo-content">
							<div class="summary">
								You
								<div class="date">
									11:20 AM
								</div>
							</div>
							<p class="extra text convo-text">
								Ours is a life of constant reruns. We're always circling back to where we'd we started, then starting all over again. Even if we don't run extra laps that day, we surely will come back for more of the same another day soon.
							</p>
						</div>
					</div>
					<!-- Message -->
					<div class="event convo-message">
						<div class="label">
							<img src="http://placeimg.com/480/480/space">
						</div>
						<div class="content convo-content">
							<div class="summary">
								Indy
								<div class="date">
									12:20 AM
								</div>
							</div>
							<p class="extra text convo-text">
								120k for Gakkung
							</p>
						</div>
					</div>
					<!-- Message -->
					<div class="event convo-message">
						<div class="label">
							<img src="http://placeimg.com/480/480/sports">
						</div>
						<div class="content convo-content">
							<div class="summary">
								Indy
								<div class="date">
									12:20 AM
								</div>
							</div>
							<p class="extra text convo-text">
								Ok deal!
							</p>
						</div>
					</div>
				</div>
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
import ComingSoon from '../components/ComingSoon.vue'

export default {
	data() {
		return {
			threads: [],
			selectedThread: {}
		}
	},
	methods: {
	},
	components: {
		'pro-coming-soon': ComingSoon
	}
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