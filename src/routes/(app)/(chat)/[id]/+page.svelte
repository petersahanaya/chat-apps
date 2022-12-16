<script lang="ts">
	import { page } from '$app/stores';
	import { clients } from '$lib/stores/chat';
	import type { msgProps, UserProps } from '$lib/types';
	import GiPaperPlane from 'svelte-icons/gi/GiPaperPlane.svelte';
	import { sockets } from '$lib/stores/chat';
	import { beforeUpdate, afterUpdate } from 'svelte';
	import Chat from '$lib/components/Chat.svelte';
	import Footer from '$lib/components/Footer.svelte';

	export let data: { user: UserProps };
	let input: string = '';
	let results: Array<msgProps> = [];
	let article: Element;
	let scroll: boolean;

	beforeUpdate(() => {
		scroll = article && article.scrollHeight + article.scrollTop > article.scrollHeight - 1;
	});

	afterUpdate(() => {
		scroll && article.scrollTo(0, article.scrollHeight);
	});

	const { user } = data;

	$: client = $clients.find((s) => s.id === $page.params?.id)!;

	$sockets.on('send-msg', (data: msgProps) => {
		results = [...results, data];
	});

	const handleSend = () => {
		if (input) {
			const messages = {
				senderName: user.username,
				senderImg: user.image,
				senderMsg: input,
				receiverId: client.id,
				date: `${new Date(Date.now()).getHours()} : ${new Date(Date.now()).getMinutes()}`
			};
			$sockets.emit('on-msg', messages);
			results = [...results, messages];
			input = '';
		}
	};

	const handleChange = (e: any) => {
		input = e.target.value;
	};

	const handleInput = (e: KeyboardEvent) => {
		if (input) {
			if (e.key === 'Enter') {
				const messages = {
					senderName: user.username,
					senderImg: user.image,
					senderMsg: input,
					receiverId: client.id,
					date: `${new Date(Date.now()).getHours()} : ${new Date(Date.now()).getMinutes()}`
				};
				$sockets.emit('on-msg', messages);
				results = [...results, messages];
				input = '';
			}
		}
	};
</script>


<svelte:head>
    <title>Chat's</title>
    <meta name="description" content="you can chat with you'r friend anywhere"/>
</svelte:head>

<main class="w-screem screen bg-stone-800">
	<header
		class="flex justify-around items-center p-2 w-screen h-[10vh] bg-stone-800 shadow-md shadow-white"
	>
		<section>
			{#if !client?.image}
				<img class="rounded-full" width="60" src="/profile.jpeg" alt="profile" />
			{/if}
			{#if client?.image}
				<img class="rounded-full" width="60" src={client.image} alt="profile" />
			{/if}
		</section>
		<div class="flex flex-col justify-center ">
			<h4 class="text-[greenyellow] text-[1.3rem] font-medium">{client?.username}</h4>
		</div>
	</header>
	<article bind:this={article} class="bg-stone-800 w-screen h-screen overflow-y-scroll overflow-x-hidden pb-32">
		{#if results.length}
			{#each results as result, i (i + results.length)}
				<Chat {result} {user}/>
			{/each}
		{/if}
	</article>
	<Footer {handleSend} {handleChange} {handleInput} {input}/>
</main>
