<script lang="ts">
	import { onMount } from 'svelte';

	let pie: HTMLElement | null = null;
	let ngval: HTMLElement | null = null;

	export let name: string;
	export let percent: number;
	$: result = (360 / 100) * percent;

	onMount(() => {
		if (pie && ngval) {
			pie.style.setProperty('--ng', String(result) + 'deg');
			ngval.textContent = `${percent}%`;
		}
	});
</script>

<div class="card">
	<div class="chart">
		<div class="pie m-0 my-1 rounded-full bg-slate-300 p-0" bind:this={pie}></div>
		<h3><span id="ngval" bind:this={ngval}>{percent}%</span></h3>
	</div>
	<h2 class="0 mb-2 rounded-xl p-2 py-1">{name}</h2>
</div>

<style lang="scss">
	.pie {
		--ng: 120deg; /* can be set via slider */
		--thickness: 10px;
		--_inner: calc(70% - var(--thickness));
		--_outer: calc(var(--_inner) + 1px); /* fixes aliasing */

		/* hides the inner part of the conic gradient */
		mask: radial-gradient(circle, #0000 var(--_inner), #000 var(--_outer));

		/* the conic gradient, transparent after --ng */
		background-image: conic-gradient(#eb210f, #0cc2f4 var(--ng), #555555 0);
	}

	.pie {
		aspect-ratio: 1;
		inline-size: 77px;
		border-radius: 50%;
	}

	.card {
		background-color: #7af5518c;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		border-radius: 15px;
		// padding: 20px;
		// width: 300px;
	}

	.chart {
		display: grid;
		place-items: center;
	}

	.chart > * {
		grid-area: 1/1;
	}

	.chart > h3 {
		font-variant-numeric: tabular-nums;
	}

	h2 {
		box-sizing: border-box;
	}

	// html {
	// 	block-size: 100%;
	// 	color-scheme: dark light;
	// }

	// body {
	// 	min-block-size: 100%;
	// 	font-family: system-ui, sans-serif;

	// 	display: grid;
	// 	place-content: center;
	// 	gap: 5vmin;
	// }
</style>
