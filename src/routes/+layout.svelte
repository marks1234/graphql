<script lang="ts">
	import '../app.pcss';
	// Importing the page component, which would be your home page
	// import { userProfileStore } from '$lib/userProfileStore';
	import './styles.css';
	import '../app.pcss';
	import Login from './login.svelte';
	// import type { UserProfile } from '$lib/types';

	$: loggedIn = false;

	function login() {
		loggedIn = !loggedIn;
	}
</script>

<article class="m-auto flex h-screen w-screen items-center justify-center">
	{#if loggedIn}
		<slot />
	{:else}
		<Login
			on:login={({ detail }) => {
				login();
				return;
			}}
		/>
	{/if}
</article>

<style>
	/* Your global styles could go here, or you could import a global stylesheet
	main {
		top: 50%;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		max-width: 300px;
		margin: 0 auto;
	} */
</style>
