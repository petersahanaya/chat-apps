<script lang='ts'>
    import { fly, fade } from "svelte/transition";
    export let client : any
</script>

<a href={`/chat/${client.id}`}>
    <section
        class="flex mt-3 p-3 justify-around items-center w-screen rounded-full cursor-pointer bg-stone-900 transition-[200ms] hover:bg-stone-900/60"
        in:fly={{ y: 200, opacity: 0.4 }}
        out:fade
    >
        <div class="relative">
            {#if !client.image}
                <img class="rounded-full" width="70" src="/profile.jpeg" alt="profile" />
            {/if}
            {#if client.image}
                <img class="rounded-full" width="70" src={client.image} alt="profile" />
            {/if}
            <div class=" absolute bottom-0 right-0 w-[8px] h-[8px] bg-[greenyellow] rounded-full" />
        </div>
        <article class="flex justify-between items-center gap-3">
            <h4 class="text-[1.3] text-[greenyellow] font-medium">{client.username}</h4>
            <p class="text-[.9rem] text-stone-300">
                {`${new Date(Date.now()).getHours()} : ${new Date(Date.now()).getMinutes()}`}
            </p>
        </article>
    </section>
</a>