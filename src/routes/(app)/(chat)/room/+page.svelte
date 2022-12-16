<script lang="ts">
	import { room } from '$lib/stores/chat';
	import type { msgProps, UserProps } from '$lib/types';
	import { sockets } from '$lib/stores/chat';
	import { beforeUpdate, afterUpdate } from 'svelte';
	import Chat from '$lib/components/Chat.svelte';
	import Footer from '$lib/components/Footer.svelte';

	export let data: { user: UserProps };
	let input: string = '';
	let results: Array<msgProps> = [];
	let article: Element;
	let scroll: boolean;
    let joined : string;

	beforeUpdate(() => {
		scroll = article && article.scrollHeight + article.scrollTop > article.scrollHeight - 1;
	});

	afterUpdate(() => {
		scroll && article.scrollTo(0, article.scrollHeight);
	});

	const { user } = data;

	$sockets.on('send-room', (data: msgProps) => {
        console.log(data)
		results = [...results, data];
	});

    $sockets.on('on-room', (data : string) => {
        joined = data
    })


	const handleSend = () => {
		if (input) {
			const messages = {
				senderName: user.username,
				senderImg: user.image,
				senderMsg: input,
				roomId : $room,
				date: `${new Date(Date.now()).getHours()} : ${new Date(Date.now()).getMinutes()}`
			};
			$sockets.emit('room-msg', messages);
			results = [...results, messages];
			input = '';
		}
	};

	const handleChange = (e: any) => {
		input = e.target.value;
        console.log(e.target.value)
	};

	const handleInput = (e: KeyboardEvent) => {
		if (input) {
			if (e.key === 'Enter') {
				const messages = {
					senderName: user.username,
					senderImg: user.image,
					senderMsg: input,
					roomId : $room,
					date: `${new Date(Date.now()).getHours()} : ${new Date(Date.now()).getMinutes()}`
				};
                console.log("Sended..")
				$sockets.emit('room-msg', messages);
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
		<h3 class="text-[3rem] text-zinc-200">Chat's room</h3>
	</header>
	<article bind:this={article} class="bg-stone-800 w-screen h-screen overflow-y-scroll overflow-x-hidden pb-32">
		{#if results.length}
			{#each results as result, i (i + results.length)}
				<Chat {result} {user}/>
			{/each}
		{/if}
	</article>
<Footer {handleSend} {handleChange} {input} {handleInput}/>
</main>
