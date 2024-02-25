<script lang="ts">
	import type { UserProfile } from '$lib/types';
	import { afterUpdate, beforeUpdate, onDestroy, onMount } from 'svelte';
	import { userProfileStore, token } from '../stores/userProfileStore';
	import Level from './level.svelte';

	let userProfile: UserProfile | undefined;

	const unsubscribeProfile = userProfileStore.subscribe((user) => {
		userProfile = user;
	});

	onDestroy(() => {
		unsubscribeProfile();
	});
</script>

{#if userProfile}
	<div class="card">
		<h1>User Profile</h1>
		<div class="section">
			<strong>ID:</strong>
			{userProfile.id}
		</div>
		<div class="section">
			<strong>Name:</strong>
			{userProfile.userName}
		</div>
		<div class="section">
			<Level />
		</div>
	</div>
{:else}
	<h1>NOT FOUND</h1>
	<div class="loader-container" id="loader">
		<div class="loader"></div>
	</div>
{/if}

<style>
	.loader-container {
		display: none; /* Hide by default, display it when loading data */
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white background */
		z-index: 100;
		justify-content: center;
		align-items: center;
	}

	.loader {
		border: 5px solid #f3f3f3; /* Light grey */
		border-top: 5px solid #3498db; /* Blue */
		border-radius: 50%;
		width: 50px;
		height: 50px;
		animation: spin 2s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	/*  */
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

	/* .grades div,
	.audits div {
		background-color: #f2f2f2;
		margin: 5px 0;
		padding: 5px;
		border-radius: 5px;
	} */

	/* .skills button {
		background-color: #e6e6e6;
		border: none;
		border-radius: 5px;
		padding: 10px;
		margin-top: 5px;
		cursor: pointer;
		width: 100%;
	}

	.skills button:hover {
		background-color: #cccccc;
	} */
</style>
