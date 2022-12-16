<script lang="ts">
	import FaAngleLeft from 'svelte-icons/fa/FaAngleLeft.svelte';
	import FaUserEdit from 'svelte-icons/fa/FaUserEdit.svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	export let data: { user: { username: string; email: string; image: string | null } };

	const { user } = data;

	let file: any;
    let loading : boolean = false;
	let username = user?.username;

	const handleSubmit = async (e: any) => {
        e.preventDefault()

        if(file){
            const formData = new FormData()

            formData.append('file', file[0])
            formData.append('upload_preset', 'social-upload')

            loading = true

           const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_PUBLIC_CLOUD_NAME}/image/upload`, {
            method : "POST",
            headers : {},
            body : formData
           })

           const data = await res.json()

           if(data) {
                const upload = await fetch('/api/upload', {
                    method : "POST",
                    body : JSON.stringify({url : data.url, username : user.username})
                })

                const result = await upload.json()
                loading = false

                if(result) {
                    goto('/chat')
                }
           }
        }
    };
</script>

<form method="post" on:submit={handleSubmit} transition:fade class="bg-stone-800 w-screen h-screen">
	<header class="flex justify-around bg-stone-800 items-center h-[12vh] w-screen">
		<div class="w-[15px] text-white">
			<a href="/chat">
				<FaAngleLeft />
			</a>
		</div>
		<p class="text-white">Setting's</p>
	</header>

	<section class="flex justify-around bg-stone-800 items-center w-screen">
		{#if !user.image && !file}
			<nav class="relative">
				<img class="rounded-full shadow-sm" width="150" src="/profile.jpeg" alt="profile" />
				<label
					class="absolute bottom-0 right-0 w-[35px] h-[35px] flex justify-center items-center text-stone-600 bg-[greenyellow] rounded-full"
					for="file"
				>
					<FaUserEdit />
				</label>
				<input class="hidden" id="file" type="file" bind:files={file} accept="image/*" />
			</nav>
		{/if}

		{#if user?.image}
			<nav class="relative">
				<img class="rounded-full shadow-sm" width="150" src={user?.image} alt="profile" />
				<label
					class="absolute bottom-0 right-0 w-[40px] h-[40px] flex justify-center items-center text-white bg-sky-600 rounded-full"
					for="file"
				>
					<FaUserEdit />
				</label>
				<input class="hidden" id="file" type="file" bind:files={file} accept="image/*" />
			</nav>
		{/if}

		{#if file}
			<nav class="relative">
				<img class="rounded-full shadow-sm" width="150" src={URL.createObjectURL(file[0])} alt="profile" />
				<label
					class="absolute bottom-0 right-0 w-[40px] h-[40px] flex justify-center items-center text-white bg-sky-600 rounded-full"
					for="file"
				>
					<FaUserEdit />
				</label>
				<input class="hidden" id="file" type="file" bind:files={file} accept="image/*" />
			</nav>
		{/if}
		<div class="flex flex-col justify-center items-center gap-2">
			<h4 class="text-2xl text-white font-medium">{user?.username}</h4>
			<p class=" text-stone-300 text-[.8rem]">{user?.email}</p>
		</div>
	</section>

	<article class="flex flex-col w-screen px-2 justify-center items-center gap-2 bg-stone-800 mt-12">
		<section class="flex flex-col justify-center w-[80vw]">
			<p class="text-stone-300 text-[.8rem]">Email Address</p>
			<h4 class="p-2 text-white font-medium border-b-[1px] border-stone-300">{user?.email}</h4>
		</section>
		<section class="flex flex-col justify-center w-[80vw]">
			<p class="text-stone-300 text-[.8rem]">Username</p>
			<input
				class="p-2 font-medium border-b-[1px] border-stone-500 bg-stone-700 text-stone-300 outline-none"
				type="text"
				bind:value={username}
			/>
		</section>
		<section>
            {#if loading}
			<button
                disabled={loading}
                type="submit"
				class="mt-7 w-[12rem]  text-stone-700 shadow-md transition-[200ms] rounded-md p-3 cursor-pointer bg-[#99d959]"
				>Loading..</button
			>
            {/if}

            {#if !loading}
			<button
                type="submit"
				class="mt-7 bg-[greenyellow] w-[12rem]  text-stone-700 shadow-md transition-[200ms] rounded-md p-3 cursor-pointer hover:bg-[#99d959]"
				>Save Change's</button
			>
            {/if}
		</section>
	</article>
</form>
