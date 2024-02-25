<script lang="ts">
	import type { UserProfile } from '$lib/types';
	import { onMount } from 'svelte';
	import { userProfileStore } from '../stores/userProfileStore';

	let userProfile: UserProfile;
	let barUp: HTMLDivElement;
	let barDown: HTMLDivElement;
	const unsubscribeProfile = userProfileStore.subscribe((user) => {
		userProfile = user;
	});

	$: done = userProfile.totalUp; // B
	$: received = userProfile.totalDown; // B

	$: donePercentage = (done / ((done + received) * 0.85)) * 100;
	$: receivedPercentage = (received / ((done + received) * 0.85)) * 100;

	$: (async () => {
		if (barUp && barDown) {
			barUp.style.width = donePercentage + '%';
			barDown.style.width = receivedPercentage + '%';
		}
	})();
</script>

{#if userProfile}
	<div class="card audits-ratio py-2">
		<h1>Audits ratio</h1>
		<div class="section">
			<div class="section bar-container">
				<div class="bar done" bind:this={barUp}></div>
			</div>
			<strong class="amount done-amount">{userProfile.totalUp} B Done ↑</strong>
		</div>
		<div class="section">
			<div class="bar-container">
				<div class="bar received" bind:this={barDown}></div>
			</div>
			<strong class="amount received-amount">{userProfile.totalDown} B Received ↓</strong>
		</div>
		<div class="border-box">
			<div class="ratio">{Math.round((done / received) * 10) / 10}</div>
		</div>
	</div>
{:else}
	<h1>NOT FOUND</h1>
	<div class="loader-container" id="loader">
		<div class="loader"></div>
	</div>
{/if}

<style>
	.audits-ratio {
		font-family: Arial, sans-serif;
		color: rgb(0, 0, 0);
		background-color: #7af5518c;
		padding: 15px;
		border-radius: 6px;
		width: 200px;
	}

	.card {
		background-color: #7af5518c;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		border-radius: 15px;
		padding: 20px;
		width: 300px;
	}

	.card h1 {
		color: #333333;
		text-align: center;
		border-bottom: 2px solid #eeeeee;
		padding-bottom: 10px;
	}

	.section {
		margin-top: 10px;
	}

	.section strong {
		color: #666666;
	}

	.bar-container {
		background-color: #555555;
		border-radius: 5px;
		overflow: hidden;
		margin-bottom: 5px;
	}

	.bar {
		height: 10px;
		border-radius: 5px;
	}

	.done {
		/* background-image: conic-gradient(rgb(210, 45, 30), rgb(51, 144, 170) var(--ng), #0000 0); */
		background-color: rgb(210, 45, 30);
	}

	.received {
		background-color: rgb(51, 144, 170);
	}

	.amount {
		font-size: 12px;
		margin-bottom: 5px;
	}

	.ratio {
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		margin: 10px 0;
	}

	/* .warning {
		font-size: 12px;
		text-align: center;
		color: #ff5555;
	} */
</style>
