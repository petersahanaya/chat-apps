<script lang='ts'>
	import type { UserProps } from "$lib/types";
    import MdModeEdit from 'svelte-icons/md/MdModeEdit.svelte'

    export let user : UserProps;
</script>
<header class="flex justify-around items-center p-2 w-screen bg-stone-800">
    <section>
        {#if !user?.image}
            <img class="rounded-full" width="100" src="/profile.jpeg" alt="profile"/>
        {/if}
        {#if user?.image}
            <img class="rounded-full" width="100" src={user.image} alt="profile"/>
        {/if}
    </section>
    <div class="flex flex-col justify-center ">
        <h4 class="text-[greenyellow] text-[1.3rem] font-medium">{user?.username}</h4>
        <p class="text-stone-400 text-[.8rem]">Front End Developer</p>
    </div>
    <a href={'/chat/settings'} class="text-stone-300 w-[20px]">
        <MdModeEdit />
    </a>
</header>