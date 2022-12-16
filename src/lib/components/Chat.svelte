<script lang="ts">
	import type { msgProps, UserProps } from "$lib/types";
	import { fly } from 'svelte/transition';

	export let result : msgProps;
	export let user : UserProps;
</script>

<section
	class=" mt-8 p-3 w-max flex flex-col  ml-[63vw]"
	style={result.senderName === user.username ? 'margin-left : 63vw' : 'margin-left : 0'}
	in:fly={{x : 200, opacity : .8}}
>
	<nav class="flex relative w-full items-center ">
		<div
			class="flex items-center gap-3"
			style={result.senderName !== user.username
				? 'flex-direction : row-reverse'
				: 'flex-direction : row'}
		>
			<p class="text-stone-100 text-[1.1rem]">{result.senderName}</p>
			{#if !result?.senderImg}
				<img class="rounded-full" width="40" src="/profile.jpeg" alt="profile" />
			{/if}
			{#if result?.senderImg}
				<img class="rounded-full" width="40" src={result.senderImg} alt="profile" />
			{/if}
		</div>
	</nav>
	<div class="rounded-lg bg-[greenyellow] text-stone-900 p-3 mt-2">
		<p class="text-[.9rem] text-stone-800  whitespace-wrap">{result.senderMsg}</p>
		<p class="text-stone-600 font-medium text-[.8rem] mt-2">{result.date}</p>
	</div>
</section>
