<script lang="ts">
	import AuditRatio from './audit_ratio.svelte';
	import Profile from './profile.svelte';
	import SkillProgress from './skill_progress.svelte';
	import { token, userProfileStore } from '../stores/userProfileStore';
	import { _addSkills } from './+page';
	import Level from './level.svelte';
	import type { Skill } from '$lib/types';
	import { onDestroy } from 'svelte';

	let percentage = 23;
	let percentage2 = 60;
	let skills: Skill[];
	let chunkedSkills: Skill[][] = [[{ type: 'nop', amount: 0 }]];
	$: if (skills) {
		chunkedSkills = chunk(skills, 4);
	}

	function chunk(array: Skill[], size: number) {
		if (!array) return array;

		return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
			array.slice(i * size, i * size + size)
		);
	}

	const unsubscribeToken = token.subscribe(async (token) => {
		let query = `query {
  		user {
  		  id
    	  login
				totalUp
				totalDown
				transactions(
      		order_by: [{type: desc}, {amount: desc}]
      		distinct_on: [type]
      		where: {userId: {_eq: 8479}, type: {_like: "skill_%"}}
    		) {
					type
					amount
   			}
			}
		}`;

		// Fetch profile data after successful login
		if (token) {
			const response = await fetch('https://01.kood.tech/api/graphql-engine/v1/graphql', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
				body: JSON.stringify({
					query: query
				})
			});

			const json = await response.json();
			type User = {
				id: number;
				login: string;
				totalUp: number;
				totalDown: number;
				transactions: Skill[];
			};
			try {
				const user: User = json.data.user[0];

				_addSkills(user.transactions);
				skills = user.transactions;
				userProfileStore.update((profile) => {
					return {
						...profile,
						id: user.id,
						userName: user.login,
						totalUp: user.totalUp,
						totalDown: user.totalDown,
						skills: user.transactions
					};
				});
			} catch (err) {
				console.log(err);
				console.log('JSON >>> ', json);
			}
		}
	});

	onDestroy(() => {
		unsubscribeToken();
	});
</script>

<div class="box flex flex-col sm:flex-row">
	<div class="border-box px-3 sm:order-1">
		<Profile />
	</div>
	<div class="px-3 py-2 sm:order-2 sm:py-0">
		<AuditRatio />
	</div>
	<div class="flex flex-row justify-center py-3 sm:order-3 sm:py-0">
		{#each chunkedSkills as group, i}
			<div class="px-2 sm:order-{1}">
				{#each group as skill (skill.type)}
					<SkillProgress name={skill.type} percent={skill.amount} />
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.box {
		position: fixed;
		translate: 0px, 100px;
	}
</style>
