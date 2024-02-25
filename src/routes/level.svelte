<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { token, userProfileStore } from '../stores/userProfileStore';
	import type { UserProfile } from '$lib/types';

	let userProfile: UserProfile | undefined;
	let div01 = 148;

	let jwt_token: string | undefined;

	const unsubscribeToken = token.subscribe((token) => {
		jwt_token = token;
	});

	const unsubscribeProfile = userProfileStore.subscribe((user) => {
		userProfile = user;
	});

	const query = `query rootEventDetails($userId: Int!, $rootEventId: Int!) {
       xp: transaction_aggregate(
         where: {
           userId: { _eq: $userId }
         type: { _eq: "xp" }
         eventId: { _eq: $rootEventId }
     }
     ) { aggregate { sum { amount } } }
     level: transaction(
         limit: 1
       order_by: { amount: desc }
       where: {
           userId: { _eq: $userId }
         type: { _eq: "level" }
         eventId: { _eq: $rootEventId }
     }
     ) { amount }
 }`;

	$: (async (userProfile, jwt_token) => {
		if (userProfile?.level !== -1) return;

		if (jwt_token && userProfile?.id !== 0) {
			const response = await fetch('https://01.kood.tech/api/graphql-engine/v1/graphql', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt_token}` },
				body: JSON.stringify({
					query: query,
					variables: { userId: userProfile?.id, rootEventId: 148 }
				})
			});

			const json = await response.json();
			const level = json.data.level[0].amount;
			const xp = json.data.xp.aggregate.sum.amount;

			userProfileStore.update((update) => {
				return { ...update, level: level, xp: xp };
			});

			unsubscribeProfile();
		}
	})(userProfile, jwt_token);

	onDestroy(() => {
		unsubscribeToken();
	});
</script>

<div>
	<div class="card level-display">
		<div class="section level-info items-center justify-center">
			<strong class="level-text">Level</strong>
			<div class="level-number">
				{userProfile?.level}
			</div>
		</div>
	</div>

	<div class="section">
		<strong>Exp:</strong>
		{userProfile?.xp}
	</div>
</div>

<style>
	.card {
		background-color: #fff;
		border-radius: 50%;
		width: 150px;
		height: 150px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.level-display {
		background: #79d70769;
		display: flex;
		flex-direction: column; /* Stack children vertically */
		align-items: center; /* Center-align children horizontally */
		justify-content: center; /* Center-align children vertically */
	}

	.level-info {
		display: flex;
		flex-direction: column; /* Stack children vertically */
		align-items: center; /* Center-align children horizontally */
	}

	.level-text {
		font-size: 14px;
		color: #666;
	}

	.level-number {
		font-size: 36px;
		font-weight: bold;
		color: #333;
	}

	.section {
		margin-top: 10px;
	}

	.section strong {
		color: #666666;
	}
</style>
