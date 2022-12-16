<script lang="ts">
	import type { UserProps } from '$lib/types/index';
	import IoIosFlash from 'svelte-icons/io/IoIosFlash.svelte';
	import io from 'socket.io-client';
	import Card from '$lib/components/Card.svelte';
	import Header from '$lib/components/Header.svelte';
	import { clients, sockets, room } from '$lib/stores/chat';
	import { goto } from '$app/navigation';

	export let data: any;

	const { user }: { user: UserProps } = data;

	const client = {
		senderName: user.username,
		senderImg: user.image,
		senderId: user.id
	};
    let input : string = '';

	const socket = io(import.meta.env.VITE_PORT_IO);
	sockets.set(socket);

	$: socket.emit('on-join', client);

	$: socket.on('clients', (data: Array<UserProps>) => {
		let filtered = data.filter((s) => s.id !== user.id);
		clients.set(filtered);
	});

    socket.on('on-room', (data) => {
        if(data) {
            goto('/chat/room')
        }
    })

    const handleJoin = (e : KeyboardEvent) => {
        if(input){
            if(e.key === "Enter") {
                socket.emit('room-join', {...client, roomId : input})
				room.set(input)
            }
        }
    }
</script>

<svelte:head>
	<title>p3chat'S</title>
	<meta name="description" content="Chat with your friend or random people in p3chat's" />
</svelte:head>
<Header {user} />
<main class="w-screen h-screen bg-stone-800 flex flex-col  items-center">
	<section class="mt-10 relative">
		<input
			maxlength="6"
			class="p-3 w-[80vw] rounded-full outline-none bg-stone-700 text-white placeholder:text-stone-400"
			type="text"
            bind:value={input}
			placeholder="room id"
            on:keydown={handleJoin}
		/>
		<div class="absolute top-[10px] right-[10px] w-[30px] text-stone-200">
			<IoIosFlash />
		</div>
	</section>
	<div class="flex mt-4 flex-col justify-center items-center w-screen">
		{#if !$clients.length}
			<p class="mt-8 text-stone-200 text-[.9rem]">There's no online user's yet</p>
		{/if}
		{#each $clients as client (client.id)}
			<Card {client}/>
		{/each}
	</div>
</main>
